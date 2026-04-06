import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, MessageCircle } from 'lucide-react';

const BONE   = '#F4F1EA';
const FOREST = '#1A1F1C';
const OLIVE  = '#6B7D6E';
const GREEN  = '#2E9E60';

const SHOPIFY_URL = 'https://4ykyr0-mp.myshopify.com/';

const RALEWAY  = "'Raleway', sans-serif";
const GARAMOND = "'EB Garamond', serif";
const CINZEL   = "'Cinzel', serif";

const CrownIcon = () => (
  <svg width="28" height="22" viewBox="0 0 36 28" fill="none" style={{ display: 'block', margin: '0 auto' }}>
    <path d="M2,24 L6,10 L13,18 L18,4 L23,18 L30,10 L34,24 Z" stroke={BONE} strokeWidth="1" fill="none" strokeLinejoin="round" strokeLinecap="round" />
    <line x1="2" y1="27" x2="34" y2="27" stroke={BONE} strokeWidth="1" />
    <circle cx="18" cy="4"  r="1.5" fill={BONE} />
    <circle cx="6"  cy="10" r="1.5" fill={BONE} />
    <circle cx="30" cy="10" r="1.5" fill={BONE} />
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
    description: 'Clinically-backed liquid formula with Lustriva®, Biotin and bioavailable vitamins to support hair growth from within.',
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
    name: 'Prenatal & Postnatal Gummies',
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
    description: 'Our original formula — developed for the biological systems that govern hair health. Formulated for women whose root cause has been consistently overlooked.',
    isTaji: true,
  },
];

const CATEGORIES = ['All', 'Hair Growth', 'Kids Health', 'Maternal Health', 'TAJI'];

