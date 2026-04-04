import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { supabase } from '../lib/supabase';

const SHOPIFY_URL = 'https://4ykyr0-mp.myshopify.com/';

// ── Brand tokens ──────────────────────────────────────────────────────────────
const GREEN      = '#2E9E60';
const FOREST     = '#1A5C3A';
const BADGE_BG   = '#E1F5EE';
const PAGE_BG    = '#FDFBF7';
const CARD_BG    = '#F8F4EE';
const BODY_TEXT  = '#1C1C1A';
const MUTED      = '#5C5C58';
const MINT       = '#9FE1CB';

// ── MRO products (kept exactly as before) ────────────────────────────────────
const MRO_PRODUCTS = [
  { id: 1, name: 'MaryRuth Peach Mango Liquid Hair Supplement', price: 7499, image: '/IMG_5502 (1).JPG', badge: 'Best Seller', category: 'Hair Growth' },
  { id: 2, name: 'MaryRuth Dragon Fruit Liquid Hair Supplement', price: 7499, image: '/IMG_5505.JPG',     category: 'Hair Growth' },
  { id: 3, name: 'Kids Immunity Gummies',                        price: 4000, image: '/IMG_4899.JPG',     category: 'Kids Health' },
  { id: 4, name: 'Prenatal & Postnatal Gummies',                 price: 5500, image: '/IMG_4905.JPG',     category: 'Maternal Health' },
  { id: 5, name: 'MaryRuth Daily Liquid Hair Support 500mg',     price: 7000, image: '/Hair Formula PICTURE.jpeg', category: 'Hair Growth' },
];

