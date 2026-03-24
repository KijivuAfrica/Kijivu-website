const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: CORS });
  }

  try {
    const { order_id, amount, currency, customer_name, customer_email, customer_phone } = await req.json();

    const companyToken = Deno.env.get('DPO_COMPANY_TOKEN');
    const serviceType  = Deno.env.get('DPO_SERVICE_TYPE') || '5525';

    if (!companyToken) {
      return new Response(JSON.stringify({ error: 'DPO_COMPANY_TOKEN not set' }), {
        status: 500, headers: { ...CORS, 'Content-Type': 'application/json' },
      });
    }

    const serviceDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const firstName   = customer_name.split(' ')[0];
    const lastName    = customer_name.split(' ').slice(1).join(' ') || firstName;

    const xml = `<?xml version="1.0" encoding="utf-8"?>
<API3G>
  <CompanyToken>${companyToken}</CompanyToken>
  <Request>createToken</Request>
  <Transaction>
    <PaymentAmount>${Number(amount).toFixed(2)}</PaymentAmount>
    <PaymentCurrency>${currency}</PaymentCurrency>
    <CompanyRef>${order_id}</CompanyRef>
    <RedirectURL>https://kijivu.com/#/payment-complete</RedirectURL>
    <BackURL>https://kijivu.com/#/payment-complete</BackURL>
    <CompanyRefUnique>1</CompanyRefUnique>
    <PTL>5</PTL>
    <customerEmail>${customer_email}</customerEmail>
    <customerFirstName>${firstName}</customerFirstName>
    <customerLastName>${lastName}</customerLastName>
    <customerPhone>${customer_phone}</customerPhone>
    <customerCountry>KE</customerCountry>
  </Transaction>
  <Services>
    <Service>
      <ServiceType>${serviceType}</ServiceType>
      <ServiceDescription>Kijivu Supplements Order</ServiceDescription>
      <ServiceDate>${serviceDate}</ServiceDate>
    </Service>
  </Services>
</API3G>`;

    const dpoRes = await fetch('https://secure.3gdirectpay.com/API/v6/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/xml' },
      body: xml,
    });

    const text = await dpoRes.text();
    console.log('DPO createToken response:', text);

    const get = (tag: string) => text.match(new RegExp(`<${tag}>(.*?)<\/${tag}>`))?.[1] ?? null;

    const result = get('Result');
    const token  = get('TransToken');

    if (result !== '000' || !token) {
      const explanation = get('ResultExplanation');
      console.error('DPO createToken failed:', result, explanation);
      return new Response(JSON.stringify({ error: explanation || 'Failed to create payment token' }), {
        status: 500, headers: { ...CORS, 'Content-Type': 'application/json' },
      });
    }

    return new Response(
      JSON.stringify({ redirect_url: `https://secure.3gdirectpay.com/payv2.php?ID=${token}`, token }),
      { headers: { ...CORS, 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    console.error('initiate-dpo-payment error:', err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500, headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  }
});
