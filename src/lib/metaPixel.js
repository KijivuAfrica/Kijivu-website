import { supabase } from './supabase';

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

export function trackMeta(eventName, customData = {}, userData = {}) {
  const eventId = crypto.randomUUID();

  // Client-side pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, customData, { eventID: eventId });
  }

  // Server-side CAPI — fire and forget, never breaks UX
  supabase.functions.invoke('meta-capi', {
    body: {
      event_name: eventName,
      event_id: eventId,
      custom_data: customData,
      user_data: {
        ...userData,
        fbc: getCookie('_fbc'),
        fbp: getCookie('_fbp'),
      },
      event_source_url: window.location.href,
    },
  }).catch(() => {});
}
