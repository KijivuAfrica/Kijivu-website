const PIXEL_ID = '1717406042578874';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function sha256(value: string): Promise<string> {
  const data = new TextEncoder().encode(value.trim().toLowerCase());
  const buf  = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: cors });

  const ACCESS_TOKEN = Deno.env.get('META_CAPI_TOKEN');
  if (!ACCESS_TOKEN) {
    return new Response(JSON.stringify({ error: 'META_CAPI_TOKEN not set' }), { status: 500, headers: { ...cors, 'Content-Type': 'application/json' } });
  }

  try {
    const { event_name, event_id, user_data = {}, custom_data = {}, event_source_url } = await req.json();

    // Hash user data as required by Meta
    const hashed: Record<string, string | string[]> = {};
    if (user_data.email) hashed.em = [await sha256(user_data.email)];
    if (user_data.phone) hashed.ph = [await sha256(user_data.phone.replace(/\D/g, ''))];
    if (user_data.name) {
      const parts = user_data.name.trim().split(/\s+/);
      hashed.fn = [await sha256(parts[0])];
      if (parts.length > 1) hashed.ln = [await sha256(parts[parts.length - 1])];
    }
    if (user_data.fbc) hashed.fbc = user_data.fbc;
    if (user_data.fbp) hashed.fbp = user_data.fbp;

    const payload = {
      data: [{
        event_name,
        event_time: Math.floor(Date.now() / 1000),
        event_id,
        action_source: 'website',
        event_source_url: event_source_url || 'https://kijivuafrica.co.ke',
        user_data: hashed,
        custom_data,
      }],
      access_token: ACCESS_TOKEN,
    };

    const res  = await fetch(`https://graph.facebook.com/v19.0/${PIXEL_ID}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    console.log('Meta CAPI response:', JSON.stringify(result));

    return new Response(JSON.stringify(result), { headers: { ...cors, 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { ...cors, 'Content-Type': 'application/json' } });
  }
});
