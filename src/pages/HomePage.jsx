import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, MessageCircle, ArrowRight } from 'lucide-react';

const INK    = '#2C3539';
const SAGE   = '#87A96B';
const BLUSH  = '#F4C7C3';
const CANVAS = '#E8E6E1';
const CREAM  = '#FDFBF7';

const EXTRUDED = {
  textShadow: [1,2,3,4,5,6,7,8,9,10]
    .map(n => `${n}px ${n}px 0 ${SAGE}`)
    .join(', ') + `, 12px 12px 24px rgba(135,169,107,0.25)`,
};

const BTN_SOLID = {
  display: 'inline-flex', alignItems: 'center', gap: 8,
  padding: '0.9rem 2rem',
  fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.82rem',
  textTransform: 'uppercase', letterSpacing: '0.06em',
  textDecoration: 'none', cursor: 'pointer',
  background: INK, color: CREAM,
  border: `2px solid ${INK}`,
  boxShadow: `4px 4px 0 ${SAGE}`,
  transition: 'box-shadow 0.2s, transform 0.2s',
};

const BTN_OUTLINE = {
  ...BTN_SOLID,
  background: 'transparent', color: INK,
  boxShadow: `4px 4px 0 ${BLUSH}`,
};

const BTN_WHITE = {
  ...BTN_SOLID,
  background: 'white', color: SAGE,
  border: '2px solid white',
  boxShadow: `4px 4px 0 ${INK}`,
};

const BTN_OUTLINE_WHITE = {
  ...BTN_SOLID,
  background: 'transparent', color: 'white',
  border: '2px solid white',
  boxShadow: `4px 4px 0 ${INK}`,
};

const MARQUEE_TEXT = 'Premium Wellness \u00a0•\u00a0 Hair Growth \u00a0•\u00a0 Kids Health \u00a0•\u00a0 Maternal Health \u00a0•\u00a0 Delivered Kenya & Uganda \u00a0•\u00a0 ';

const products = [
  {
    id: 1,
    name: 'MaryRuth Peach Mango Liquid Hair Supplement',
    price: 7499,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&h=600&fit=crop',
    badge: 'Best Seller',
    category: 'Hair Growth',
    stock: 'In Stock',
  },
  {
    id: 2,
    name: 'MaryRuth Dragon Fruit Liquid Hair Supplement',
    price: 7499,
    image: 'https://images.unsplash.com/photo-1620411284481-0b56a0c351e2?w=500&h=600&fit=crop',
    badge: 'Waitlist',
    category: 'Hair Growth',
    stock: 'Coming Soon',
  },
  {
    id: 3,
    name: 'Kids Immunity Gummies',
    price: 4000,
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&h=600&fit=crop',
    category: 'Kids Health',
    stock: 'In Stock',
  },
  {
    id: 4,
    name: 'Prenatal & Postnatal Gummies',
    price: 5500,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&h=600&fit=crop',
    category: 'Maternal Health',
    stock: 'In Stock',
  },
];

const WHY_ROWS = [
  ['Deficiency',  '70% of Kenyans are zinc deficient'],
  ['Iron Deficit','36% of women lack essential iron'],
  ['The Gap',     "Hair products can't fix nutritional deficits"],
  ['Standard',    'Lustriva®, Biotin & bioavailable vitamins'],
];

