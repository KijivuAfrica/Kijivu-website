import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const PESAPAL_BASE = 'https://pay.pesapal.com/v3'
const CONSUMER_KEY = Deno.env.get('PESAPAL_CONSUMER_KEY')!
const CONSUMER_SECRET = Deno.env.get('PESAPAL_CONSUMER_SECRET')!
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

async function getPesapalToken(): Promise<string> {
  const res = await fetch(`${PESAPAL_BASE}/api/Auth/RequestToken`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ consumer_key: CONSUMER_KEY, consumer_secret: CONSUMER_SECRET }),
  })
  const data = await res.json()
  return data.token
}

serve(async (req) => {
  const url = new URL(req.url)
  const orderTrackingId = url.searchParams.get('OrderTrackingId')
  const merchantReference = url.searchParams.get('OrderMerchantReference')

  if (!orderTrackingId || !merchantReference) {
    return new Response('Missing params', { status: 400 })
  }

  try {
    const token = await getPesapalToken()

    const statusRes = await fetch(
      `${PESAPAL_BASE}/api/Transactions/GetTransactionStatus?orderTrackingId=${orderTrackingId}`,
      {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    )
    const statusData = await statusRes.json()

    const paymentStatus =
      statusData.payment_status_description === 'Completed' ? 'paid' :
      statusData.payment_status_description === 'Failed' ? 'failed' : 'pending'

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
    await supabase.from('orders').update({
      payment_status: paymentStatus,
      pesapal_tracking_id: orderTrackingId,
    }).eq('id', merchantReference)

    return new Response('OK', { status: 200 })
  } catch (error) {
    return new Response('Error: ' + error.message, { status: 500 })
  }
})
