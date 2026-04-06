import { useState } from 'react';
import { MessageCircle } from 'lucide-react';

const SHOPIFY_URL = 'https://4ykyr0-mp.myshopify.com/';

const CREAM      = '#FDFBF7';
const CREAM_CARD = '#F8F4EE';
const INK        = '#1C1C1A';
const MUTED      = '#5C5C58';
const GREEN_MID  = '#2E9E60';
const GREEN_DARK = '#1A5C3A';
const BORDER     = 'rgba(28,28,26,0.12)';

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

const products = [
  {
    id: 1,
    name: 'MaryRuth Peach Mango Liquid Hair Supplement',
    price: 7499,
    image: '/IMG_5502 (1).JPG',
    badge: 'Best Seller',
    category: 'Hair Growth',
    description: 'Clinically-backed liquid formula with Lustriva, Biotin and bioavailable vitamins to support hair growth from within.',
  },
  {
    id: 2,
    name: 'MaryRuth Dragon Fruit Liquid Hair Supplement',
    price: 7499,
    image: '/IMG_5505.JPG',
    category: 'Hair Growth',
    description: 'Dragon fruit-infused liquid supplement delivering essential nutrients for thicker, stronger hair growth.',
  },
  {
    id: 3,
    name: 'Kids Immunity Gummies',
    price: 4000,
    image: '/IMG_4899.JPG',
    category: 'Kids Health',
    description: 'Daily gummies with vitamins C, D and Zinc to keep your little ones healthy year-round.',
  },
  {
    id: 4,
    name: 'Prenatal and Postnatal Gummies',
    price: 5500,
    image: '/IMG_4905.JPG',
    category: 'Maternal Health',
    description: 'Comprehensive prenatal and postnatal support with folate, iron, and DHA for mother and baby.',
  },
  {
    id: 5,
    name: 'MaryRuth Daily Liquid Hair Support 500mg',
    price: 7000,
    image: '/Hair Formula PICTURE.jpeg',
    category: 'Hair Growth',
    description: 'A concentrated 500mg daily dose of hair-supporting nutrients in an easy-to-absorb liquid form.',
  },
  {
    id: 6,
    name: 'TAJI',
    price: 36,
    priceCurrency: 'USD',
    image: '/taji-hero-editorial.png',
    badge: 'Presale Open',
    category: 'TAJI',
    description: 'Our original formula, developed for the biological systems that govern hair health. Formulated for women whose root cause has been consistently overlooked.',
    isTaji: true,
  },
];

const CATEGORIES = ['All', 'Hair Growth', 'Kids Health', 'Maternal Health', 'TAJI'];

