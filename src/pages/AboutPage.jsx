import { useNavigate } from 'react-router-dom';
import { ShoppingCart, MessageCircle, ArrowRight } from 'lucide-react';

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

export default function AboutPage({ cart = [] }) {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Inter', sans-serif", background: CREAM, color: NAVY }}>

      {/* ── NAV ── */}
      <nav style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 100,
        display: 'grid', gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center', padding: '1.25rem 3rem',
        background: 'rgba(13,27,42,0.92)', backdropFilter: 'blur(12px)',
        borderBottom: `1px solid rgba(255,255,255,0.08)`,
        boxSizing: 'border-box',
      }}>
        <div style={{ display: 'flex', gap: '2.5rem' }}>
          <a href="/" style={{ textDecoration: 'none', color: CREAM, fontSize: '0.8rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Home</a>
          <a href="/shop" style={{ textDecoration: 'none', color: CREAM, fontSize: '0.8rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Shop</a>
        </div>
        <a href="/" style={{ textDecoration: 'none' }}>
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

      {/* ── PAGE HEADER ── */}
      <div style={{ paddingTop: '6rem', background: NAVY, color: CREAM }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '5rem 4rem 4rem' }}>
          <span style={{ fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: SAGE, display: 'block', marginBottom: '1rem' }}>
            Our Story
          </span>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(3rem, 7vw, 7rem)', textTransform: 'uppercase', lineHeight: 0.88, letterSpacing: '-0.03em', marginBottom: '2rem' }}>
            About<br />Kijivu
          </h1>
          <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: '1.25rem', color: `rgba(232,230,225,0.65)`, maxWidth: 520, lineHeight: 1.6 }}>
            Built for every woman who has been underserved, overlooked, or simply forgotten by the mainstream wellness industry.
          </p>
        </div>
      </div>

      {/* ── FOUNDER SECTION ── */}
      <section style={{ background: NAVY, color: CANVAS, padding: '0 4rem 7rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '6rem', alignItems: 'start' }}>

          {/* Photo */}
          <div style={{ position: 'relative' }}>
            <img
              src="/1748563708956.jpg"
              alt="Xaviera Gitau McCleskey — Founder of Kijivu"
              style={{ width: '100%', display: 'block', filter: 'grayscale(15%)' }}
            />
            <div style={{ position: 'absolute', bottom: '-1rem', right: '-1rem', background: SAGE, padding: '0.85rem 1.5rem' }}>
              <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'white', margin: 0 }}>Founder & CEO</p>
            </div>
          </div>

          {/* Bio */}
          <div style={{ paddingTop: '1rem' }}>
            <span style={{ fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: SAGE, display: 'block', marginBottom: '1.5rem' }}>Meet the Founder</span>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', lineHeight: 1.1, marginBottom: '2.5rem', color: CREAM }}>
              Xaviera Gitau<br />McCleskey
            </h2>
            <div style={{ fontSize: '0.95rem', lineHeight: 1.9, color: `rgba(232,230,225,0.75)` }}>
              <p style={{ marginBottom: '1.5rem' }}>
                Growing up Kenyan and living between two worlds, I kept seeing the same pattern: brilliant, hardworking women neglecting their own health because the right products either didn't exist locally, or weren't made with them in mind.
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                The wellness industry has spent decades designing for a narrow image of who a "healthy woman" looks like. Women of colour, women in the Global South, women with different nutritional needs — we were an afterthought. Or no thought at all.
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                I founded Kijivu to change that. We source premium, clinically-backed supplements and deliver them directly to your door. No pharmacy queues, no overpriced imports, no guesswork.
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                I personally follow up with every customer to make sure you're getting the most from your supplements. You're not just buying a product. You're starting a wellness journey, and I'm here for every step of it.
              </p>
              <p style={{ marginBottom: '2.5rem' }}>
                Right now, I'm also developing the Kijivu Original Formula — our very own supplement designed from the ground up for women who have been underserved. Built on real science, shaped by your feedback, and made to fill the gaps nothing else does. It's the product I've always wanted to put in your hands.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="https://wa.me/254705016590?text=Hi%20Xaviera!%20I%20saw%20your%20story%20on%20the%20Kijivu%20website%20and%20I'd%20love%20to%20learn%20more."
                target="_blank" rel="noopener noreferrer"
                style={{ ...BTN_WHITE, textDecoration: 'none' }}>
                <MessageCircle style={{ width: 15, height: 15 }} /> Chat with Xaviera
              </a>
              <a href="/shop" style={{ ...BTN_OUTLINE, background: 'transparent', color: CREAM, border: `2px solid rgba(232,230,225,0.3)`, boxShadow: `4px 4px 0 rgba(135,169,107,0.4)`, textDecoration: 'none' }}>
                Shop Now <ArrowRight style={{ width: 14, height: 14 }} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section style={{ background: CANVAS, padding: '7rem 4rem' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <span style={{ fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: SAGE, display: 'block', marginBottom: '1.5rem', textAlign: 'center' }}>Our Mission</span>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.15, marginBottom: '4rem', color: NAVY, textAlign: 'center' }}>
            No woman left behind.<br /><em>No body left guessing.</em>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {[
              {
                title: 'Clinically Backed',
                body: 'Every product we stock is chosen for its bioavailability and clinical evidence. No filler, no trends, no guesswork.',
              },
              {
                title: 'Radically Accessible',
                body: 'Pay 50% deposit, balance on delivery. Order on WhatsApp. Next-day dispatch. We removed every barrier we could find.',
              },
              {
                title: 'Built for You',
                body: 'We are developing the Kijivu Original Formula from scratch — designed around the nutritional gaps mainstream brands have ignored for decades.',
              },
            ].map(({ title, body }) => (
              <div key={title} style={{ padding: '2.5rem 2rem', background: CREAM, borderBottom: `3px solid ${SAGE}` }}>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.88rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: NAVY, marginBottom: '1rem' }}>{title}</h3>
                <p style={{ fontSize: '0.88rem', color: `rgba(13,27,42,0.65)`, lineHeight: 1.7 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCRIPTURE ── */}
      <section style={{ background: NAVY, padding: '7rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ width: 40, height: 2, background: SAGE, margin: '0 auto 3rem' }} />
          <blockquote style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', lineHeight: 1.35, color: CREAM, fontStyle: 'italic', marginBottom: '1.5rem' }}>
            "Work willingly at whatever you do, as though you were working for the Lord."
          </blockquote>
          <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: SAGE }}>
            Colossians 3:23
          </p>
          <div style={{ width: 40, height: 2, background: SAGE, margin: '3rem auto 0' }} />
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: SAGE, padding: '5rem 4rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'white', marginBottom: '1rem', lineHeight: 1.2 }}>
            Ready to start your<br /><em>wellness journey?</em>
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', marginBottom: '2.5rem', lineHeight: 1.7 }}>
            Browse our core range or message us directly on WhatsApp. We're a real team and we're here to help.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/shop" style={{ ...BTN_SOLID, textDecoration: 'none', background: NAVY, border: `2px solid ${NAVY}`, boxShadow: `4px 4px 0 rgba(0,0,0,0.25)` }}>
              Shop Now <ArrowRight style={{ width: 14, height: 14 }} />
            </a>
            <a href="https://wa.me/254705016590" target="_blank" rel="noopener noreferrer"
              style={{ ...BTN_SOLID, textDecoration: 'none', background: '#25D366', border: '2px solid #25D366', boxShadow: `4px 4px 0 rgba(0,0,0,0.2)` }}>
              <MessageCircle style={{ width: 14, height: 14 }} /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: NAVY, color: CANVAS, padding: '3rem 4rem', borderTop: `1px solid rgba(232,230,225,0.08)`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <img src="/Kijivu Logo Design.png" alt="Kijivu" style={{ height: '40px', width: 'auto', mixBlendMode: 'screen' }} />
        <p style={{ fontSize: '0.75rem', color: `rgba(232,230,225,0.35)` }}>© 2026 Kijivu. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <a href="/shop" style={{ textDecoration: 'none', color: `rgba(232,230,225,0.5)`, fontSize: '0.8rem' }}>Shop</a>
          <a href="https://wa.me/254705016590" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: `rgba(232,230,225,0.5)`, fontSize: '0.8rem' }}>WhatsApp</a>
          <a href="/privacy" style={{ textDecoration: 'none', color: `rgba(232,230,225,0.5)`, fontSize: '0.8rem' }}>Privacy</a>
        </div>
      </footer>

    </div>
  );
}
