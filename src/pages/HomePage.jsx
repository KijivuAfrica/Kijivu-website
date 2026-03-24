import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, MessageCircle, ArrowRight, Instagram, X, Mail, ChevronDown } from 'lucide-react';
import { supabase } from '../lib/supabase';

const TikTokIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.53V6.78a4.85 4.85 0 01-1.01-.09z"/>
  </svg>
);

const NAVY   = '#0d1b2a';
const SAGE   = '#87A96B';
const BLUSH  = '#F4C7C3';
const CANVAS = '#eeedf2';
const CREAM  = '#fafafa';

const BTN_SOLID = {
  display: 'inline-flex', alignItems: 'center', gap: 8,
  padding: '0.9rem 2rem',
  fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.82rem',
  textTransform: 'uppercase', letterSpacing: '0.06em',
  textDecoration: 'none', cursor: 'pointer',
  background: NAVY, color: CREAM,
  border: `2px solid ${NAVY}`,
  boxShadow: `4px 4px 0 ${SAGE}`,
  transition: 'box-shadow 0.2s, transform 0.2s',
};

const BTN_OUTLINE = {
  ...BTN_SOLID,
  background: 'transparent', color: NAVY,
  boxShadow: `4px 4px 0 ${BLUSH}`,
};

const BTN_WHITE = {
  ...BTN_SOLID,
  background: 'white', color: SAGE,
  border: '2px solid white',
  boxShadow: `4px 4px 0 ${NAVY}`,
};

const BTN_OUTLINE_WHITE = {
  ...BTN_SOLID,
  background: 'transparent', color: 'white',
  border: '2px solid white',
  boxShadow: `4px 4px 0 rgba(135,169,107,0.6)`,
};

const MARQUEE_TEXT = 'Premium Wellness \u00a0•\u00a0 Hair Growth \u00a0•\u00a0 Kids Health \u00a0•\u00a0 Maternal Health \u00a0•\u00a0 Delivered Kenya & Uganda \u00a0•\u00a0 ';

const products = [
  { id: 1, name: 'MaryRuth Peach Mango Liquid Hair Supplement', price: 7499, image: '/IMG_5502 (1).JPG', badge: 'Best Seller', category: 'Hair Growth' },
  { id: 2, name: 'MaryRuth Dragon Fruit Liquid Hair Supplement', price: 7499, image: '/IMG_5505.JPG', category: 'Hair Growth' },
  { id: 3, name: 'Kids Immunity Gummies',                        price: 4000, image: '/IMG_4899.JPG',  category: 'Kids Health' },
  { id: 4, name: 'Prenatal & Postnatal Gummies',                 price: 5500, image: '/IMG_4905.JPG',  category: 'Maternal Health' },
  { id: 5, name: 'MaryRuth Daily Liquid Hair Support 500mg',     price: 7000, image: '/Hair Formula PICTURE.jpeg', category: 'Hair Growth' },
];

const WHY_STATS = [
  {
    stat: '34%',
    label: 'Vitamin D Deficient',
    detail: 'of Africans are clinically Vitamin D deficient — rising to 58% when measuring insufficiency. Melanin-rich skin reduces UV absorption by up to 99%.',
    source: 'The Lancet Global Health, 2019',
    url: 'https://www.thelancet.com/journals/langlo/article/PIIS2214-109X(19)30457-7/fulltext',
  },
  {
    stat: '51%',
    label: 'Iron Deficiency Anaemia',
    detail: 'of African women of reproductive age suffer from anemia. Among pregnant women in Kenya, Ethiopia & Nigeria this rises to over 60%.',
    source: 'PMC Systematic Review — Ethiopia, Kenya, Nigeria, South Africa',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5691713/',
  },
  {
    stat: '70%',
    label: 'Zinc Deficient',
    detail: 'of women in East Africa — including Kenya — are zinc deficient. Zinc is critical for hair follicle repair, immune function, and cell growth.',
    source: 'PMC — Zinc deficiency, East Africa',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5691713/',
  },
  {
    stat: '↑',
    label: 'Hair Products Won\'t Fix This',
    detail: 'Topical hair products cannot correct nutritional deficiencies. Only clinically-backed, bioavailable supplements address the root cause.',
    source: null,
    url: null,
  },
];

