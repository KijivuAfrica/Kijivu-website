import { useState, useEffect } from 'react';

const SHOPIFY_URL = 'https://4ykyr0-mp.myshopify.com/';

export default function TajiMobileBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem('tajiMobileBannerDismissed')) {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    sessionStorage.setItem('tajiMobileBannerDismissed', '1');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      zIndex: 200,
      background: '#1A5C3A',
      padding: '12px 16px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 12,
      // Only render visually on mobile — hiding via media query is not possible
      // inline, so we use a className for responsiveness
    }}
      className="taji-mobile-banner"
    >
      <span style={{
        fontFamily: "'Montserrat', sans-serif", fontWeight: 300,
        fontSize: 13, color: '#ffffff', flexShrink: 1,
      }}>
        TAJI presale open, $36, ships August 2026.
      </span>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <a
          href={SHOPIFY_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            border: '1px solid rgba(255,255,255,0.5)',
            borderRadius: 6, padding: '6px 14px',
            background: 'transparent', color: '#ffffff',
            fontFamily: "'Montserrat', sans-serif", fontSize: 12,
            fontWeight: 400, textDecoration: 'none', whiteSpace: 'nowrap',
          }}
        >
          Reserve now
        </a>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#ffffff', fontSize: 16, lineHeight: 1, padding: '2px',
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}
