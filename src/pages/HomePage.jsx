import { useState } from 'react';
import { supabase } from '../lib/supabase';

const SHOPIFY_URL = 'https://4ykyr0-mp.myshopify.com/';

const CREAM      = '#FDFBF7';
const CREAM_CARD = '#F8F4EE';
const INK        = '#1C1C1A';
const MUTED      = '#5C5C58';
const GREEN_MID  = '#2E9E60';
const GREEN_DARK = '#1A5C3A';
const GREEN_LIGHT = '#E1F5EE';
const BORDER     = 'rgba(28,28,26,0.12)';

const DISPLAY = "'Cinzel', serif";
const SERIF   = "'EB Garamond', serif";
const SANS    = "'Montserrat', sans-serif";

export default function HomePage() {
  const [emailValue, setEmailValue] = useState('');
  const [emailSent, setEmailSent]   = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!emailValue) return;
    try {
      await supabase.from('leads').insert({ email: emailValue, source: 'homepage_email_capture' });
      window.klaviyo?.push(['identify', { $email: emailValue }]);
    } catch (_) {}
    setEmailSent(true);
  };

  const scrollToBrand = (e) => {
    e.preventDefault();
    document.getElementById('brand-statement')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', background: CREAM, color: INK, overflowX: 'hidden' }}>

      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh', background: CREAM,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
        paddingTop: 'calc(40px + 60px + 3rem)',
        paddingBottom: '4rem',
        paddingLeft: '1.5rem', paddingRight: '1.5rem',
      }}>
        {/* Eyebrow */}
        <p style={{
          fontFamily: SANS, fontWeight: 500, fontSize: 11,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: GREEN_MID, marginBottom: '0.75rem',
        }}>
          Kijivu
        </p>

        {/* TAJI wordmark */}
        <h1 style={{
          fontFamily: DISPLAY, fontWeight: 500,
          fontSize: 'clamp(32px, 5vw, 52px)',
          color: INK, letterSpacing: '0.04em',
          lineHeight: 1, margin: '0 0 0.5rem',
        }}>
          TAJI
        </h1>

        {/* Divider */}
        <div style={{ width: 40, height: 0.5, background: GREEN_MID, margin: '0.75rem auto 1.5rem' }} />

        {/* Tagline */}
        <p style={{
          fontFamily: SERIF, fontStyle: 'italic', fontSize: 20,
          color: MUTED, marginBottom: '1.25rem', lineHeight: 1.5,
        }}>
          Hair, approached at the root.
        </p>

        {/* Subheading */}
        <p style={{
          fontFamily: SERIF, fontSize: 16,
          color: MUTED, marginBottom: '2.5rem', lineHeight: 1.75,
          maxWidth: 480,
        }}>
          For the woman whose hair has been at a standstill and whose iron has been flagged low. The root cause, finally addressed.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <a
            href={SHOPIFY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="k-btn-primary"
          >
            Reserve TAJI, $36
          </a>
          <p style={{
            fontFamily: SANS, fontWeight: 300, fontSize: 11,
            color: MUTED, letterSpacing: '0.05em',
          }}>
            US and Canada orders only. Ships August 2026.
          </p>
          <button
            onClick={scrollToBrand}
            className="k-btn-secondary"
            style={{ fontSize: 13, padding: '10px 20px' }}
          >
            Learn more
          </button>
        </div>
      </section>

      {/* ── TAJI FEATURE ── */}
      <section style={{ background: GREEN_DARK, padding: '5rem 2rem' }}>
        <div
          style={{
            maxWidth: 1040, margin: '0 auto',
            display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '4rem', alignItems: 'center',
          }}
          className="taji-feature-grid"
        >
          {/* Left: image / placeholder */}
          <div style={{
            borderRadius: 12, overflow: 'hidden',
            background: GREEN_DARK,
            border: `0.5px solid rgba(255,255,255,0.1)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            aspectRatio: '1',
          }}>
            <img
              src="/ChatGPT Image Apr 3, 2026, 04_02_47 PM.png"
              alt="TAJI by Kijivu"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.9 }}
              onError={e => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextSibling.style.display = 'flex';
              }}
            />
            <div style={{
              display: 'none', alignItems: 'center', justifyContent: 'center',
              width: '100%', height: '100%', borderRadius: 12,
              background: GREEN_DARK,
            }}>
              <span style={{ fontFamily: DISPLAY, fontSize: 48, color: CREAM, letterSpacing: '0.06em' }}>
                TAJI
              </span>
            </div>
          </div>

          {/* Right: copy */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <span className="k-label" style={{ color: '#9FE1CB' }}>
              Our hero product
            </span>
            <h2 style={{
              fontFamily: DISPLAY, fontWeight: 500, fontSize: 32,
              color: CREAM, lineHeight: 1.2, margin: 0,
            }}>
              TAJI by Kijivu
            </h2>
            <p style={{
              fontFamily: SERIF, fontSize: 16, color: 'rgba(253,251,247,0.75)',
              lineHeight: 1.85, margin: 0,
            }}>
              You have done everything right on the outside. The protective styles, the satin pillowcase, the products that promised something and delivered nothing. Your hair is still at the same length it was a year ago. That is not a discipline problem. TAJI was built for what is actually going on underneath.
            </p>

            {/* Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['Lustriva', 'Iron absorption system', 'Stress shedding formula'].map(tag => (
                <span key={tag} style={{
                  fontFamily: SANS, fontWeight: 400, fontSize: 11,
                  letterSpacing: '0.06em',
                  background: GREEN_LIGHT, color: GREEN_DARK,
                  padding: '4px 10px', borderRadius: 20,
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span style={{ fontFamily: SERIF, fontSize: 28, color: CREAM, lineHeight: 1 }}>$36</span>
              <span style={{
                fontFamily: SANS, fontWeight: 300, fontSize: 14,
                color: 'rgba(253,251,247,0.4)', textDecoration: 'line-through',
              }}>$40</span>
              <span style={{ fontFamily: SANS, fontWeight: 300, fontSize: 12, color: 'rgba(253,251,247,0.5)' }}>
                30-day supply
              </span>
            </div>

            {/* CTA */}
            <div>
              <a
                href={SHOPIFY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="k-btn-primary"
              >
                Reserve my bottle, $36
              </a>
              <p style={{
                fontFamily: SANS, fontWeight: 300, fontSize: 11,
                color: 'rgba(253,251,247,0.4)', marginTop: 8,
              }}>
                US and Canada only. Ships August 2026.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── BRAND STATEMENT ── */}
      <section id="brand-statement" className="k-section" style={{ textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ width: 32, height: 0.5, background: GREEN_MID, margin: '0 auto 2.5rem' }} />
          <p style={{ fontFamily: SERIF, fontSize: 17, lineHeight: 1.9, color: MUTED, marginBottom: '1.5rem' }}>
            Kijivu is a US-based wellness brand building clinically formulated supplements for women of African descent and the global African diaspora.
          </p>
          <p style={{ fontFamily: SERIF, fontSize: 17, lineHeight: 1.9, color: MUTED, margin: 0 }}>
            We started with the gap the mainstream wellness industry has ignored for decades: the nutritional deficiency profiles most common in Black women, and the products that were never built around them. TAJI is our first answer to that. It will not be the last.
          </p>
          <div style={{ width: 32, height: 0.5, background: GREEN_MID, margin: '2.5rem auto 0' }} />
        </div>
      </section>

      {/* ── EMAIL CAPTURE ── */}
      <section style={{ background: CREAM_CARD, padding: '3rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 440, margin: '0 auto' }}>
          {!emailSent ? (
            <>
              <p style={{
                fontFamily: SERIF, fontStyle: 'italic', fontSize: 20,
                color: INK, marginBottom: '1.75rem', lineHeight: 1.5,
              }}>
                Stay close to what we are building.
              </p>
              <form onSubmit={handleEmailSubmit} style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
                <input
                  type="email"
                  required
                  value={emailValue}
                  onChange={e => setEmailValue(e.target.value)}
                  placeholder="Your email address"
                  style={{
                    flex: '1 1 200px', padding: '11px 14px',
                    fontFamily: SANS, fontWeight: 300, fontSize: 13,
                    border: `1px solid ${BORDER}`, borderRadius: 8,
                    color: INK, background: CREAM, outline: 'none',
                  }}
                />
                <button type="submit" className="k-btn-primary">
                  Join us
                </button>
              </form>
            </>
          ) : (
            <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 18, color: GREEN_MID }}>
              You are on the list. We will be in touch.
            </p>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        background: INK, color: CREAM,
        padding: '2.5rem 2rem', textAlign: 'center',
        borderTop: `0.5px solid rgba(253,251,247,0.08)`,
      }}>
        <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          <img src="/Kijivu Logo Design.png" alt="Kijivu" style={{ height: 34, opacity: 0.8 }} />
          <div style={{ width: 28, height: 0.5, background: GREEN_MID }} />
          <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 14, color: 'rgba(253,251,247,0.45)' }}>
            Hair, approached at the root.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { label: 'About',     href: '/about' },
              { label: 'Shop',      href: '/shop' },
              { label: 'Privacy',   href: '/privacy' },
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
                  fontFamily: SANS, fontWeight: 300, fontSize: 10,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: 'rgba(253,251,247,0.35)', textDecoration: 'none',
                }}
              >
                {label}
              </a>
            ))}
          </div>
          <p style={{
            fontFamily: SANS, fontWeight: 300, fontSize: 9,
            color: 'rgba(253,251,247,0.2)', letterSpacing: '0.06em',
          }}>
            &copy; 2026 Kijivu. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
