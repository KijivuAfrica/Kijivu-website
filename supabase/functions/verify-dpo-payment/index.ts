import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: CORS });
  }

  try {
    const { transaction_token, order_id } = await req.json();

    const companyToken = Deno.env.get('DPO_COMPANY_TOKEN');
    const supabaseUrl  = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey  = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    if (!companyToken) {
      return new Response(JSON.stringify({ error: 'DPO_COMPANY_TOKEN not set' }), {
        status: 500, headers: { ...CORS, 'Content-Type': 'application/json' },
      });
    }

    const xml = `<?xml version="1.0" encoding="utf-8"?>
<API3G>
  <CompanyToken>${companyToken}</CompanyToken>
  <Request>verifyToken</Request>
  <TransactionToken>${transaction_token}</TransactionToken>
</API3G>`;

    const dpoRes = await fetch('https://secure.3gdirectpay.com/API/v6/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/xml' },
      body: xml,
    });

    const text = await dpoRes.text();
    console.log('DPO verifyToken response:', text);

    const get = (tag: string) => text.match(new RegExp(`<${tag}>(.*?)<\/${tag}>`))?.[1] ?? null;

    const result           = get('Result');
    const resultExplanation = get('ResultExplanation');
    const approval         = get('TransactionApproval');

    // Result 000 = verified and paid
    const paid = result === '000';

    // Update order in Supabase
    const supabase = createClient(supabaseUrl, supabaseKey);
    await supabase
      .from('orders')
      .update({ payment_status: paid ? 'paid' : 'failed' })
      .eq('id', order_id);

    return new Response(
      JSON.stringify({ paid, result, resultExplanation, approval }),
      { headers: { ...CORS, 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    console.error('verify-dpo-payment error:', err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500, headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  }
});