export default function ShopPage({ cart = [], onAddToCart }) {
  const [hoveredProduct, setHovered] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();

  const filtered = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div style={{ minHeight: '100vh', fontFamily: RALEWAY, background: BONE, color: FOREST }}>

      {/* Nav */}
      <nav style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 100,
        display: 'grid', gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center', padding: '1.25rem 3rem',
        background: `rgba(244,241,234,0.96)`, backdropFilter: 'blur(12px)',
        borderBottom: `0.5px solid rgba(26,31,28,0.1)`,
        boxSizing: 'border-box',
      }}>
        <div style={{ display: 'flex', gap: '2.5rem' }}>
          <a href="/" style={{ textDecoration: 'none', color: FOREST, fontFamily: RALEWAY, fontWeight: 300, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Home</a>
          <a href="https://wa.me/254705016590" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: FOREST, fontFamily: RALEWAY, fontWeight: 300, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Support</a>
        </div>
        <a href="/" style={{ textDecoration: 'none' }}>
          <img src="/Kijivu Logo Design.png" alt="Kijivu" style={{ height: '44px', width: 'auto' }} />
        </a>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '2rem', alignItems: 'center' }}>
          <button onClick={() => navigate('/checkout')} style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', color: FOREST }}>
            <ShoppingCart style={{ width: 20, height: 20 }} />
            {cart.length > 0 && (
              <span style={{ position: 'absolute', top: -5, right: -5, background: FOREST, color: BONE, fontFamily: RALEWAY, fontSize: '0.6rem', width: 17, height: 17, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 400 }}>
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Header */}
      <div style={{ paddingTop: '6rem', background: FOREST, color: BONE }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '4rem 4rem 2.5rem' }}>
          <h1 style={{ fontFamily: RALEWAY, fontWeight: 200, fontSize: 'clamp(2.5rem, 5vw, 5rem)', textTransform: 'uppercase', lineHeight: 1, letterSpacing: '0.12em', marginBottom: '1rem', color: BONE }}>
            Shop
          </h1>
          <p style={{ fontFamily: GARAMOND, fontStyle: 'italic', fontSize: '1.1rem', color: `rgba(244,241,234,0.6)`, maxWidth: 400, lineHeight: 1.6, margin: 0 }}>
            Premium supplements, delivered to Kenya and Uganda.
          </p>
        </div>

        {/* Category filters */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 4rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', borderTop: `0.5px solid rgba(244,241,234,0.1)`, paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                fontFamily: RALEWAY, fontWeight: 300, fontSize: '0.72rem',
                textTransform: 'uppercase', letterSpacing: '0.1em',
                padding: '0.4rem 1rem', cursor: 'pointer',
                background: activeCategory === cat ? BONE : 'transparent',
                color: activeCategory === cat ? FOREST : `rgba(244,241,234,0.5)`,
                border: activeCategory === cat ? `0.5px solid ${BONE}` : `0.5px solid rgba(244,241,234,0.2)`,
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: `rgba(26,31,28,0.08)`, border: `0.5px solid rgba(26,31,28,0.08)` }}>
          {filtered.map((product) => {
            const isHovered = hoveredProduct === product.id;

            if (product.isTaji) {
              return (
                <div
                  key={product.id}
                  onMouseEnter={() => setHovered(product.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    background: FOREST,
                    display: 'flex', flexDirection: 'column',
                  }}
                >
                  <div style={{ aspectRatio: '4/3', overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={product.image}
                      alt="TAJI by Kijivu"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s', transform: isHovered ? 'scale(1.04)' : 'scale(1)', opacity: 0.85 }}
                    />
                    <span style={{ position: 'absolute', top: '1rem', left: '1rem', background: GREEN, color: BONE, fontFamily: RALEWAY, fontWeight: 300, padding: '0.25rem 0.7rem', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      {product.badge}
                    </span>
                  </div>
                  <div style={{ padding: '1.75rem', flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <div style={{ marginBottom: '0.75rem' }}>
                      <CrownIcon />
                    </div>
                    <h3 style={{ fontFamily: CINZEL, fontWeight: 500, fontSize: '1.5rem', color: BONE, marginBottom: '0.5rem', letterSpacing: '0.06em' }}>
                      TAJI
                    </h3>
                    <p style={{ fontFamily: GARAMOND, fontStyle: 'italic', fontSize: '0.9rem', color: `rgba(244,241,234,0.55)`, lineHeight: 1.6, marginBottom: '1.25rem', flexGrow: 1 }}>
                      Hair, approached at the root.
                    </p>
                    <div style={{ width: '100%', paddingTop: '1.25rem', borderTop: `0.5px solid rgba(244,241,234,0.1)` }}>
                      <a
                        href={SHOPIFY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'block', width: '100%', textAlign: 'center',
                          fontFamily: RALEWAY, fontWeight: 400, fontSize: '0.72rem',
                          textTransform: 'uppercase', letterSpacing: '0.1em',
                          padding: '0.7rem', cursor: 'pointer',
                          background: 'transparent', color: GREEN,
                          border: `0.5px solid rgba(46,158,96,0.4)`,
                          textDecoration: 'none',
                          transition: 'border-color 0.2s',
                          boxSizing: 'border-box',
                        }}
                      >
                        Reserve — $36 — US only
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
                  background: isHovered ? `rgba(244,241,234,0.5)` : BONE,
                  transition: 'background 0.3s',
                  display: 'flex', flexDirection: 'column',
                }}
              >
                {/* Image */}
                <div style={{ aspectRatio: '4/3', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s', transform: isHovered ? 'scale(1.04)' : 'scale(1)' }}
                  />
                  {product.badge && (
                    <span style={{ position: 'absolute', top: '1rem', left: '1rem', background: FOREST, color: BONE, fontFamily: RALEWAY, fontWeight: 300, padding: '0.25rem 0.7rem', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div style={{ padding: '1.75rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontFamily: RALEWAY, fontWeight: 300, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: OLIVE, marginBottom: '0.5rem', display: 'block' }}>
                    {product.category}
                  </span>
                  <h3 style={{ fontFamily: GARAMOND, fontSize: '1.25rem', lineHeight: 1.3, marginBottom: '0.75rem', color: FOREST, fontWeight: 400 }}>
                    {product.name}
                  </h3>
                  <p style={{ fontFamily: GARAMOND, fontSize: '0.9rem', color: OLIVE, lineHeight: 1.7, marginBottom: '1.5rem', flexGrow: 1 }}>
                    {product.description}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.25rem', borderTop: `0.5px solid rgba(26,31,28,0.1)` }}>
                    {product.price != null ? (
                      <>
                        <span style={{ fontFamily: GARAMOND, fontSize: '1.3rem', color: FOREST }}>
                          <span style={{ fontFamily: RALEWAY, fontWeight: 300, fontSize: '0.65rem', marginRight: 3 }}>KES</span>
                          {product.price.toLocaleString()}
                        </span>
                        <button
                          onClick={() => onAddToCart(product)}
                          style={{
                            fontFamily: RALEWAY, fontWeight: 400, fontSize: '0.7rem',
                            textTransform: 'uppercase', letterSpacing: '0.1em',
                            padding: '0.55rem 1.1rem', cursor: 'pointer',
                            background: isHovered ? FOREST : 'transparent',
                            color: isHovered ? BONE : FOREST,
                            border: `0.5px solid ${FOREST}`,
                            transition: 'all 0.2s',
                          }}
                        >
                          Add to cart
                        </button>
                      </>
                    ) : (
                      <a href="https://wa.me/254705016590" target="_blank" rel="noopener noreferrer"
                        style={{ fontFamily: RALEWAY, fontWeight: 300, fontSize: '0.75rem', textDecoration: 'none', color: OLIVE, letterSpacing: '0.05em' }}>
                        Contact to order
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* WhatsApp order option */}
        <div style={{ marginTop: '2rem', padding: '2rem 2.5rem', background: FOREST, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <p style={{ fontFamily: RALEWAY, fontWeight: 300, fontSize: '0.88rem', color: BONE, marginBottom: '0.25rem', letterSpacing: '0.04em' }}>Prefer to order via WhatsApp?</p>
            <p style={{ fontFamily: GARAMOND, fontStyle: 'italic', fontSize: '0.9rem', color: `rgba(244,241,234,0.5)` }}>Message us directly and we'll sort your order.</p>
          </div>
          <a href="https://wa.me/254705016590" target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: RALEWAY, fontWeight: 300, fontSize: '0.75rem',
              textTransform: 'uppercase', letterSpacing: '0.1em',
              padding: '0.75rem 1.5rem', textDecoration: 'none',
              background: 'transparent', color: BONE,
              border: `0.5px solid rgba(244,241,234,0.3)`,
            }}>
            <MessageCircle style={{ width: 14, height: 14 }} /> WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  );
}
