const INK    = '#2C3539';
const SAGE   = '#87A96B';
const CANVAS = '#E8E6E1';
const CREAM  = '#FDFBF7';

const Section = ({ title, children }) => (
  <div style={{ marginBottom: '3rem' }}>
    <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: INK, marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: `2px solid ${SAGE}` }}>
      {title}
    </h2>
    <div style={{ fontSize: '0.92rem', lineHeight: 1.85, color: `rgba(44,53,57,0.8)` }}>
      {children}
    </div>
  </div>
);

export default function PrivacyPolicyPage() {
  return (
    <div style={{ minHeight: '100vh', background: CREAM, fontFamily: "'Inter', sans-serif", color: INK }}>

      <nav style={{ padding: '1.25rem 3rem', borderBottom: `1px solid rgba(44,53,57,0.1)`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <img src="/Kijivu Logo Design.png" alt="Kijivu" style={{ height: '40px', width: 'auto' }} />
        </a>
        <a href="/" style={{ fontSize: '0.82rem', color: `rgba(44,53,57,0.5)`, textDecoration: 'none' }}>← Back to Home</a>
      </nav>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '5rem 2rem' }}>

        <div style={{ marginBottom: '4rem' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: SAGE, marginBottom: '1rem' }}>Legal</p>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '3rem', lineHeight: 1.15, marginBottom: '1rem' }}>Privacy Policy</h1>
          <p style={{ fontSize: '0.85rem', color: `rgba(44,53,57,0.5)` }}>Last updated: March 2026</p>
        </div>

        <Section title="Who We Are">
          <p>Kijivu is a wellness brand based in Kenya, selling premium health and hair supplements online at <strong>kijivuafrica.co.ke</strong>. When you interact with our website, place an order, or engage with our ads, you trust us with your personal information. We take that seriously.</p>
          <p style={{ marginTop: '1rem' }}>For any privacy questions, contact us on WhatsApp: <a href="https://wa.me/254705016590" style={{ color: SAGE }}>+254 705 016 590</a></p>
        </Section>

        <Section title="What Data We Collect">
          <p><strong>When you place an order:</strong></p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
            <li>Full name</li>
            <li>Phone number</li>
            <li>Email address (optional)</li>
            <li>Delivery address</li>
            <li>M-Pesa transaction reference (if provided)</li>
            <li>Order details (products, quantities, amounts)</li>
          </ul>
          <p><strong>Automatically via our website:</strong></p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
            <li>Pages you visit and actions you take (via Meta Pixel and Google Analytics)</li>
            <li>Browser and device type</li>
            <li>IP address and approximate location</li>
            <li>Facebook Click ID (<code>_fbc</code>) and Facebook Browser ID (<code>_fbp</code>) cookies — set when you arrive from a Facebook or Instagram ad</li>
          </ul>
        </Section>

        <Section title="How We Use Your Data">
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.6rem' }}><strong>Order fulfilment</strong> — to process your order, arrange delivery, and communicate with you via WhatsApp</li>
            <li style={{ marginBottom: '0.6rem' }}><strong>Customer support</strong> — to respond to enquiries and resolve issues</li>
            <li style={{ marginBottom: '0.6rem' }}><strong>Marketing optimisation</strong> — anonymised and hashed data (name, phone, email) is shared with Meta to help us show relevant ads to people like you on Facebook and Instagram</li>
            <li style={{ marginBottom: '0.6rem' }}><strong>Analytics</strong> — Google Analytics helps us understand how visitors use our site so we can improve it</li>
          </ul>
        </Section>

        <Section title="Meta Pixel & Conversions API">
          <p>Our website uses the <strong>Meta Pixel</strong> (a small piece of code) and <strong>Meta Conversions API</strong> (a server-side integration) to track actions such as page views, adding items to cart, and purchases.</p>
          <p style={{ marginTop: '1rem' }}>This data is sent to Meta (Facebook/Instagram) to measure the effectiveness of our advertising. Before sending, personal data such as your name, phone number, and email are <strong>hashed (encrypted)</strong> using SHA-256 — meaning Meta receives a scrambled version that cannot be reversed to identify you directly.</p>
          <p style={{ marginTop: '1rem' }}>You can opt out of Meta's use of your data for ads via <a href="https://www.facebook.com/ads/preferences" target="_blank" rel="noopener noreferrer" style={{ color: SAGE }}>Facebook Ad Preferences</a>.</p>
        </Section>

        <Section title="Data Storage & Security">
          <p>Your order data is stored securely in <strong>Supabase</strong>, a cloud database with row-level security and encrypted connections. We do not store your M-Pesa PIN or any payment credentials.</p>
          <p style={{ marginTop: '1rem' }}>We do not sell, rent, or trade your personal information to any third parties.</p>
        </Section>

        <Section title="Third Parties We Share Data With">
          <div style={{ background: CANVAS, padding: '1.5rem', borderLeft: `3px solid ${SAGE}` }}>
            {[
              { name: 'Meta (Facebook/Instagram)', purpose: 'Ad measurement and optimisation', link: 'https://www.facebook.com/privacy/policy/' },
              { name: 'Google Analytics', purpose: 'Website traffic analysis', link: 'https://policies.google.com/privacy' },
              { name: 'Supabase', purpose: 'Secure order data storage', link: 'https://supabase.com/privacy' },
              { name: 'WhatsApp (Meta)', purpose: 'Order communication and customer support', link: 'https://www.whatsapp.com/legal/privacy-policy' },
            ].map(({ name, purpose, link }) => (
              <div key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: `1px solid rgba(44,53,57,0.08)` }}>
                <div>
                  <p style={{ fontWeight: 600, marginBottom: '0.2rem' }}>{name}</p>
                  <p style={{ fontSize: '0.82rem', opacity: 0.65 }}>{purpose}</p>
                </div>
                <a href={link} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', color: SAGE, whiteSpace: 'nowrap', marginLeft: '1rem' }}>Privacy policy →</a>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Cookies">
          <p>We use the following cookies on our website:</p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>_fbp</strong> — set by Meta Pixel to identify your browser for ad measurement</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>_fbc</strong> — set when you click a Facebook/Instagram ad, to attribute your visit</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Google Analytics cookies</strong> — to track site usage anonymously</li>
          </ul>
          <p style={{ marginTop: '1rem' }}>You can disable cookies in your browser settings at any time, though some site features may not work correctly.</p>
        </Section>

        <Section title="Your Rights">
          <p>You have the right to:</p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Request a copy of the personal data we hold about you</li>
            <li style={{ marginBottom: '0.5rem' }}>Ask us to correct or delete your data</li>
            <li style={{ marginBottom: '0.5rem' }}>Opt out of marketing communications</li>
          </ul>
          <p style={{ marginTop: '1rem' }}>To exercise any of these rights, contact us on WhatsApp: <a href="https://wa.me/254705016590" style={{ color: SAGE }}>+254 705 016 590</a></p>
        </Section>

        <Section title="Changes to This Policy">
          <p>We may update this policy from time to time. The date at the top of this page will reflect the most recent revision. Continued use of our website after changes constitutes acceptance of the updated policy.</p>
        </Section>

        <div style={{ marginTop: '4rem', padding: '2rem', background: CANVAS, textAlign: 'center' }}>
          <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: '1.2rem', marginBottom: '0.75rem' }}>Questions about your privacy?</p>
          <a href="https://wa.me/254705016590" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '0.85rem 2rem', fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.06em', textDecoration: 'none', background: SAGE, color: 'white' }}>
            Chat with us on WhatsApp
          </a>
        </div>

      </div>
    </div>
  );
}
