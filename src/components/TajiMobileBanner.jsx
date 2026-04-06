import { useState, useEffect } from 'react';

const SHOPIFY_URL = 'https://4ykyr0-mp.myshopify.com/';
const GREEN_DARK = '#1A5C3A';
const GREEN_MID  = '#2E9E60';
const SANS       = "'Montserrat', sans-serif";

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
    <div
      style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        zIndex: 200,
        background: GREEN_DARK,
        borderTop: `0.5px solid rgba(46,158,96,0.25)`,
        padding: '12px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 12,
      }}
      className="taji-mobile-banner"
    >
      <span style={{
        fontFamily: SANS, fontWeight: 300,
        fontSize: 11, color: 'rgba(253,251,247,0.65)', flexShrink: 1,
        letterSpacing: '0.05em',
      }}>
        TAJI presale, $36. Ships August 2026. US and Canada only.
      </span>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <a
          href={SHOPIFY_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            border: `0.5px solid rgba(46,158,96,0.5)`,
            borderRadius: 6, padding: '6px 14px',
            background: 'transparent', color: GREEN_MID,
            fontFamily: SANS, fontSize: 11,
            fontWeight: 400, letterSpacing: '0.1em',
            textDecoration: 'none', whiteSpace: 'nowrap',
            textTransform: 'uppercase',
          }}
        >
          Reserve
        </a>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(253,251,247,0.3)', fontSize: 16, lineHeight: 1, padding: '2px',
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}
