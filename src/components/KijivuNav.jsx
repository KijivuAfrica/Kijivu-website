import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';

const SHOPIFY_URL = 'https://4ykyr0-mp.myshopify.com/';

const CREAM      = '#FDFBF7';
const INK        = '#1C1C1A';
const MUTED      = '#5C5C58';
const GREEN_MID  = '#2E9E60';
const GREEN_DARK = '#1A5C3A';
const SANS       = "'Montserrat', sans-serif";
const DISPLAY    = "'Cinzel', serif";

const NAV_LINKS = [
  { label: 'Home',  href: '/' },
  { label: 'Shop',  href: '/shop' },
  { label: 'About', href: '/about' },
];

export default function KijivuNav({ cart = [], topOffset = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: topOffset,
        left: 0, right: 0,
        zIndex: 100,
        height: 60,
        background: 'rgba(253,251,247,0.95)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderBottom: '0.5px solid rgba(28,28,26,0.12)',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        padding: '0 2rem',
        boxSizing: 'border-box',
      }}>

        {/* Left: desktop links / mobile hamburger */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className="k-nav-links" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                style={{
                  fontFamily: SANS, fontSize: 12, fontWeight: 400,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: MUTED, textDecoration: 'none',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = INK}
                onMouseLeave={e => e.currentTarget.style.color = MUTED}
              >
                {label}
              </a>
            ))}
          </div>
          <button
            className="k-nav-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: INK, padding: '4px', display: 'none',
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            {menuOpen
              ? <X style={{ width: 20, height: 20 }} />
              : <Menu style={{ width: 20, height: 20 }} />
            }
          </button>
        </div>

        {/* Center: wordmark */}
        <a
          href="/"
          style={{
            fontFamily: DISPLAY, fontSize: 18, fontWeight: 500,
            color: INK, letterSpacing: '0.06em',
            textDecoration: 'none', textTransform: 'uppercase',
            justifySelf: 'center',
          }}
        >
          Kijivu
        </a>

        {/* Right: Reserve TAJI + cart */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.75rem' }}>
          <a
            href={SHOPIFY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="k-nav-cta"
            style={{
              fontFamily: SANS, fontSize: 12, fontWeight: 500,
              background: GREEN_MID, color: CREAM,
              border: 'none', borderRadius: 8,
              padding: '8px 16px',
              textDecoration: 'none',
              transition: 'background 0.2s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => e.currentTarget.style.background = GREEN_DARK}
            onMouseLeave={e => e.currentTarget.style.background = GREEN_MID}
          >
            Reserve TAJI
          </a>
          <button
            onClick={() => navigate('/checkout')}
            style={{
              position: 'relative', background: 'none', border: 'none',
              cursor: 'pointer', color: INK, padding: '4px',
            }}
            aria-label="Cart"
          >
            <ShoppingCart style={{ width: 18, height: 18 }} />
            {cart.length > 0 && (
              <span style={{
                position: 'absolute', top: -3, right: -3,
                background: GREEN_MID, color: CREAM,
                fontFamily: SANS, fontSize: 9, fontWeight: 500,
                width: 16, height: 16, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu overlay */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99,
          background: CREAM,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: '2.5rem',
        }}>
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: SANS, fontSize: 14, fontWeight: 400,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: INK, textDecoration: 'none',
              }}
            >
              {label}
            </a>
          ))}
          <a
            href={SHOPIFY_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: SANS, fontSize: 13, fontWeight: 500,
              background: GREEN_MID, color: CREAM,
              borderRadius: 8, padding: '12px 28px',
              textDecoration: 'none',
            }}
          >
            Reserve TAJI
          </a>
        </div>
      )}
    </>
  );
}
