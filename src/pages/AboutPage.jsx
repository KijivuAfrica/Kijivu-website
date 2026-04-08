import { MessageCircle, ArrowRight } from 'lucide-react';

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

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', background: CREAM, color: INK }}>

      {/* ── PAGE HEADER ── */}
      <div style={{
        paddingTop: 'calc(40px + 60px)',
        background: GREEN_DARK, color: CREAM,
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '5rem 4rem 4rem' }}>
          <span className="k-label" style={{ color: 'rgba(253,251,247,0.5)', display: 'block', marginBottom: '1.25rem' }}>
            Our Story
          </span>
          <h1 style={{
            fontFamily: DISPLAY, fontWeight: 500,
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            lineHeight: 1, letterSpacing: '0.06em',
            color: CREAM, marginBottom: '1.5rem',
          }}>
            About Kijivu.
          </h1>
          <p style={{
            fontFamily: SERIF, fontStyle: 'italic', fontSize: '1.2rem',
            color: 'rgba(253,251,247,0.6)', maxWidth: 480, lineHeight: 1.65, margin: 0,
          }}>
            Built for every woman who has been underserved, overlooked, or simply forgotten by the mainstream wellness industry.
          </p>
        </div>
      </div>

      {/* ── FOUNDER SECTION ── */}
      <section style={{ background: GREEN_DARK, color: CREAM, padding: '0 4rem 7rem' }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 1.5fr',
          gap: '6rem', alignItems: 'start',
        }}>

          {/* Photo */}
          <div style={{ position: 'relative' }}>
            <img
              src="/1748563708956.jpg"
              alt="Xaviera Gitau McCleskey, Founder of Kijivu"
              style={{ width: '100%', display: 'block', filter: 'grayscale(10%)' }}
            />
            <div style={{
              position: 'absolute', bottom: '-1rem', right: '-1rem',
              background: CREAM, padding: '0.75rem 1.25rem',
            }}>
              <p style={{
                fontFamily: SANS, fontWeight: 400, fontSize: '0.65rem',
                textTransform: 'uppercase', letterSpacing: '0.12em',
                color: INK, margin: 0,
              }}>
                Founder &amp; CEO
              </p>
            </div>
          </div>

          {/* Bio */}
          <div style={{ paddingTop: '1rem' }}>
            <span className="k-label" style={{ color: 'rgba(253,251,247,0.7)', display: 'block', marginBottom: '1.5rem' }}>
              Meet the Founder
            </span>
            <h2 style={{
              fontFamily: DISPLAY, fontWeight: 500,
              fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
              color: CREAM, lineHeight: 1.1, marginBottom: '2.5rem',
            }}>
              Xaviera McCleskey
            </h2>

            <div style={{ fontFamily: SERIF, fontSize: 16, lineHeight: 1.85, color: 'rgba(253,251,247,0.92)' }}>
              <p style={{ marginBottom: '1.5rem' }}>
                Xaviera McCleskey is a Kenyan-born, Southern California-based entrepreneur with a background in communications, outreach, and supply chain across sub-Saharan Africa. She holds an MBA alongside a Master's in International Affairs from The George Washington University.
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                Kijivu, meaning gray in Swahili, was born from that intersection — the space between cultures, between science and lived experience, between what the wellness industry offers and what women of African descent actually need.
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                TAJI is our first product. A daily hair supplement formulated around the nutritional deficiency profiles most common in women of African descent — built by a founder who needed it, for a community that has been consistently overlooked.
              </p>
              <p style={{ marginBottom: '2.5rem' }}>
                TAJI ships August 2026. US and Canada customers can reserve now at the founder presale price of $36. International customers can join the waitlist below.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12 }}>
              <a
                href={SHOPIFY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="k-btn-primary"
              >
                Reserve TAJI, $36
              </a>
              <button
                onClick={() => window.showKijivuWaitlist?.()}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: SANS, fontSize: 13, color: 'rgba(253,251,247,0.5)',
                  padding: 0, textDecoration: 'underline',
                  textDecorationColor: 'rgba(253,251,247,0.2)',
                }}
              >
                Outside the US? Join the waitlist.
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section style={{ background: CREAM, padding: '7rem 4rem' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <span className="k-label" style={{ display: 'block', marginBottom: '1.5rem', textAlign: 'center' }}>
            Our Mission
          </span>
          <h2 style={{
            fontFamily: DISPLAY, fontWeight: 500,
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            lineHeight: 1.2, marginBottom: '4rem',
            color: INK, textAlign: 'center',
          }}>
            No woman left behind.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: BORDER }}>
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
                body: 'TAJI was developed from scratch, designed around the nutritional gaps mainstream brands have ignored for decades.',
              },
            ].map(({ title, body }) => (
              <div key={title} style={{
                padding: '2.5rem 2rem', background: CREAM,
                borderTop: `2px solid ${GREEN_MID}`,
              }}>
                <h3 style={{
                  fontFamily: DISPLAY, fontWeight: 500, fontSize: '1rem',
                  color: INK, marginBottom: '1rem',
                }}>
                  {title}
                </h3>
                <p style={{ fontFamily: SERIF, fontSize: 15, color: MUTED, lineHeight: 1.75, margin: 0 }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCRIPTURE ── */}
      <section style={{ background: INK, padding: '7rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ width: 28, height: 0.5, background: GREEN_MID, margin: '0 auto 3rem' }} />
          <blockquote style={{
            fontFamily: SERIF, fontStyle: 'italic',
            fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
            lineHeight: 1.45, color: 'rgba(253,251,247,0.85)',
            marginBottom: '1.5rem',
          }}>
            "Work willingly at whatever you do, as though you were working for the Lord."
          </blockquote>
          <p style={{
            fontFamily: SANS, fontWeight: 400, fontSize: '0.72rem',
            textTransform: 'uppercase', letterSpacing: '0.16em',
            color: MUTED, margin: 0,
          }}>
            Colossians 3:23
          </p>
          <div style={{ width: 28, height: 0.5, background: GREEN_MID, margin: '3rem auto 0' }} />
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        background: CREAM_CARD, padding: '5rem 4rem', textAlign: 'center',
        borderTop: `0.5px solid ${BORDER}`,
      }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <span className="k-label" style={{ display: 'block', marginBottom: '1.25rem' }}>
            Get Started
          </span>
          <h2 style={{
            fontFamily: DISPLAY, fontWeight: 500,
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            color: INK, marginBottom: '1rem', lineHeight: 1.2,
          }}>
            Ready to start your wellness journey?
          </h2>
          <p style={{
            fontFamily: SERIF, fontSize: 16, color: MUTED,
            marginBottom: '2.5rem', lineHeight: 1.85,
          }}>
            Browse our range or message us directly on WhatsApp. We are a real team and we are here to help.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/shop" className="k-btn-primary">
              Shop Now
            </a>
            <a
              href="https://wa.me/254705016590"
              target="_blank"
              rel="noopener noreferrer"
              className="k-btn-secondary"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        background: INK, color: 'rgba(253,251,247,0.45)',
        padding: '3rem 4rem',
        borderTop: `0.5px solid rgba(253,251,247,0.06)`,
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
      }}>
        <img src="/Kijivu Logo Design.png" alt="Kijivu" style={{ height: '36px', width: 'auto' }} />
        <p style={{ fontFamily: SANS, fontWeight: 300, fontSize: '0.72rem', letterSpacing: '0.04em' }}>
          &copy; 2026 Kijivu. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {[
            { label: 'Shop',      href: '/shop' },
            { label: 'WhatsApp',  href: 'https://wa.me/254705016590' },
            { label: 'Privacy',   href: '/privacy' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              style={{
                textDecoration: 'none', color: 'rgba(253,251,247,0.45)',
                fontFamily: SANS, fontWeight: 300, fontSize: '0.75rem',
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
