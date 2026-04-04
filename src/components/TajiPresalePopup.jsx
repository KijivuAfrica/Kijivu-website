import { useState, useEffect } from 'react';

const SHOPIFY_URL = 'https://4ykyr0-mp.myshopify.com/';

const CrownIcon = () => (
  <svg width="36" height="28" viewBox="0 0 36 28" fill="none" style={{ display: 'block', margin: '0 auto' }}>
    <path
      d="M2,24 L6,10 L13,18 L18,4 L23,18 L30,10 L34,24 Z"
      stroke="#1A5C3A" strokeWidth="1.5" fill="none"
      strokeLinejoin="round" strokeLinecap="round"
    />
    <line x1="2" y1="27" x2="34" y2="27" stroke="#1A5C3A" strokeWidth="1.5" />
    <circle cx="18" cy="4"  r="1.5" fill="#1A5C3A" />
    <circle cx="6"  cy="10" r="1.5" fill="#1A5C3A" />
    <circle cx="30" cy="10" r="1.5" fill="#1A5C3A" />
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
        background: 'rgba(42,17,24,0.45)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#FDFBF7',
          border: '1px solid rgba(42,17,24,0.10)',
          borderRadius: 12,
          maxWidth: 400,
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
            color: 'rgba(42,17,24,0.35)', fontSize: 18, lineHeight: 1,
          }}
        >
          ✕
        </button>

        {/* Crown */}
        <div style={{ marginBottom: '1rem' }}>
          <CrownIcon />
        </div>

        {/* Eyebrow */}
        <p style={{
          fontFamily: "'Montserrat', sans-serif", fontWeight: 500,
          fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase',
          color: '#2E9E60', textAlign: 'center', margin: '0 0 0.6rem',
        }}>
          Presale now open
        </p>

        {/* Headline */}
        <h2 style={{
          fontFamily: "'EB Garamond', serif", fontStyle: 'italic',
          fontSize: 22, color: '#2A1118', textAlign: 'center',
          lineHeight: 1.3, margin: '0 0 0.85rem',
        }}>
          TAJI is ready for you.
        </h2>

        {/* Body */}
        <p style={{
          fontFamily: "'Montserrat', sans-serif", fontWeight: 300,
          fontSize: 14, color: 'rgba(42,17,24,0.6)', textAlign: 'center',
          lineHeight: 1.75, margin: '0 0 1.25rem',
        }}>
          For women who've tried everything and still aren't getting answers.
          Built around the biology most supplements overlook.
        </p>

        {/* Divider with label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '0 0 1.25rem' }}>
          <div style={{ flex: 1, height: 0.5, background: 'rgba(42,17,24,0.12)' }} />
          <span style={{
            fontFamily: "'Montserrat', sans-serif", fontWeight: 500,
            fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase',
            color: '#2E9E60',
          }}>
            300 bottles, founder price
          </span>
          <div style={{ flex: 1, height: 0.5, background: 'rgba(42,17,24,0.12)' }} />
        </div>

        {/* Price row */}
        <div style={{
          display: 'flex', justifyContent: 'center', alignItems: 'baseline',
          gap: 8, margin: '0 0 1.25rem',
        }}>
          <span style={{ fontFamily: "'EB Garamond', serif", fontSize: 28, color: '#1A5C3A', lineHeight: 1 }}>
            $36
          </span>
          <span style={{
            fontFamily: "'Montserrat', sans-serif", fontSize: 14,
            color: 'rgba(42,17,24,0.4)', textDecoration: 'line-through',
          }}>
            $40
          </span>
          <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: 'rgba(42,17,24,0.5)' }}>
            30-day supply
          </span>
        </div>

        {/* CTA */}
        <button
          onClick={handleCTA}
          style={{
            width: '100%', background: '#2E9E60', color: '#FDFBF7',
            fontFamily: "'Montserrat', sans-serif", fontWeight: 500,
            fontSize: 14, padding: '13px', borderRadius: 8,
            border: 'none', cursor: 'pointer', marginBottom: 8,
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#1A5C3A'}
          onMouseLeave={e => e.currentTarget.style.background = '#2E9E60'}
        >
          Reserve my bottle
        </button>

        {/* Fine print */}
        <p style={{
          fontFamily: "'Montserrat', sans-serif", fontSize: 11,
          color: 'rgba(42,17,24,0.4)', textAlign: 'center', margin: 0,
        }}>
          Full refund before shipping, ships August 2026.
        </p>
      </div>
    </div>
  );
}
