import { useState, useEffect } from 'react';

const SHOPIFY_URL = 'https://4ykyr0-mp.myshopify.com/';

const CREAM  = '#FDFBF7';
const INK    = '#1C1C1A';
const MUTED  = '#5C5C58';
const GREEN_DARK = '#1A5C3A';

const DISPLAY = "'Cinzel', serif";
const SERIF   = "'EB Garamond', serif";
const SANS    = "'Montserrat', sans-serif";

const CrownIcon = () => (
  <svg width="36" height="28" viewBox="0 0 36 28" fill="none" style={{ display: 'block', margin: '0 auto' }}>
    <path d="M2,24 L6,10 L13,18 L18,4 L23,18 L30,10 L34,24 Z"
      stroke={GREEN_DARK} strokeWidth="1.5" fill="none"
      strokeLinejoin="round" strokeLinecap="round" />
    <line x1="2" y1="27" x2="34" y2="27" stroke={GREEN_DARK} strokeWidth="1.5" />
    <circle cx="18" cy="4"  r="1.5" fill={GREEN_DARK} />
    <circle cx="6"  cy="10" r="1.5" fill={GREEN_DARK} />
    <circle cx="30" cy="10" r="1.5" fill={GREEN_DARK} />
  </svg>
);

export default function TajiPresalePopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('tajiPopupSeen')) return;
    const t = setTimeout(() => setVisible(true), 4000);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    sessionStorage.setItem('tajiPopupSeen', '1');
    setVisible(false);
  };

  const handleCTA = () => {
    window.open(SHOPIFY_URL, '_blank', 'noopener,noreferrer');
    close();
  };

  if (!visible) return null;

  return (
    <div
      onClick={close}
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        background: 'rgba(28,28,26,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: CREAM,
          border: `0.5px solid rgba(28,28,26,0.12)`,
          borderRadius: 12,
          maxWidth: 380,
          width: '90vw',
          padding: '2rem',
          position: 'relative',
        }}
      >
        {/* Close */}
        <button
          onClick={close}
          aria-label="Close"
          style={{
            position: 'absolute', top: 14, right: 16,
            background: 'none', border: 'none', cursor: 'pointer',
            color: MUTED, fontSize: 18, lineHeight: 1,
          }}
        >
          ✕
        </button>

        {/* Crown */}
        <div style={{ marginBottom: '1.25rem' }}>
          <CrownIcon />
        </div>

        {/* Eyebrow */}
        <p className="k-label" style={{ textAlign: 'center', marginBottom: '0.6rem' }}>
          Presale now open
        </p>

        {/* Headline */}
        <h2 style={{
          fontFamily: DISPLAY, fontWeight: 500, fontSize: 24,
          color: INK, textAlign: 'center', lineHeight: 1.2, margin: '0 0 0.85rem',
        }}>
          TAJI
        </h2>

        {/* Tagline */}
        <p style={{
          fontFamily: SERIF, fontStyle: 'italic', fontSize: 15,
          color: MUTED, textAlign: 'center', margin: '0 0 1rem', lineHeight: 1.5,
        }}>
          Hair, approached at the root.
        </p>

        {/* Body */}
        <p style={{
          fontFamily: SERIF, fontSize: 14, color: MUTED,
          textAlign: 'center', lineHeight: 1.8, margin: '0 0 1.25rem',
        }}>
          TAJI addresses the biological systems that govern hair health. Formulated for women whose root cause has been consistently overlooked.
        </p>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '0 0 1.25rem' }}>
          <div style={{ flex: 1, height: 0.5, background: 'rgba(28,28,26,0.1)' }} />
          <span style={{
            fontFamily: SANS, fontWeight: 400, fontSize: 9,
            letterSpacing: '0.14em', textTransform: 'uppercase', color: MUTED,
          }}>
            300 bottles, founder price
          </span>
          <div style={{ flex: 1, height: 0.5, background: 'rgba(28,28,26,0.1)' }} />
        </div>

        {/* Price */}
        <div style={{
          display: 'flex', justifyContent: 'center', alignItems: 'baseline',
          gap: 8, margin: '0 0 1.25rem',
        }}>
          <span style={{ fontFamily: SERIF, fontSize: 28, color: INK, lineHeight: 1 }}>$36</span>
          <span style={{
            fontFamily: SANS, fontWeight: 300, fontSize: 13,
            color: 'rgba(28,28,26,0.3)', textDecoration: 'line-through',
          }}>$40</span>
          <span style={{ fontFamily: SANS, fontWeight: 300, fontSize: 11, color: MUTED }}>
            30-day supply
          </span>
        </div>

        {/* CTA */}
        <button
          onClick={handleCTA}
          className="k-btn-primary"
          style={{ width: '100%', marginBottom: 10 }}
        >
          Reserve my bottle
        </button>

        {/* US-only note */}
        <p style={{
          fontFamily: SANS, fontWeight: 300, fontSize: 10, color: MUTED,
          textAlign: 'center', margin: '0 0 12px', letterSpacing: '0.04em',
        }}>
          US and Canada orders only. Full refund before shipping, ships August 2026.
        </p>

        {/* Not now */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={close}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: SANS, fontWeight: 300, fontSize: 11,
              color: 'rgba(28,28,26,0.35)', letterSpacing: '0.06em',
              textDecoration: 'underline',
              textDecorationColor: 'rgba(28,28,26,0.15)',
            }}
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
