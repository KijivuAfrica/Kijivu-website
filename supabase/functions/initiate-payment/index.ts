import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const PESAPAL_BASE = 'https://pay.pesapal.com/v3'
const CONSUMER_KEY = Deno.env.get('PESAPAL_CONSUMER_KEY')!
const CONSUMER_SECRET = Deno.env.get('PESAPAL_CONSUMER_SECRET')!
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

async function getPesapalToken(): Promise<string> {
  const res = await fetch(`${PESAPAL_BASE}/api/Auth/RequestToken`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ consumer_key: CONSUMER_KEY, consumer_secret: CONSUMER_SECRET }),
  })
  const data = await res.json()
  if (!data.token) throw new Error('Failed to get Pesapal token: ' + JSON.stringify(data))
  return data.token
}

async function registerIPN(token: string): Promise<string> {
  const ipnUrl = `${SUPABASE_URL}/functions/v1/pesapal-ipn`
  const res = await fetch(`${PESAPAL_BASE}/api/URLSetup/RegisterIPN`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ url: ipnUrl, ipn_notification_type: 'GET' }),
  })
  const data = await res.json()
  if (!data.ipn_id) throw new Error('Failed to register IPN: ' + JSON.stringify(data))
  return data.ipn_id
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { order_id, amount, currency, customer_email, customer_phone, customer_name } = await req.json()

    const token = await getPesapalToken()
    const ipn_id = await registerIPN(token)

    const nameParts = customer_name.trim().split(' ')
    const firstName = nameParts[0]
    const lastName = nameParts.slice(1).join(' ') || firstName

    const orderRes = await fetch(`${PESAPAL_BASE}/api/Transactions/SubmitOrderRequest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: order_id,
        currency: currency || 'KES',
        amount: amount,
        description: `Kijivu Order ${order_id}`,
        callback_url: 'https://kijivu.com/#/payment-complete',
        notification_id: ipn_id,
        billing_address: {
          email_address: customer_email,
          phone_number: customer_phone,
          country_code: currency === 'UGX' ? 'UG' : 'KE',
          first_name: firstName,
          last_name: lastName,
        },
      }),
    })

    const orderData = await orderRes.json()
    if (!orderData.redirect_url) throw new Error('No redirect URL from Pesapal: ' + JSON.stringify(orderData))

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
    await supabase.from('orders').update({
      pesapal_order_id: orderData.order_tracking_id,
    }).eq('id', order_id)

    return new Response(JSON.stringify({ redirect_url: orderData.redirect_url }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