export default function HomePage({ cart = [], onAddToCart }) {
  const [hoveredProduct, setHovered] = useState(null);
  const [showPopup, setShowPopup]     = useState(false);
  const [email, setEmail]             = useState('');
  const [submitted, setSubmitted]     = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('kijivuPopupSeen')) return;
    const t = setTimeout(() => {
      setShowPopup(true);
      sessionStorage.setItem('kijivuPopupSeen', '1');
    }, 2500);
    return () => clearTimeout(t);
  }, []);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    await supabase.from('leads').insert({ email, source: 'early_access_popup' });
    setSubmitted(true);
  };

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Inter', sans-serif", background: CREAM, color: NAVY, overflowX: 'hidden' }}>

      {/* ── POPUP ── */}
      {showPopup && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(13,27,42,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
          onClick={e => { if (e.target === e.currentTarget) setShowPopup(false); }}>
          <div style={{ background: CREAM, maxWidth: 480, width: '100%', padding: '3rem', position: 'relative', boxShadow: `8px 8px 0 ${SAGE}` }}>
            <button onClick={() => setShowPopup(false)} style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', cursor: 'pointer', color: `rgba(13,27,42,0.4)` }}>
              <X size={20} />
            </button>
            {!submitted ? (
              <>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: SAGE, display: 'block', marginBottom: '1rem' }}>Something Big Is Coming</span>
                <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '2.4rem', lineHeight: 1.1, marginBottom: '1rem', color: NAVY }}>The Kijivu Original Formula is almost here.</h2>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: `rgba(13,27,42,0.65)`, marginBottom: '2rem' }}>
                  We've spent months formulating something truly special — a Kijivu-owned wellness formula designed specifically for African women. Be the first to know when it drops, and get exclusive early access pricing.
                </p>
                <form onSubmit={handleEmailSubmit} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 200, display: 'flex', alignItems: 'center', border: `1.5px solid ${NAVY}`, padding: '0 1rem', gap: '0.5rem' }}>
                    <Mail size={16} style={{ color: `rgba(13,27,42,0.35)`, flexShrink: 0 }} />
                    <input type="email" required placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)}
                      style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '0.88rem', color: NAVY, padding: '0.75rem 0', width: '100%' }} />
                  </div>
                  <button type="submit" style={{ ...BTN_SOLID, padding: '0.75rem 1.5rem' }}>Get Early Access</button>
                </form>
                <p style={{ fontSize: '0.7rem', color: `rgba(13,27,42,0.35)`, marginTop: '1rem' }}>No spam. Just one email when it launches.</p>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌿</div>
                <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '2rem', marginBottom: '0.75rem' }}>You're on the list!</h2>
                <p style={{ fontSize: '0.9rem', color: `rgba(13,27,42,0.65)`, lineHeight: 1.7 }}>We'll send you an exclusive notification the moment the Kijivu Original Formula is ready.</p>
                <button onClick={() => setShowPopup(false)} style={{ ...BTN_SOLID, marginTop: '2rem' }}>Continue Shopping</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── FLOATING SOCIAL SIDEBAR ── */}
      <div style={{ position: 'fixed', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', zIndex: 99, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <a href="https://www.instagram.com/kijivu_/" target="_blank" rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, background: NAVY, color: CREAM, textDecoration: 'none', transition: 'background 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.background = SAGE} onMouseLeave={e => e.currentTarget.style.background = NAVY}>
          <Instagram size={17} />
        </a>
        <a href="https://www.tiktok.com/@Luke418free" target="_blank" rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, background: NAVY, color: CREAM, textDecoration: 'none', transition: 'background 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.background = SAGE} onMouseLeave={e => e.currentTarget.style.background = NAVY}>
          <TikTokIcon size={17} />
        </a>
      </div>

      {/* ── NAV ── */}
      <nav style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 100,
        display: 'grid', gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center', padding: '1.25rem 3rem',
        background: 'rgba(13,27,42,0.85)', backdropFilter: 'blur(12px)',
        borderBottom: `1px solid rgba(255,255,255,0.08)`,
      }}>
        <div className="nav-left" style={{ display: 'flex', gap: '2.5rem' }}>
          <a href="#/shop" style={{ textDecoration: 'none', color: CREAM, fontSize: '0.8rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Shop</a>
          <a href="#about" style={{ textDecoration: 'none', color: CREAM, fontSize: '0.8rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>About</a>
        </div>
        <a href="/" className="nav-center" style={{ textDecoration: 'none' }}>
          <img src="/Kijivu Logo Design.png" alt="Kijivu" style={{ height: '44px', width: 'auto', mixBlendMode: 'screen' }} />
        </a>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '2rem', alignItems: 'center' }}>
          <a href="https://wa.me/254705016590" target="_blank" rel="noopener noreferrer"
             style={{ textDecoration: 'none', color: CREAM, fontSize: '0.8rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Support</a>
          <button onClick={() => navigate('/checkout')} style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', color: CREAM }}>
            <ShoppingCart style={{ width: 22, height: 22 }} />
            {cart.length > 0 && (
              <span style={{ position: 'absolute', top: -6, right: -6, background: BLUSH, color: NAVY, fontSize: '0.62rem', width: 18, height: 18, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* ── SECTION 1: HERO — centered Kijivu ── */}
      <section style={{
        minHeight: '100vh', background: NAVY,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
        textAlign: 'center',
      }}>
        {/* Background glow */}
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 60%, rgba(135,169,107,0.12) 0%, transparent 65%)`, pointerEvents: 'none' }} />

        {/* Centered content */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
          {/* Big extruded wordmark */}
          <div style={{ textAlign: 'center', lineHeight: 0.85 }}>
            <span style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800,
              fontSize: 'clamp(6rem, 18vw, 18rem)',
              textTransform: 'uppercase', letterSpacing: '-0.04em',
              color: '#fff', display: 'block',
              textShadow: [1,2,3,4,5,6,7,8,9,10]
                .map(n => `${n}px ${n}px 0 ${SAGE}`)
                .join(', ') + `, 12px 12px 32px rgba(135,169,107,0.3)`,
            }}>
              KIJIVU
            </span>
          </div>

          <p style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 'clamp(1rem, 2vw, 1.5rem)', color: `rgba(232,230,225,0.55)`, maxWidth: 420, textAlign: 'center' }}>
            Premium wellness for the modern African woman.
          </p>

          <a href="#/shop" style={{ ...BTN_WHITE, textDecoration: 'none' }}>
            Shop Now <ArrowRight style={{ width: 15, height: 15 }} />
          </a>
        </div>

        {/* Scroll hint */}
        <div style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ fontSize: '0.6rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(232,230,225,0.3)' }}>Scroll</span>
          <ChevronDown size={16} style={{ color: 'rgba(232,230,225,0.3)' }} />
        </div>
      </section>

      {/* ── SECTION 2: COMING SOON — Kijivu Original Formula ── */}
      <section style={{ background: NAVY, color: CREAM, borderTop: `1px solid rgba(255,255,255,0.06)` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 640 }}>
          {/* Left: bottle photo */}
          <div style={{ position: 'relative', overflow: 'hidden', minHeight: 500 }}>
            <img
              src="/nutraseller-manufacturing-3KsFrV7ySoQ-unsplash.jpg"
              alt="Kijivu Original Formula"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, rgba(13,27,42,0.1) 0%, rgba(13,27,42,0.65) 100%)` }} />
            <span style={{ position: 'absolute', top: '2rem', left: '2rem', background: SAGE, color: 'white', padding: '0.4rem 1rem', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Coming Soon
            </span>
            <span style={{ position: 'absolute', bottom: '2rem', right: '2rem', fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)' }}>2026</span>
          </div>

          {/* Right: content */}
          <div style={{ padding: '5rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: SAGE, display: 'block', marginBottom: '1.5rem' }}>
              Kijivu Original — Launching in 2–3 Months
            </span>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(2.5rem, 4vw, 4rem)', lineHeight: 1.05, marginBottom: '1.5rem' }}>
              Our own formula.<br /><em>Built for you.</em>
            </h2>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: `rgba(232,230,225,0.75)`, marginBottom: '2.5rem', maxWidth: 400 }}>
              For months we've been working on something that doesn't exist yet — a wellness formula formulated specifically for African women, by Kijivu. Designed to address what's missing, not just what's trending.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button onClick={() => setShowPopup(true)} style={{ ...BTN_WHITE, border: 'none' }}>
                Get Early Access <ArrowRight style={{ width: 15, height: 15 }} />
              </button>
              <a href="https://wa.me/254705016590" target="_blank" rel="noopener noreferrer" style={{ ...BTN_OUTLINE_WHITE, textDecoration: 'none' }}>
                <MessageCircle style={{ width: 15, height: 15 }} /> Ask Us About It
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ background: SAGE, padding: '1rem 0', overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <div className="marquee-track">
          {Array(10).fill(null).map((_, i) => (
            <span key={i} style={{ fontFamily: "'Syne', sans-serif", textTransform: 'uppercase', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.12em', color: 'white', paddingRight: '3rem' }}>
              {MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </div>

      {/* ── SECTION 3: START YOUR WELLNESS JOURNEY ── */}
      <section style={{ background: CANVAS, padding: '8rem 4rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: SAGE, display: 'block', marginBottom: '1.5rem' }}>
              Premium Wellness for African Women
            </span>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(2.5rem, 4vw, 4rem)', lineHeight: 1.1, marginBottom: '1.5rem', color: NAVY }}>
              Start your<br /><em>wellness journey</em><br />today.
            </h2>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: `rgba(13,27,42,0.7)`, marginBottom: '2.5rem' }}>
              Premium American supplements with clinically-backed ingredients your body can actually absorb — delivered to your door in Kenya & Uganda.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#/shop" style={{ ...BTN_SOLID, textDecoration: 'none' }}>
                Shop Now <ArrowRight style={{ width: 15, height: 15 }} />
              </a>
              <a href="https://wa.me/254705016590" target="_blank" rel="noopener noreferrer" style={{ ...BTN_OUTLINE, textDecoration: 'none' }}>
                <MessageCircle style={{ width: 15, height: 15 }} /> WhatsApp
              </a>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            {[
              { val: '500+', label: 'Kenyan Women Served' },
              { val: '5',    label: 'Premium Formulas' },
              { val: 'KE+UG', label: 'Delivery Countries' },
              { val: '100%', label: 'Clinically Backed' },
            ].map((stat, i) => (
              <div key={i} style={{ background: CREAM, padding: '2rem 1.5rem', borderBottom: `3px solid ${SAGE}` }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '2rem', marginBottom: '0.3rem', color: NAVY }}>{stat.val}</div>
                <div style={{ fontSize: '0.7rem', color: `rgba(13,27,42,0.5)`, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: PRODUCTS ── */}
      <section id="shop" style={{ padding: '6rem 0', background: CREAM }}>
        <div style={{ padding: '0 4rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: `1px solid rgba(13,27,42,0.1)` }}>
          <div>
            <span style={{ fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: SAGE, display: 'block', marginBottom: '0.75rem' }}>Curated For You</span>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(2.5rem, 4vw, 4rem)', lineHeight: 1 }}>Products we think<br /><em>you might need</em></h2>
          </div>
          <a href="https://wa.me/254705016590" target="_blank" rel="noopener noreferrer" style={{ ...BTN_OUTLINE, textDecoration: 'none', fontSize: '0.75rem' }}>
            Order via WhatsApp
          </a>
        </div>
        <div className="product-grid-inner" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', borderBottom: `1px solid rgba(13,27,42,0.1)` }}>
          {products.map((product, i) => (
            <div key={product.id}
              onMouseEnter={() => setHovered(product.id)} onMouseLeave={() => setHovered(null)}
              style={{ borderRight: i < 4 ? `1px solid rgba(13,27,42,0.1)` : 'none', display: 'flex', flexDirection: 'column', background: hoveredProduct === product.id ? CANVAS : CREAM, transition: 'background 0.3s' }}>
              <div style={{ aspectRatio: '3/4', overflow: 'hidden', position: 'relative' }}>
                <img src={product.image} alt={product.name} className="product-img" />
                {product.badge && (
                  <span style={{ position: 'absolute', top: '1rem', right: '1rem', background: NAVY, color: CREAM, padding: '0.3rem 0.75rem', fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {product.badge}
                  </span>
                )}
              </div>
              <div style={{ padding: '1.5rem', borderTop: `1px solid rgba(13,27,42,0.1)`, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.62rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: SAGE, marginBottom: '0.5rem', display: 'block' }}>{product.category}</span>
                <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '1.1rem', lineHeight: 1.25, marginBottom: '1.25rem', flexGrow: 1 }}>{product.name}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: `1px dotted rgba(13,27,42,0.15)` }}>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1rem' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 500 }}>KES </span>{product.price.toLocaleString()}
                  </span>
                  <button onClick={() => onAddToCart(product)}
                    style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '0.5rem 1rem', cursor: 'pointer', background: hoveredProduct === product.id ? NAVY : 'transparent', color: hoveredProduct === product.id ? CREAM : NAVY, border: `1.5px solid ${NAVY}`, boxShadow: hoveredProduct === product.id ? `3px 3px 0 ${SAGE}` : 'none', transition: 'all 0.2s' }}>
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 5: WHY PREMIUM INGREDIENTS MATTER ── */}
      <section id="about" style={{ background: NAVY, color: CANVAS, padding: '7rem 4rem' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <span style={{ fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: SAGE, display: 'block', marginBottom: '1.5rem' }}>The Science</span>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(2.5rem, 5vw, 5rem)', textTransform: 'uppercase', lineHeight: 0.9, marginBottom: '1rem', letterSpacing: '-0.03em' }}>
            WHY PREMIUM,<br />SCIENTIFICALLY<br />BACKED INGREDIENTS<br />MATTER
          </h2>
          <p style={{ fontSize: '0.9rem', color: `rgba(232,230,225,0.55)`, maxWidth: 540, marginBottom: '4rem', lineHeight: 1.7 }}>
            The data is clear: women of African descent face unique nutritional gaps that are rarely addressed by mainstream wellness brands. We built Kijivu to change that.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5px', background: 'rgba(232,230,225,0.08)' }}>
            {WHY_STATS.map(({ stat, label, detail, source, url }) => (
              <div key={label} style={{ background: NAVY, padding: '2.5rem', borderBottom: `1px solid rgba(232,230,225,0.08)` }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '3.5rem', color: SAGE, lineHeight: 1, marginBottom: '0.5rem' }}>{stat}</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem', color: CANVAS }}>{label}</div>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.7, color: `rgba(232,230,225,0.6)`, marginBottom: source ? '1rem' : 0 }}>{detail}</p>
                {source && url && (
                  <a href={url} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: '0.68rem', color: `rgba(135,169,107,0.7)`, textDecoration: 'none', borderBottom: `1px solid rgba(135,169,107,0.3)`, paddingBottom: '1px' }}>
                    ↗ {source}
                  </a>
                )}
              </div>
            ))}
          </div>

          <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#/shop" style={{ ...BTN_WHITE, textDecoration: 'none' }}>
              Shop Formulas <ArrowRight style={{ width: 15, height: 15 }} />
            </a>
            <a href="https://wa.me/254705016590" target="_blank" rel="noopener noreferrer" style={{ ...BTN_OUTLINE_WHITE, textDecoration: 'none' }}>
              <MessageCircle style={{ width: 15, height: 15 }} /> WhatsApp Support
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: COLOSSIANS 3:23 ── */}
      <section style={{ background: CANVAS, padding: '8rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ width: 40, height: 2, background: SAGE, margin: '0 auto 3rem' }} />
          <blockquote style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', lineHeight: 1.35, color: NAVY, fontStyle: 'italic', marginBottom: '1.5rem' }}>
            "Work willingly at whatever you do, as though you were working for the Lord."
          </blockquote>
          <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: SAGE }}>
            Colossians 3:23
          </p>
          <div style={{ width: 40, height: 2, background: SAGE, margin: '3rem auto 0' }} />
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer-grid" style={{ background: NAVY, color: CANVAS, padding: '4rem', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem', borderTop: `1px solid rgba(232,230,225,0.08)` }}>
        <div>
          <img src="/Kijivu Logo Design.png" alt="Kijivu" style={{ height: '56px', width: 'auto', display: 'block', marginBottom: '1rem', mixBlendMode: 'screen' }} />
          <p style={{ fontSize: '0.85rem', color: `rgba(232,230,225,0.6)`, lineHeight: 1.65, maxWidth: 220 }}>
            Premium wellness for the modern African woman. Kenya & Uganda.
          </p>
          <p style={{ fontSize: '0.7rem', color: `rgba(232,230,225,0.3)`, marginTop: '1.5rem' }}>© 2026 Kijivu. All rights reserved.</p>
        </div>
        <div className="footer-links-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          {[
            { heading: 'Shop', links: [
              { label: 'Hair Growth',     href: '#/shop' },
              { label: 'Kids Health',     href: '#/shop' },
              { label: 'Maternal Health', href: '#/shop' },
              { label: 'All Products',    href: '#/shop' },
            ]},
            { heading: 'Support', links: [
              { label: 'FAQs',           href: '#' },
              { label: 'Delivery Info',  href: '#' },
              { label: 'Returns',        href: '#' },
              { label: 'Contact Us',     href: 'https://wa.me/254705016590' },
              { label: 'Privacy Policy', href: '#/privacy' },
            ]},
            { heading: 'Connect', links: [
              { label: '+254 705 016 590',   href: 'tel:+254705016590' },
              { label: 'WhatsApp Support',   href: 'https://wa.me/254705016590' },
              { label: 'Instagram @kijivu_', href: 'https://www.instagram.com/kijivu_/' },
              { label: 'TikTok @kijivu_',    href: 'https://www.tiktok.com/@kijivu_' },
            ]},
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
