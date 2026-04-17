import { useState } from 'react';

const SHOPIFY_URL = 'https://4ykyr0-mp.myshopify.com/collections/all';

const CREAM      = '#FDFBF7';
const INK        = '#1C1C1A';
const GREEN_MID  = '#2E9E60';
const GREEN_DARK = '#1A5C3A';

const DISPLAY = "'Cinzel', serif";
const SERIF   = "'EB Garamond', serif";
const SANS    = "'Montserrat', sans-serif";

const CrownIcon = () => (
  <svg width="28" height="22" viewBox="0 0 36 28" fill="none" style={{ display: 'block', margin: '0 auto' }}>
    <path d="M2,24 L6,10 L13,18 L18,4 L23,18 L30,10 L34,24 Z"
      stroke={CREAM} strokeWidth="1" fill="none"
      strokeLinejoin="round" strokeLinecap="round" />
    <line x1="2" y1="27" x2="34" y2="27" stroke={CREAM} strokeWidth="1" />
    <circle cx="18" cy="4"  r="1.5" fill={CREAM} />
    <circle cx="6"  cy="10" r="1.5" fill={CREAM} />
    <circle cx="30" cy="10" r="1.5" fill={CREAM} />
  </svg>
);

const tajiProduct = {
  id: 1,
  name: 'TAJI',
  price: 36,
  priceCurrency: 'USD',
  image: '/ChatGPT Image Apr 3, 2026, 04_02_47 PM.png',
  badge: 'Presale Open',
  description: 'TAJI was not built for the broadest possible market. It was built for the woman whose iron has been flagged, whose stress is real, and whose hair has been stalling despite everything she has tried. The formula goes to the root because that is the only place this problem gets solved.',
};

export default function ShopPage() {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: CREAM, color: INK }}>

      {/* Header */}
      <div style={{ paddingTop: 'calc(40px + 60px)', background: INK, color: CREAM }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '4rem 2rem 3rem' }}>
          <h1 style={{
            fontFamily: DISPLAY, fontWeight: 500,
            fontSize: 'clamp(2.5rem, 5vw, 5rem)',
            lineHeight: 1, letterSpacing: '0.06em',
            color: CREAM, marginBottom: '1rem',
          }}>
            Shop
          </h1>
          <p style={{
            fontFamily: SERIF, fontStyle: 'italic', fontSize: '1.1rem',
            color: 'rgba(253,251,247,0.55)', maxWidth: 400, lineHeight: 1.65, margin: 0,
          }}>
            One product. Built with intention.
          </p>
        </div>
      </div>

      {/* TAJI Product */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '4rem 2rem 6rem' }}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            background: GREEN_DARK,
            borderRadius: 12,
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 0,
          }}
          className="taji-feature-grid"
        >
          {/* Image */}
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <img
              src={tajiProduct.image}
              alt="TAJI by Kijivu — daily hair supplement"
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                display: 'block', opacity: 0.9,
                transition: 'transform 0.6s',
                transform: hovered ? 'scale(1.03)' : 'scale(1)',
              }}
              onError={e => { e.currentTarget.style.display = 'none'; }}
            />
            <span style={{
              position: 'absolute', top: '1.25rem', left: '1.25rem',
              background: GREEN_MID, color: CREAM,
              fontFamily: SANS, fontWeight: 400,
              padding: '0.3rem 0.8rem', fontSize: '0.6rem',
              textTransform: 'uppercase', letterSpacing: '0.12em',
              borderRadius: 4,
            }}>
              {tajiProduct.badge}
            </span>
          </div>

          {/* Copy */}
          <div style={{
            padding: '3rem 2.5rem',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center', gap: '1.25rem',
          }}>
            <div style={{ marginBottom: '0.25rem' }}><CrownIcon /></div>
            <h2 style={{
              fontFamily: DISPLAY, fontWeight: 500, fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: CREAM, letterSpacing: '0.06em', margin: 0, lineHeight: 1,
            }}>
              TAJI
            </h2>
            <p style={{
              fontFamily: SERIF, fontStyle: 'italic', fontSize: 16,
              color: 'rgba(253,251,247,0.65)', lineHeight: 1.75, margin: 0,
            }}>
              {tajiProduct.description}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['Lustriva®', 'Iron absorption system', 'Stress shedding formula'].map(tag => (
                <span key={tag} style={{
                  fontFamily: SANS, fontWeight: 400, fontSize: 11,
                  letterSpacing: '0.06em',
                  background: 'rgba(159,225,203,0.15)', color: '#9FE1CB',
                  padding: '4px 10px', borderRadius: 20,
                  border: '0.5px solid rgba(159,225,203,0.2)',
                }}>
                  {tag}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span style={{ fontFamily: SERIF, fontSize: 32, color: CREAM, lineHeight: 1 }}>$36</span>
              <span style={{ fontFamily: SANS, fontWeight: 300, fontSize: 13, color: 'rgba(253,251,247,0.4)', textDecoration: 'line-through' }}>$40</span>
              <span style={{ fontFamily: SANS, fontWeight: 300, fontSize: 12, color: 'rgba(253,251,247,0.45)' }}>presale price</span>
            </div>

            <div>
              <a
                href={SHOPIFY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="k-btn-primary"
                style={{ display: 'inline-block' }}
              >
                Reserve TAJI, $36
              </a>
              <p style={{
                fontFamily: SANS, fontWeight: 300, fontSize: 11,
                color: 'rgba(253,251,247,0.35)', marginTop: 8,
              }}>
                US and Canada only. Ships August 2026.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