export default function ShopPage({ onAddToCart }) {
  const [hoveredProduct, setHovered] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div style={{ minHeight: '100vh', background: CREAM, color: INK }}>

      {/* Header */}
      <div style={{ paddingTop: 'calc(40px + 60px)', background: INK, color: CREAM }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '4rem 4rem 2.5rem' }}>
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
            Premium supplements, delivered to Kenya and Uganda.
          </p>
        </div>

        {/* Category filters */}
        <div style={{
          maxWidth: 1200, margin: '0 auto', padding: '0 4rem',
          display: 'flex', gap: '0.5rem', flexWrap: 'wrap',
          borderTop: `0.5px solid rgba(253,251,247,0.1)`,
          paddingTop: '1.5rem', paddingBottom: '1.5rem',
        }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                fontFamily: SANS, fontWeight: 400, fontSize: '0.72rem',
                textTransform: 'uppercase', letterSpacing: '0.1em',
                padding: '0.4rem 1rem', cursor: 'pointer', borderRadius: 20,
                background: activeCategory === cat ? CREAM : 'transparent',
                color: activeCategory === cat ? INK : 'rgba(253,251,247,0.5)',
                border: activeCategory === cat
                  ? `0.5px solid ${CREAM}`
                  : `0.5px solid rgba(253,251,247,0.2)`,
                transition: 'all 0.2s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '3rem 4rem 6rem' }}>
        <div className="k-product-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px', background: BORDER,
          border: `0.5px solid ${BORDER}`,
        }}>
          {filtered.map((product) => {
            const isHovered = hoveredProduct === product.id;

            if (product.isTaji) {
              return (
                <div
                  key={product.id}
                  onMouseEnter={() => setHovered(product.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ background: GREEN_DARK, display: 'flex', flexDirection: 'column' }}
                >
                  <div style={{ aspectRatio: '4/3', overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={product.image}
                      alt="TAJI by Kijivu"
                      style={{
                        width: '100%', height: '100%', objectFit: 'cover',
                        transition: 'transform 0.6s',
                        transform: isHovered ? 'scale(1.04)' : 'scale(1)',
                        opacity: 0.85,
                      }}
                    />
                    <span style={{
                      position: 'absolute', top: '1rem', left: '1rem',
                      background: GREEN_MID, color: CREAM,
                      fontFamily: SANS, fontWeight: 400,
                      padding: '0.25rem 0.7rem', fontSize: '0.6rem',
                      textTransform: 'uppercase', letterSpacing: '0.1em',
                      borderRadius: 4,
                    }}>
                      {product.badge}
                    </span>
                  </div>
                  <div style={{
                    padding: '1.75rem', flexGrow: 1,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', textAlign: 'center',
                  }}>
                    <div style={{ marginBottom: '0.75rem' }}><CrownIcon /></div>
                    <h3 style={{
                      fontFamily: DISPLAY, fontWeight: 500, fontSize: '1.5rem',
                      color: CREAM, marginBottom: '0.5rem', letterSpacing: '0.06em',
                    }}>
                      TAJI
                    </h3>
                    <p style={{
                      fontFamily: SERIF, fontStyle: 'italic', fontSize: '0.9rem',
                      color: 'rgba(253,251,247,0.5)', lineHeight: 1.6,
                      marginBottom: '1.25rem', flexGrow: 1,
                    }}>
                      Hair, approached at the root.
                    </p>
                    <div style={{ width: '100%', paddingTop: '1.25rem', borderTop: `0.5px solid rgba(253,251,247,0.1)` }}>
                      <a
                        href={SHOPIFY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="k-btn-primary"
                        style={{ display: 'block', width: '100%', boxSizing: 'border-box', textAlign: 'center', fontSize: 12 }}
                      >
                        Reserve, $36, US only
                      </a>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={product.id}
                onMouseEnter={() => setHovered(product.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: isHovered ? CREAM_CARD : CREAM,
                  transition: 'background 0.3s',
                  display: 'flex', flexDirection: 'column',
                }}
              >
                <div style={{ aspectRatio: '4/3', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '100%', height: '100%', objectFit: 'cover',
                      transition: 'transform 0.6s',
                      transform: isHovered ? 'scale(1.04)' : 'scale(1)',
                    }}
                  />
                  {product.badge && (
                    <span style={{
                      position: 'absolute', top: '1rem', left: '1rem',
                      background: INK, color: CREAM,
                      fontFamily: SANS, fontWeight: 400,
                      padding: '0.25rem 0.7rem', fontSize: '0.6rem',
                      textTransform: 'uppercase', letterSpacing: '0.1em',
                      borderRadius: 4,
                    }}>
                      {product.badge}
                    </span>
                  )}
                </div>

                <div style={{ padding: '1.75rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <span className="k-label" style={{ marginBottom: '0.5rem', display: 'block', fontSize: 10 }}>
                    {product.category}
                  </span>
                  <h3 style={{
                    fontFamily: SERIF, fontSize: '1.2rem', lineHeight: 1.3,
                    marginBottom: '0.75rem', color: INK, fontWeight: 400,
                  }}>
                    {product.name}
                  </h3>
                  <p style={{
                    fontFamily: SERIF, fontSize: '0.9rem', color: MUTED,
                    lineHeight: 1.7, marginBottom: '1.5rem', flexGrow: 1, margin: '0 0 1.5rem',
                  }}>
                    {product.description}
                  </p>

                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    paddingTop: '1.25rem', borderTop: `0.5px solid ${BORDER}`,
                  }}>
                    {product.price != null ? (
                      <>
                        <span style={{ fontFamily: SERIF, fontSize: '1.3rem', color: INK }}>
                          <span style={{ fontFamily: SANS, fontWeight: 300, fontSize: '0.65rem', marginRight: 3 }}>KES</span>
                          {product.price.toLocaleString()}
                        </span>
                        <button
                          onClick={() => onAddToCart(product)}
                          className={isHovered ? 'k-btn-primary' : 'k-btn-secondary'}
                          style={{ fontSize: 12, padding: '8px 16px' }}
                        >
                          Add to cart
                        </button>
                      </>
                    ) : (
                      <a
                        href="https://wa.me/254705016590"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontFamily: SANS, fontWeight: 300, fontSize: '0.75rem',
                          color: MUTED, letterSpacing: '0.05em',
                        }}
                      >
                        Contact to order
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* WhatsApp option */}
        <div style={{
          marginTop: '2rem', padding: '2rem 2.5rem',
          background: INK, borderRadius: 8,
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
        }}>
          <div>
            <p style={{
              fontFamily: SANS, fontWeight: 400, fontSize: '0.88rem',
              color: CREAM, marginBottom: '0.25rem',
            }}>
              Prefer to order via WhatsApp?
            </p>
            <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: '0.9rem', color: 'rgba(253,251,247,0.5)', margin: 0 }}>
              Message us directly and we'll sort your order.
            </p>
          </div>
          <a
            href="https://wa.me/254705016590"
            target="_blank"
            rel="noopener noreferrer"
            className="k-btn-secondary"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              color: CREAM, borderColor: 'rgba(253,251,247,0.3)',
              fontSize: 12,
            }}
          >
            <MessageCircle style={{ width: 14, height: 14 }} /> WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  );
}
