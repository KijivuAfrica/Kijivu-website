import { useNavigate } from 'react-router-dom';
import { ShoppingCart, MessageCircle, ArrowRight } from 'lucide-react';

const BONE   = '#F4F1EA';
const FOREST = '#1A1F1C';
const OLIVE  = '#6B7D6E';
const GREEN  = '#2E9E60';
const DUST   = '#6A6A60';

const RALEWAY  = "'Raleway', sans-serif";
const GARAMOND = "'EB Garamond', serif";
const CINZEL   = "'Cinzel', serif";

export default function AboutPage({ cart = [] }) {
  const navigate = useNavigate();

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
          <a href="/shop" style={{ textDecoration: 'none', color: FOREST, fontFamily: RALEWAY, fontWeight: 300, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Shop</a>
        </div>
        <a href="/" style={{ textDecoration: 'none' }}>
          <img src="/Kijivu Logo Design.png" alt="Kijivu" style={{ height: '44px', width: 'auto' }} />
        </a>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '2rem', alignItems: 'center' }}>
          <a href="https://wa.me/254705016590" target="_blank" rel="noopener noreferrer"
             style={{ textDecoration: 'none', color: FOREST, fontFamily: RALEWAY, fontWeight: 300, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Support</a>
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

      {/* Page Header */}
      <div style={{ paddingTop: '6rem', background: FOREST, color: BONE }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '5rem 4rem 4rem' }}>
          <span style={{ fontFamily: RALEWAY, fontWeight: 300, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: `rgba(244,241,234,0.45)`, display: 'block', marginBottom: '1.25rem' }}>
            Our Story
          </span>
          <h1 style={{ fontFamily: RALEWAY, fontWeight: 200, fontSize: 'clamp(2.5rem, 6vw, 6rem)', textTransform: 'uppercase', lineHeight: 0.95, letterSpacing: '0.1em', marginBottom: '2rem', color: BONE }}>
            About<br />Kijivu
          </h1>
          <p style={{ fontFamily: GARAMOND, fontStyle: 'italic', fontSize: '1.2rem', color: `rgba(244,241,234,0.55)`, maxWidth: 480, lineHeight: 1.65 }}>
            Built for every woman who has been underserved, overlooked, or simply forgotten by the mainstream wellness industry.
          </p>
        </div>
      </div>

      {/* Founder Section */}
      <section style={{ background: FOREST, color: BONE, padding: '0 4rem 7rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '6rem', alignItems: 'start' }}>

          {/* Photo */}
          <div style={{ position: 'relative' }}>
            <img
              src="/1748563708956.jpg"
              alt="Xaviera Gitau McCleskey — Founder of Kijivu"
              style={{ width: '100%', display: 'block', filter: 'grayscale(10%)' }}
            />
            <div style={{ position: 'absolute', bottom: '-1rem', right: '-1rem', background: BONE, padding: '0.75rem 1.25rem' }}>
              <p style={{ fontFamily: RALEWAY, fontWeight: 300, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: FOREST, margin: 0 }}>Founder & CEO</p>
            </div>
          </div>

          {/* Bio */}
          <div style={{ paddingTop: '1rem' }}>
            <span style={{ fontFamily: RALEWAY, fontWeight: 300, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: `rgba(244,241,234,0.45)`, display: 'block', marginBottom: '1.5rem' }}>
              Meet the Founder
            </span>
            <h2 style={{ fontFamily: GARAMOND, fontSize: 'clamp(2rem, 3.5vw, 3rem)', lineHeight: 1.1, marginBottom: '2.5rem', color: BONE, fontWeight: 400 }}>
              Xaviera Gitau<br /><em>McCleskey</em>
            </h2>
            <div style={{ fontFamily: GARAMOND, fontSize: '1rem', lineHeight: 1.9, color: `rgba(244,241,234,0.7)` }}>
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
                Right now, I'm also developing TAJI — our original formula designed from the ground up for women who have been underserved. Built on real science, shaped by your feedback, and made to fill the gaps nothing else does.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href="https://wa.me/254705016590?text=Hi%20Xaviera!%20I%20saw%20your%20story%20on%20the%20Kijivu%20website%20and%20I'd%20love%20to%20learn%20more."
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  fontFamily: RALEWAY, fontWeight: 300, fontSize: '0.75rem',
                  textTransform: 'uppercase', letterSpacing: '0.1em',
                  padding: '0.8rem 1.75rem', textDecoration: 'none',
                  background: BONE, color: FOREST,
                  border: `0.5px solid ${BONE}`,
                }}
              >
                <MessageCircle style={{ width: 14, height: 14 }} /> Chat with Xaviera
              </a>
              <a
                href="/shop"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  fontFamily: RALEWAY, fontWeight: 300, fontSize: '0.75rem',
                  textTransform: 'uppercase', letterSpacing: '0.1em',
                  padding: '0.8rem 1.75rem', textDecoration: 'none',
                  background: 'transparent', color: `rgba(244,241,234,0.6)`,
                  border: `0.5px solid rgba(244,241,234,0.2)`,
                }}
              >
                Shop Now <ArrowRight style={{ width: 13, height: 13 }} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section style={{ background: BONE, padding: '7rem 4rem' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <span style={{ fontFamily: RALEWAY, fontWeight: 300, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: OLIVE, display: 'block', marginBottom: '1.5rem', textAlign: 'center' }}>
            Our Mission
          </span>
          <h2 style={{ fontFamily: GARAMOND, fontSize: 'clamp(1.8rem, 4vw, 3rem)', lineHeight: 1.2, marginBottom: '4rem', color: FOREST, textAlign: 'center', fontWeight: 400 }}>
            No woman left behind.<br /><em>No body left guessing.</em>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: `rgba(26,31,28,0.08)` }}>
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
                body: 'We are developing TAJI from scratch — designed around the nutritional gaps mainstream brands have ignored for decades.',
              },
            ].map(({ title, body }) => (
              <div key={title} style={{ padding: '2.5rem 2rem', background: BONE, borderTop: `1.5px solid ${GREEN}` }}>
                <h3 style={{ fontFamily: RALEWAY, fontWeight: 300, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: FOREST, marginBottom: '1rem' }}>{title}</h3>
                <p style={{ fontFamily: GARAMOND, fontSize: '0.95rem', color: OLIVE, lineHeight: 1.75 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scripture */}
      <section style={{ background: FOREST, padding: '7rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ width: 32, height: 0.5, background: `rgba(244,241,234,0.2)`, margin: '0 auto 3rem' }} />
          <blockquote style={{ fontFamily: GARAMOND, fontSize: 'clamp(1.4rem, 3vw, 2.4rem)', lineHeight: 1.45, color: `rgba(244,241,234,0.85)`, fontStyle: 'italic', marginBottom: '1.5rem' }}>
            "Work willingly at whatever you do, as though you were working for the Lord."
          </blockquote>
          <p style={{ fontFamily: RALEWAY, fontWeight: 300, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.16em', color: DUST }}>
            Colossians 3:23
          </p>
          <div style={{ width: 32, height: 0.5, background: `rgba(244,241,234,0.2)`, margin: '3rem auto 0' }} />
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: BONE, padding: '5rem 4rem', textAlign: 'center', borderTop: `0.5px solid rgba(26,31,28,0.08)` }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <span style={{ fontFamily: RALEWAY, fontWeight: 300, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: OLIVE, display: 'block', marginBottom: '1.25rem' }}>
            Get Started
          </span>
          <h2 style={{ fontFamily: GARAMOND, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: FOREST, marginBottom: '1rem', lineHeight: 1.2, fontWeight: 400 }}>
            Ready to start your<br /><em>wellness journey?</em>
          </h2>
          <p style={{ fontFamily: GARAMOND, fontSize: '1rem', color: OLIVE, marginBottom: '2.5rem', lineHeight: 1.7 }}>
            Browse our range or message us directly on WhatsApp. We're a real team and we're here to help.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/shop"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontFamily: RALEWAY, fontWeight: 300, fontSize: '0.75rem',
                textTransform: 'uppercase', letterSpacing: '0.1em',
                padding: '0.8rem 1.75rem', textDecoration: 'none',
                background: FOREST, color: BONE,
                border: `0.5px solid ${FOREST}`,
              }}
            >
              Shop Now <ArrowRight style={{ width: 13, height: 13 }} />
            </a>
            <a href="https://wa.me/254705016590" target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontFamily: RALEWAY, fontWeight: 300, fontSize: '0.75rem',
                textTransform: 'uppercase', letterSpacing: '0.1em',
                padding: '0.8rem 1.75rem', textDecoration: 'none',
                background: 'transparent', color: FOREST,
                border: `0.5px solid rgba(26,31,28,0.3)`,
              }}
            >
              <MessageCircle style={{ width: 13, height: 13 }} /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: FOREST, color: `rgba(244,241,234,0.45)`, padding: '3rem 4rem', borderTop: `0.5px solid rgba(244,241,234,0.06)`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <img src="/Kijivu Logo Design.png" alt="Kijivu" style={{ height: '38px', width: 'auto' }} />
        <p style={{ fontFamily: RALEWAY, fontWeight: 300, fontSize: '0.72rem', letterSpacing: '0.04em' }}>© 2026 Kijivu. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <a href="/shop" style={{ textDecoration: 'none', color: `rgba(244,241,234,0.45)`, fontFamily: RALEWAY, fontWeight: 300, fontSize: '0.75rem' }}>Shop</a>
          <a href="https://wa.me/254705016590" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: `rgba(244,241,234,0.45)`, fontFamily: RALEWAY, fontWeight: 300, fontSize: '0.75rem' }}>WhatsApp</a>
          <a href="/privacy" style={{ textDecoration: 'none', color: `rgba(244,241,234,0.45)`, fontFamily: RALEWAY, fontWeight: 300, fontSize: '0.75rem' }}>Privacy</a>
        </div>
      </footer>

    </div>
  );
}
