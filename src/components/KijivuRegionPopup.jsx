import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const SHOPIFY_URL = 'https://4ykyr0-mp.myshopify.com/';

const CREAM      = '#FDFBF7';
const CREAM_CARD = '#F8F4EE';
const INK        = '#1C1C1A';
const MUTED      = '#5C5C58';
const GREEN_MID  = '#2E9E60';
const GREEN_DARK = '#1A5C3A';
const BORDER     = 'rgba(28,28,26,0.12)';
const SANS       = "'Montserrat', sans-serif";
const SERIF      = "'EB Garamond', serif";
const DISPLAY    = "'Cinzel', serif";

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

export default function KijivuRegionPopup() {
  const [visible, setVisible] = useState(false);
  const [view, setView]       = useState('options'); // 'options' | 'waitlist' | 'confirmed'
  const [email, setEmail]     = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('regionPopupSeen')) return;
    const t = setTimeout(() => setVisible(true), 3000);
    // Expose a global for the About page "Join the waitlist" link
    window.showKijivuWaitlist = () => {
      setView('waitlist');
      setVisible(true);
    };
    return () => {
      clearTimeout(t);
      delete window.showKijivuWaitlist;
    };
  }, []);

  const close = () => {
    sessionStorage.setItem('regionPopupSeen', '1');
    setVisible(false);
  };

  const handleShopify = () => {
    window.open(SHOPIFY_URL, '_blank', 'noopener,noreferrer');
    close();
  };

  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();
    if (!email || submitting) return;
    setSubmitting(true);
    try {
      await supabase.from('leads').insert({ email, source: 'international-waitlist' });
      window.klaviyo?.push(['identify', { $email: email }]);
      window.klaviyo?.push(['track', 'International Waitlist Signup', {
        email,
        segment: 'international-waitlist',
      }]);
    } catch (_) {
      // fail silently
    }
    setView('confirmed');
    setSubmitting(false);
  };

  if (!visible) return null;

  return (
    <div
      onClick={close}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(28,28,26,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: CREAM,
          border: `0.5px solid ${BORDER}`,
          borderRadius: 12,
          maxWidth: 420,
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
            color: MUTED, fontSize: 18, lineHeight: 1, padding: '2px',
          }}
        >
          ✕
        </button>

        {/* Crown */}
        <div style={{ marginBottom: '1.25rem' }}>
          <CrownIcon />
        </div>

        {/* Label */}
        <p className="k-label" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          Where are you shopping from
        </p>

        {view === 'options' && (
          <>
            {/* Two option cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: '1.25rem' }}>
              {/* US + Canada */}
              <div className="k-card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <p style={{
                  fontFamily: SANS, fontSize: 12, color: MUTED,
                  fontWeight: 400, lineHeight: 1.4, margin: 0,
                }}>
                  United States and Canada
                </p>
                <button
                  onClick={handleShopify}
                  className="k-btn-primary"
                  style={{ width: '100%', fontSize: 12, padding: '10px 12px' }}
                >
                  Shop TAJI on Shopify
                </button>
              </div>

              {/* International */}
              <div className="k-card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <p style={{
                  fontFamily: SANS, fontSize: 12, color: MUTED,
                  fontWeight: 400, lineHeight: 1.4, margin: 0,
                }}>
                  East Africa and beyond
                </p>
                <button
                  onClick={() => setView('waitlist')}
                  className="k-btn-secondary"
                  style={{ width: '100%', fontSize: 12, padding: '10px 12px' }}
                >
                  Join the waitlist
                </button>
              </div>
            </div>

            {/* Continue browsing */}
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={close}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: SANS, fontSize: 12, color: MUTED,
                  textDecoration: 'none',
                }}
              >
                Continue browsing
              </button>
            </div>
          </>
        )}

        {view === 'waitlist' && (
          <>
            <p style={{
              fontFamily: SANS, fontSize: 14, color: MUTED,
              lineHeight: 1.6, textAlign: 'center', marginBottom: '1.25rem',
            }}>
              Enter your email and we will notify you when TAJI is available in your region.
            </p>
            <form onSubmit={handleWaitlistSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                style={{
                  width: '100%', padding: '11px 14px',
                  fontFamily: SANS, fontSize: 13, fontWeight: 300,
                  border: `1px solid ${BORDER}`, borderRadius: 8,
                  color: INK, background: CREAM, outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
              <button
                type="submit"
                disabled={submitting}
                className="k-btn-primary"
                style={{ width: '100%' }}
              >
                {submitting ? 'Submitting...' : 'Notify me'}
              </button>
            </form>
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <button
                onClick={() => setView('options')}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: SANS, fontSize: 12, color: MUTED,
                }}
              >
                Back
              </button>
            </div>
          </>
        )}

        {view === 'confirmed' && (
          <div style={{ textAlign: 'center', padding: '0.5rem 0 1rem' }}>
            <p style={{
              fontFamily: SERIF, fontStyle: 'italic',
              fontSize: 16, color: MUTED, lineHeight: 1.8,
            }}>
              You are on the list. We will reach out when TAJI arrives in your region.
            </p>
            <button
              onClick={close}
              className="k-btn-primary"
              style={{ marginTop: '1.5rem', fontSize: 12, padding: '10px 20px' }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