export default function HomePage({ cart = [], onAddToCart }) {
  const [hoveredProduct, setHovered] = useState(null);
  const [emailValue, setEmailValue]   = useState('');
  const [emailSent, setEmailSent]     = useState(false);
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!emailValue) return;
    await supabase.from('leads').insert({ email: emailValue, source: 'homepage_email_capture' });
    setEmailSent(true);
  };

  const scrollToMRO = (e) => {
    e.preventDefault();
    document.getElementById('mro-products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', background: PAGE_BG, color: BODY_TEXT, overflowX: 'hidden' }}>

      {/* ── NAV ── */}
      <nav style={{
        position: 'fixed', top: 40, width: '100%', zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1rem 2rem',
        background: 'rgba(253,251,247,0.95)', backdropFilter: 'blur(10px)',
        borderBottom: `1px solid rgba(28,28,26,0.08)`,
        boxSizing: 'border-box',
      }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <img src="/Kijivu Logo Design.png" alt="Kijivu" style={{ height: 40, width: 'auto' }} />
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <a href="/about" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: 13, color: MUTED, textDecoration: 'none', letterSpacing: '0.04em' }}>About</a>
          <a href="/shop"  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: 13, color: MUTED, textDecoration: 'none', letterSpacing: '0.04em' }}>Shop</a>
          <button
            onClick={() => navigate('/checkout')}
            style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', color: BODY_TEXT, padding: '2px' }}
          >
            <ShoppingCart style={{ width: 20, height: 20 }} />
            {cart.length > 0 && (
              <span style={{
                position: 'absolute', top: -5, right: -5,
                background: GREEN, color: '#fff',
                fontSize: 10, width: 16, height: 16, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Montserrat', sans-serif", fontWeight: 500,
              }}>
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* ── SECTION 2: HERO ── */}
      <section style={{
        minHeight: '100vh', background: PAGE_BG,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '8rem 1.5rem 4rem',
        paddingTop: 'calc(40px + 60px + 4rem)',
      }}>
        <a href="/" style={{ display: 'inline-block', marginBottom: '2rem' }}>
          <img src="/Kijivu Logo Design.png" alt="Kijivu" style={{ height: 72, width: 'auto' }} />
        </a>
        <p style={{
          fontFamily: "'EB Garamond', serif", fontStyle: 'italic',
          fontSize: 20, color: MUTED, marginBottom: '2.5rem',
          lineHeight: 1.5,
        }}>
          Wellness rooted in science. Built for African women.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a
            href={SHOPIFY_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: 14,
              background: FOREST, color: '#ffffff',
              borderRadius: 8, padding: '13px 24px',
              textDecoration: 'none', letterSpacing: '0.02em',
            }}
          >
            Reserve TAJI, $36
          </a>
          <a
            href="#mro-products"
            onClick={scrollToMRO}
            style={{
              fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: 14,
              background: 'transparent', color: BODY_TEXT,
              border: `1px solid ${BODY_TEXT}`,
              borderRadius: 8, padding: '13px 24px',
              textDecoration: 'none', letterSpacing: '0.02em',
            }}
          >
            Shop MaryRuth
          </a>
        </div>
      </section>

      {/* ── SECTION 3: TAJI FEATURE ── */}
      <section style={{ background: PAGE_BG, padding: '5rem 2rem' }}>
        <div style={{
          maxWidth: 1040, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '4rem', alignItems: 'center',
        }}
          className="taji-feature-grid"
        >
          {/* Left: bottle image or placeholder */}
          <div style={{
            background: FOREST, borderRadius: 12,
            minHeight: 480, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}>
            {/* Replace src with actual bottle image when available */}
            <img
              src="/taji-hero-editorial.png"
              alt="TAJI by Kijivu"
              onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex'; }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12 }}
            />
            <div style={{
              display: 'none', width: '100%', height: '100%', minHeight: 480,
              alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: 8,
            }}>
              <span style={{
                fontFamily: "'Cinzel', serif", fontWeight: 500,
                fontSize: 48, color: MINT, letterSpacing: '0.12em',
              }}>
                TAJI
              </span>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: 11, color: 'rgba(159,225,203,0.6)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                by Kijivu
              </span>
            </div>
          </div>

          {/* Right: copy */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <span style={{
              fontFamily: "'Montserrat', sans-serif", fontWeight: 500,
              fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
              color: GREEN,
            }}>
              Our hero product, presale now open
            </span>

            <h2 style={{
              fontFamily: "'Cinzel', serif", fontWeight: 500,
              fontSize: 28, color: FOREST, lineHeight: 1.25, margin: 0,
            }}>
              TAJI by Kijivu
            </h2>

            <p style={{
              fontFamily: "'EB Garamond', serif", fontStyle: 'italic',
              fontSize: 18, color: MUTED, margin: 0,
            }}>
              Hair, approached at the root.
            </p>

            <p style={{
              fontFamily: "'EB Garamond', serif", fontSize: 16,
              color: MUTED, lineHeight: 1.8, margin: 0,
            }}>
              For women who've tried everything and still aren't getting answers.
              TAJI was built around the biology most supplements overlook.
              Rooted in the science of African women's wellness, formulated for
              anyone dealing with the same root causes.
            </p>

            {/* Feature tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['Lustriva, hero ingredient', 'Iron absorption system', 'Stress shedding formula'].map(tag => (
                <span key={tag} style={{
                  fontFamily: "'Montserrat', sans-serif", fontWeight: 500,
                  fontSize: 11, background: BADGE_BG, color: FOREST,
                  padding: '4px 10px', borderRadius: 4,
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{
                fontFamily: "'Montserrat', sans-serif", fontSize: 14,
                color: MUTED, textDecoration: 'line-through',
              }}>
                $40
              </span>
              <span style={{ fontFamily: "'EB Garamond', serif", fontSize: 24, color: FOREST }}>
                $36 presale
              </span>
            </div>

            {/* CTA */}
            <a
              href={SHOPIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block', width: '100%', maxWidth: 280,
                textAlign: 'center',
                fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: 15,
                background: GREEN, color: '#ffffff',
                borderRadius: 8, padding: 14,
                textDecoration: 'none',
              }}
            >
              Reserve my bottle, $36
            </a>

            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: MUTED, margin: 0 }}>
              Full refund before shipping, ships August 2026.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: BRAND STATEMENT ── */}
      <section style={{ padding: '4rem 1.5rem', background: PAGE_BG }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <p style={{
            fontFamily: "'EB Garamond', serif", fontSize: 18,
            lineHeight: 1.85, color: MUTED, marginBottom: '1.5rem',
          }}>
            Kijivu is a US-based wellness brand building clinically formulated
            supplements for women of African descent, starting with East Africa
            and the African diaspora.
          </p>
          <p style={{
            fontFamily: "'EB Garamond', serif", fontSize: 18,
            lineHeight: 1.85, color: MUTED, margin: 0,
          }}>
            TAJI was formulated around the nutritional gaps the wellness industry
            has consistently overlooked. If iron deficiency, chronic stress, or
            hormonal gaps are your root cause, the science works for you
            regardless of your background.
          </p>
        </div>
      </section>

      {/* ── SECTION 5: MRO PRODUCTS ── */}
      <div style={{ borderTop: `0.5px solid rgba(28,28,26,0.12)` }} />
      <section id="mro-products" style={{ padding: '4rem 2rem 5rem', background: PAGE_BG }}>
        <div style={{ maxWidth: 1040, margin: '0 auto' }}>
          <p style={{
            fontFamily: "'Montserrat', sans-serif", fontWeight: 300,
            fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
            color: MUTED, marginBottom: '2rem',
          }}>
            Also available
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '1.5rem',
          }}>
            {MRO_PRODUCTS.map(product => (
              <div
                key={product.id}
                onMouseEnter={() => setHovered(product.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: hoveredProduct === product.id ? CARD_BG : '#fff',
                  border: `1px solid rgba(28,28,26,0.08)`,
                  borderRadius: 8, overflow: 'hidden',
                  display: 'flex', flexDirection: 'column',
                  transition: 'background 0.2s',
                }}
              >
                <div style={{ aspectRatio: '3/4', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s', transform: hoveredProduct === product.id ? 'scale(1.04)' : 'scale(1)' }}
                  />
                  {product.badge && (
                    <span style={{
                      position: 'absolute', top: 10, left: 10,
                      background: BADGE_BG, color: FOREST,
                      fontFamily: "'Montserrat', sans-serif", fontWeight: 500,
                      fontSize: 10, padding: '3px 8px', borderRadius: 3,
                      letterSpacing: '0.04em',
                    }}>
                      {product.badge}
                    </span>
                  )}
                </div>
                <div style={{ padding: '1rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <span style={{
                    fontFamily: "'Montserrat', sans-serif", fontWeight: 300,
                    fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em',
                    color: GREEN, marginBottom: 6, display: 'block',
                  }}>
                    {product.category}
                  </span>
                  <h3 style={{
                    fontFamily: "'EB Garamond', serif", fontSize: 15,
                    lineHeight: 1.3, color: BODY_TEXT, flexGrow: 1, marginBottom: '1rem',
                  }}>
                    {product.name}
                  </h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px dotted rgba(28,28,26,0.12)`, paddingTop: '0.75rem' }}>
                    <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: 13, color: BODY_TEXT }}>
                      <span style={{ fontSize: 10 }}>KES </span>{product.price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => onAddToCart(product)}
                      style={{
                        fontFamily: "'Montserrat', sans-serif", fontWeight: 500,
                        fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em',
                        padding: '6px 12px', cursor: 'pointer',
                        background: hoveredProduct === product.id ? FOREST : 'transparent',
                        color: hoveredProduct === product.id ? '#fff' : BODY_TEXT,
                        border: `1px solid ${hoveredProduct === product.id ? FOREST : 'rgba(28,28,26,0.2)'}`,
                        borderRadius: 4,
                        transition: 'all 0.2s',
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: EMAIL CAPTURE ── */}
      <section style={{ background: CARD_BG, padding: '3rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 480, margin: '0 auto' }}>
          {!emailSent ? (
            <>
              <p style={{
                fontFamily: "'EB Garamond', serif", fontStyle: 'italic',
                fontSize: 18, color: BODY_TEXT, marginBottom: '1.5rem',
              }}>
                Stay close to what we are building.
              </p>
              <form
                onSubmit={handleEmailSubmit}
                style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}
              >
                <input
                  type="email"
                  required
                  value={emailValue}
                  onChange={e => setEmailValue(e.target.value)}
                  placeholder="Your email address"
                  style={{
                    flex: '1 1 220px', padding: '12px 16px',
                    fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: 14,
                    border: `1px solid rgba(28,28,26,0.18)`, borderRadius: 6,
                    color: BODY_TEXT, background: '#fff', outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: 14,
                    background: FOREST, color: '#fff',
                    border: 'none', borderRadius: 6, padding: '12px 22px',
                    cursor: 'pointer',
                  }}
                >
                  Join us
                </button>
              </form>
            </>
          ) : (
            <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: 18, color: FOREST }}>
              You're in. We'll be in touch.
            </p>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        background: FOREST, color: MINT,
        padding: '2.5rem 2rem', textAlign: 'center',
      }}>
        <div style={{ maxWidth: 640, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          <img src="/Kijivu Logo Design.png" alt="Kijivu" style={{ height: 40, opacity: 0.9 }} />
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: 12, color: 'rgba(159,225,203,0.7)', letterSpacing: '0.06em' }}>
            Wellness rooted in science. Built for African women.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { label: 'About',   href: '/about' },
              { label: 'Shop',    href: '/shop' },
              { label: 'Privacy', href: '/privacy' },
              { label: 'Instagram', href: 'https://www.instagram.com/kijivu_/' },
              { label: 'TikTok',    href: 'https://www.tiktok.com/@kijivu_' },
              { label: 'WhatsApp',  href: 'https://wa.me/254705016590' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                style={{
                  fontFamily: "'Montserrat', sans-serif", fontWeight: 300,
                  fontSize: 12, color: 'rgba(159,225,203,0.55)',
                  textDecoration: 'none', letterSpacing: '0.04em',
                }}
              >
                {label}
              </a>
            ))}
          </div>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: 11, color: 'rgba(159,225,203,0.3)', marginTop: '0.5rem' }}>
            © 2026 Kijivu. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