export default function HomePage({ cart = [], onAddToCart }) {
  const [hoveredProduct, setHovered] = useState(null);
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Inter', sans-serif", background: CREAM, color: INK, overflowX: 'hidden' }}>

      {/* ── NAV ── */}
      <nav style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 100,
        display: 'grid', gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center', padding: '1.25rem 3rem',
        background: 'rgba(253,251,247,0.92)', backdropFilter: 'blur(12px)',
        borderBottom: `1px solid rgba(44,53,57,0.1)`,
      }}>
        <div className="nav-left" style={{ display: 'flex', gap: '2.5rem' }}>
          <a href="#shop"  style={{ textDecoration: 'none', color: INK, fontSize: '0.8rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Shop</a>
          <a href="#about" style={{ textDecoration: 'none', color: INK, fontSize: '0.8rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>About</a>
        </div>
        <a href="/" className="nav-center" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.75rem', letterSpacing: '-0.02em', textDecoration: 'none', color: INK }}>
          KIJIVU
        </a>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '2rem', alignItems: 'center' }}>
          <a href="https://wa.me/254705016590" target="_blank" rel="noopener noreferrer"
             style={{ textDecoration: 'none', color: INK, fontSize: '0.8rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Support
          </a>
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

      {/* ── HERO ── */}
      <section className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '55% 45%', minHeight: '100vh' }}>

        {/* Left — extruded text on dark */}
        <div className="hero-left" style={{
          background: INK, display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '4rem', overflow: 'hidden', position: 'relative',
        }}>
          <div style={{ position: 'absolute', bottom: 0, right: 0, width: '40%', height: '30%', background: SAGE, opacity: 0.12 }} />
          <div style={{ transform: 'rotate(-5deg)', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            {['KIJI', 'VU'].map(word => (
              <span key={word} style={{
                ...EXTRUDED,
                fontFamily: "'Syne', sans-serif", fontWeight: 800,
                fontSize: 'clamp(5rem, 13vw, 15rem)', lineHeight: 0.85,
                textTransform: 'uppercase', letterSpacing: '-0.04em',
                color: '#fff', display: 'block',
              }}>{word}</span>
            ))}
          </div>
        </div>

        {/* Right — editorial content */}
        <div style={{
          background: CANVAS, padding: '9rem 4rem 4rem',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          borderLeft: `1px solid rgba(44,53,57,0.1)`,
        }}>
          <span style={{ fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: SAGE, marginBottom: '1.5rem', display: 'block' }}>
            Premium Wellness for African Women
          </span>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(2rem, 3.5vw, 3.5rem)', lineHeight: 1.1, marginBottom: '1.5rem', color: INK }}>
            Nutritional science<br />
            <em>for the modern</em><br />
            African woman.
          </h1>
          <p style={{ fontSize: '0.95rem', maxWidth: '360px', marginBottom: '3rem', color: `rgba(44,53,57,0.7)`, lineHeight: 1.75 }}>
            Premium American supplements with clinically-backed ingredients your body can actually absorb — delivered to your door in Kenya & Uganda.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#shop" style={{ ...BTN_SOLID, textDecoration: 'none' }}>
              Shop Now <ArrowRight style={{ width: 15, height: 15 }} />
            </a>
            <a href="https://wa.me/254705016590" target="_blank" rel="noopener noreferrer" style={{ ...BTN_OUTLINE, textDecoration: 'none' }}>
              <MessageCircle style={{ width: 15, height: 15 }} /> WhatsApp
            </a>
          </div>

          {/* Stat strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', marginTop: '4rem', borderTop: `1px solid rgba(44,53,57,0.12)` }}>
            {[
              { val: '500+', label: 'Kenyan Women' },
              { val: '4',    label: 'Formulas' },
              { val: 'KE+UG', label: 'Delivery' },
            ].map((stat, i) => (
              <div key={i} style={{
                padding: '1.5rem 1.25rem 0.75rem',
                borderRight: i < 2 ? `1px solid rgba(44,53,57,0.12)` : 'none',
                paddingLeft: i === 0 ? 0 : '1.25rem',
              }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1.75rem', marginBottom: '0.2rem' }}>{stat.val}</div>
                <div style={{ fontSize: '0.7rem', color: `rgba(44,53,57,0.5)`, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ background: INK, padding: '1rem 0', overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <div className="marquee-track">
          {Array(10).fill(null).map((_, i) => (
            <span key={i} style={{ fontFamily: "'Syne', sans-serif", textTransform: 'uppercase', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.12em', color: CANVAS, paddingRight: '3rem' }}>
              {MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </div>

      {/* ── PRODUCTS ── */}
      <section id="shop" style={{ padding: '6rem 0', background: CREAM }}>
        <div style={{ padding: '0 4rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: `1px solid rgba(44,53,57,0.1)` }}>
          <div>
            <span style={{ fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: SAGE, display: 'block', marginBottom: '0.75rem' }}>Core Range</span>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(2.5rem, 4vw, 4rem)', lineHeight: 1 }}>Premium Supplements</h2>
          </div>
          <a href="https://wa.me/254705016590" target="_blank" rel="noopener noreferrer" style={{ ...BTN_OUTLINE, textDecoration: 'none', fontSize: '0.75rem' }}>
            Order via WhatsApp
          </a>
        </div>

        <div className="product-grid-inner" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderBottom: `1px solid rgba(44,53,57,0.1)` }}>
          {products.map((product, i) => (
            <div
              key={product.id}
              className="product-card"
              onMouseEnter={() => setHovered(product.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                borderRight: i < 3 ? `1px solid rgba(44,53,57,0.1)` : 'none',
                display: 'flex', flexDirection: 'column',
                background: hoveredProduct === product.id ? CANVAS : CREAM,
                transition: 'background 0.3s',
              }}
            >
              {/* Image */}
              <div style={{ aspectRatio: '3/4', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-img"
                />
                {product.badge && (
                  <span style={{ position: 'absolute', top: '1rem', right: '1rem', background: INK, color: CREAM, padding: '0.3rem 0.75rem', fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Info */}
              <div style={{ padding: '1.75rem', borderTop: `1px solid rgba(44,53,57,0.1)`, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.62rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: SAGE }}>{product.category}</span>
                  <span style={{ fontSize: '0.62rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: product.stock === 'In Stock' ? SAGE : '#c47a6b' }}>{product.stock}</span>
                </div>
                <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '1.3rem', lineHeight: 1.25, marginBottom: '1.5rem', flexGrow: 1 }}>{product.name}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.25rem', borderTop: `1px dotted rgba(44,53,57,0.15)` }}>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1.15rem' }}>
                    <span style={{ fontSize: '0.68rem', fontWeight: 500 }}>KES </span>
                    {product.price.toLocaleString()}
                  </span>
                  <button
                    onClick={() => onAddToCart(product)}
                    style={{
                      fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.7rem',
                      textTransform: 'uppercase', letterSpacing: '0.06em',
                      padding: '0.55rem 1.1rem', cursor: 'pointer',
                      background: hoveredProduct === product.id ? INK : 'transparent',
                      color: hoveredProduct === product.id ? CREAM : INK,
                      border: `1.5px solid ${INK}`,
                      boxShadow: hoveredProduct === product.id ? `3px 3px 0 ${SAGE}` : 'none',
                      transition: 'all 0.2s',
                    }}
                  >
                    {product.stock === 'In Stock' ? 'Add' : 'Waitlist'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY SECTION ── */}
      <section id="about" className="why-grid" style={{ display: 'grid', gridTemplateColumns: '55% 45%', background: INK, color: CANVAS }}>

        {/* Left: content */}
        <div style={{ padding: '6rem 4rem', borderRight: `1px solid rgba(232,230,225,0.1)` }}>
          <span style={{ fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: SAGE, display: 'block', marginBottom: '1.5rem' }}>The Science</span>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(2.5rem, 5vw, 5.5rem)', textTransform: 'uppercase', lineHeight: 0.9, marginBottom: '3rem', letterSpacing: '-0.03em' }}>
            WHY<br />PREMIUM<br />MATTERS
          </h2>

          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '3rem' }}>
            <tbody>
              {WHY_ROWS.map(([label, value]) => (
                <tr key={label}>
                  <th style={{ padding: '1rem 1.5rem 1rem 0', borderBottom: `1px solid rgba(232,230,225,0.12)`, textAlign: 'left', fontSize: '0.75rem', fontWeight: 400, color: `rgba(232,230,225,0.45)`, width: '28%', verticalAlign: 'top' }}>{label}</th>
                  <td style={{ padding: '1rem 0', borderBottom: `1px solid rgba(232,230,225,0.12)`, fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: '0.85rem', letterSpacing: '0.01em' }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <blockquote style={{ fontFamily: "'Instrument Serif', serif", fontSize: '1.45rem', lineHeight: 1.35, color: `rgba(232,230,225,0.82)`, fontStyle: 'italic', marginBottom: '0.5rem', maxWidth: '460px' }}>
            "Work willingly at whatever you do, as though you were working for the Lord."
          </blockquote>
          <p style={{ fontSize: '0.78rem', color: `rgba(232,230,225,0.4)` }}>— Colossians 3:23</p>
        </div>

        {/* Right: image */}
        <div style={{ position: 'relative', minHeight: 500, overflow: 'hidden' }}>
          <img
            src="https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800&h=1000&fit=crop"
            alt="Kijivu Wellness"
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) contrast(1.1)', mixBlendMode: 'luminosity', opacity: 0.6 }}
          />
          <div style={{ position: 'absolute', inset: 0, background: `rgba(135,169,107,0.1)` }} />
          <div style={{ position: 'absolute', bottom: '1.5rem', left: '2rem', fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '12rem', lineHeight: 1, color: SAGE, opacity: 0.1, pointerEvents: 'none', userSelect: 'none' }}>K</div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: SAGE, padding: '6rem 4rem', color: 'white' }}>
        <div style={{ maxWidth: '900px' }}>
          <span style={{ fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.65)', display: 'block', marginBottom: '1.5rem' }}>
            Begin Your Journey
          </span>
          <h2 className="cta-title" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(3.5rem, 9vw, 10rem)', textTransform: 'uppercase', lineHeight: 0.88, marginBottom: '3rem', letterSpacing: '-0.04em' }}>
            START<br />YOUR<br />WELLNESS
          </h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#shop" style={{ ...BTN_WHITE, textDecoration: 'none' }}>
              Shop Formulas <ArrowRight style={{ width: 15, height: 15 }} />
            </a>
            <a href="https://wa.me/254705016590" target="_blank" rel="noopener noreferrer" style={{ ...BTN_OUTLINE_WHITE, textDecoration: 'none' }}>
              <MessageCircle style={{ width: 15, height: 15 }} /> WhatsApp Support
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer-grid" style={{ background: INK, color: CANVAS, padding: '4rem', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem', borderTop: `1px solid rgba(232,230,225,0.08)` }}>
        <div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '2.5rem', display: 'block', marginBottom: '1rem', letterSpacing: '-0.02em' }}>KIJIVU</span>
          <p style={{ fontSize: '0.85rem', color: `rgba(232,230,225,0.6)`, lineHeight: 1.65, maxWidth: 220 }}>
            Premium wellness for the modern African woman. Kenya & Uganda.
          </p>
          <p style={{ fontSize: '0.72rem', color: `rgba(232,230,225,0.3)`, marginTop: '2rem', fontStyle: 'italic' }}>Colossians 3:23</p>
          <p style={{ fontSize: '0.7rem', color: `rgba(232,230,225,0.3)`, marginTop: '1.5rem' }}>© 2026 Kijivu. All rights reserved.</p>
        </div>
        <div className="footer-links-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          {[
            {
              heading: 'Shop',
              links: [
                { label: 'Hair Growth', href: '#shop' },
                { label: 'Kids Health', href: '#shop' },
                { label: 'Maternal Health', href: '#shop' },
                { label: 'All Products', href: '#shop' },
              ],
            },
            {
              heading: 'Support',
              links: [
                { label: 'FAQs', href: '#' },
                { label: 'Delivery Info', href: '#' },
                { label: 'Returns', href: '#' },
                { label: 'Contact Us', href: 'https://wa.me/254705016590' },
              ],
            },
            {
              heading: 'Connect',
              links: [
                { label: '+254 705 016 590', href: 'tel:+254705016590' },
                { label: 'WhatsApp Support', href: 'https://wa.me/254705016590' },
                { label: 'Kenya & Uganda', href: '#' },
              ],
            },
          ].map(({ heading, links }) => (
            <div key={heading}>
              <h4 style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1.5rem', fontWeight: 700 }}>{heading}</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {links.map(({ label, href }) => (
                  <li key={label} style={{ marginBottom: '0.75rem' }}>
                    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                       style={{ textDecoration: 'none', color: `rgba(232,230,225,0.55)`, fontSize: '0.85rem', transition: 'color 0.2s' }}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}
