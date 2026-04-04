import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowRight, MessageCircle } from 'lucide-react';

const INK    = '#2C3539';
const SAGE   = '#87A96B';
const BLUSH  = '#F4C7C3';
const CANVAS = '#E8E6E1';
const CREAM  = '#FDFBF7';

const products = [
  {
    id: 1,
    name: 'MaryRuth Peach Mango Liquid Hair Supplement',
    price: 7499,
    image: '/IMG_5502 (1).JPG',
    badge: 'Best Seller',
    category: 'Hair Growth',
    description: 'Clinically-backed liquid formula with Lustriva®, Biotin & bioavailable vitamins to support hair growth from within.',
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
    description: 'Delicious daily gummies packed with vitamins C, D & Zinc to keep your little ones healthy year-round.',
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
    name: 'Kijivu Original Formula',
    price: null,
    image: '/nutraseller-manufacturing-3KsFrV7ySoQ-unsplash.jpg',
    badge: 'Coming Soon',
    category: 'Kijivu',
    description: 'Our own signature formula — developed in-house for the modern African woman. Launching soon.',
    comingSoon: true,
  },
];

const CATEGORIES = ['All', 'Hair Growth', 'Kids Health', 'Maternal Health', 'Kijivu'];

export default function ShopPage({ cart = [], onAddToCart }) {
  const [hoveredProduct, setHovered] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();

  const filtered = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Inter', sans-serif", background: CREAM, color: INK }}>

      {/* Nav */}
      <nav style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 100,
        display: 'grid', gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center', padding: '1.25rem 3rem',
        background: 'rgba(253,251,247,0.95)', backdropFilter: 'blur(12px)',
        borderBottom: `1px solid rgba(44,53,57,0.1)`,
        boxSizing: 'border-box',
      }}>
        <div style={{ display: 'flex', gap: '2.5rem' }}>
          <a href="/" style={{ textDecoration: 'none', color: INK, fontSize: '0.8rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Home</a>
          <a href="https://wa.me/254705016590" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: INK, fontSize: '0.8rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Support</a>
        </div>
        <a href="/" style={{ textDecoration: 'none' }}>
          <img src="/Kijivu Logo Design.png" alt="Kijivu" style={{ height: '48px', width: 'auto' }} />
        </a>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '2rem', alignItems: 'center' }}>
          <button onClick={() => navigate('/checkout')} style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', color: INK }}>
            <ShoppingCart style={{ width: 22, height: 22 }} />
            {cart.length > 0 && (
              <span style={{ position: 'absolute', top: -6, right: -6, background: BLUSH, color: INK, fontSize: '0.62rem', width: 18, height: 18, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Header */}
      <div style={{ paddingTop: '6rem', background: INK, color: CREAM }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '4rem 4rem 3rem' }}>
          <span style={{ fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: SAGE, display: 'block', marginBottom: '1rem' }}>
            Core Range
          </span>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(3rem, 6vw, 6rem)', textTransform: 'uppercase', lineHeight: 0.9, letterSpacing: '-0.03em', marginBottom: '2rem' }}>
            Shop
          </h1>
          <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: '1.2rem', color: `rgba(232,230,225,0.7)`, maxWidth: 480 }}>
            Premium American supplements, delivered to Kenya & Uganda.
          </p>
        </div>

        {/* Category filters */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 4rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', borderTop: `1px solid rgba(232,230,225,0.1)`, paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.72rem',
                textTransform: 'uppercase', letterSpacing: '0.06em',
                padding: '0.45rem 1.1rem', cursor: 'pointer',
                background: activeCategory === cat ? SAGE : 'transparent',
                color: activeCategory === cat ? 'white' : `rgba(232,230,225,0.6)`,
                border: activeCategory === cat ? `1.5px solid ${SAGE}` : `1.5px solid rgba(232,230,225,0.2)`,
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', background: `rgba(44,53,57,0.1)`, border: `1px solid rgba(44,53,57,0.1)` }}>
          {filtered.map((product) => (
            <div
              key={product.id}
              onMouseEnter={() => setHovered(product.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: hoveredProduct === product.id ? CANVAS : CREAM,
                transition: 'background 0.3s',
                display: 'flex', flexDirection: 'column',
              }}
            >
              {/* Image */}
              <div style={{ aspectRatio: '4/3', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s', transform: hoveredProduct === product.id ? 'scale(1.04)' : 'scale(1)' }}
                />
                {product.badge && (
                  <span style={{ position: 'absolute', top: '1rem', left: '1rem', background: product.comingSoon ? SAGE : INK, color: CREAM, padding: '0.3rem 0.75rem', fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Info */}
              <div style={{ padding: '1.75rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.62rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: SAGE, marginBottom: '0.5rem', display: 'block' }}>
                  {product.category}
                </span>
                <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '1.35rem', lineHeight: 1.25, marginBottom: '0.75rem' }}>
                  {product.name}
                </h3>
                <p style={{ fontSize: '0.85rem', color: `rgba(44,53,57,0.6)`, lineHeight: 1.6, marginBottom: '1.5rem', flexGrow: 1 }}>
                  {product.description}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.25rem', borderTop: `1px dotted rgba(44,53,57,0.15)` }}>
                  {product.comingSoon ? (
                    <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.85rem', color: SAGE, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Launching Soon
                    </span>
                  ) : product.buyLink ? (
                    <>
                      <a
                        href={product.buyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: 6,
                          fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.72rem',
                          textTransform: 'uppercase', letterSpacing: '0.06em',
                          padding: '0.6rem 1.25rem', cursor: 'pointer',
                          background: hoveredProduct === product.id ? INK : 'transparent',
                          color: hoveredProduct === product.id ? CREAM : INK,
                          border: `1.5px solid ${INK}`,
                          boxShadow: hoveredProduct === product.id ? `3px 3px 0 ${SAGE}` : 'none',
                          textDecoration: 'none',
                          transition: 'all 0.2s',
                        }}
                      >
                        Buy on Amazon <ArrowRight style={{ width: 13, height: 13 }} />
                      </a>
                      {product.freePdfLanding && (
                        <button
                          onClick={() => navigate('/free-waiting-room')}
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                            fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.72rem',
                            textTransform: 'uppercase', letterSpacing: '0.06em',
                            padding: '0.6rem 1.25rem', cursor: 'pointer', marginLeft: 12,
                            background: 'transparent', color: INK,
                            border: `1.5px dashed ${INK}`,
                            transition: 'all 0.2s',
                          }}
                        >
                          Free 3-Day PDF
                        </button>
                      )}
                    </>
                  ) : (
                    <>
                      {product.price != null ? (
                        <>
                          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1.2rem' }}>
                            <span style={{ fontSize: '0.68rem', fontWeight: 500 }}>KES </span>
                            {product.price.toLocaleString()}
                          </span>
                          <button
                            onClick={() => onAddToCart(product)}
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: 6,
                              fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.72rem',
                              textTransform: 'uppercase', letterSpacing: '0.06em',
                              padding: '0.6rem 1.25rem', cursor: 'pointer',
                              background: hoveredProduct === product.id ? INK : 'transparent',
                              color: hoveredProduct === product.id ? CREAM : INK,
                              border: `1.5px solid ${INK}`,
                              boxShadow: hoveredProduct === product.id ? `3px 3px 0 ${SAGE}` : 'none',
                              transition: 'all 0.2s',
                            }}
                          >
                            Add to Cart <ArrowRight style={{ width: 13, height: 13 }} />
                          </button>
                        </>
                      ) : (
                        <a href="https://wa.me/254705016590" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: INK, fontWeight: 700 }}>
                          Contact to order
                        </a>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp order option */}
        <div style={{ marginTop: '3rem', padding: '2rem', background: CANVAS, border: `1px solid rgba(44,53,57,0.1)`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem' }}>Prefer to order via WhatsApp?</p>
            <p style={{ fontSize: '0.85rem', color: `rgba(44,53,57,0.6)` }}>Message us directly and we'll sort your order.</p>
          </div>
          <a href="https://wa.me/254705016590" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '0.85rem 1.75rem', fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em', textDecoration: 'none', background: INK, color: CREAM, border: `2px solid ${INK}`, boxShadow: `4px 4px 0 ${SAGE}` }}>
            <MessageCircle style={{ width: 15, height: 15 }} /> WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  );
}
