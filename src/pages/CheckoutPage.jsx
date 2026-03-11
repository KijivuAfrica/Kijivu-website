import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { ArrowRight, ShoppingBag, CheckCircle } from 'lucide-react';

const INK    = '#2C3539';
const SAGE   = '#87A96B';
const CANVAS = '#E8E6E1';
const CREAM  = '#FDFBF7';
const BLUSH  = '#F4C7C3';

const DELIVERY_FEE = 350; // KES

const Field = ({ label, type = 'text', value, onChange, placeholder, required = true, options }) => (
  <div style={{ marginBottom: '1.5rem' }}>
    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: `rgba(44,53,57,0.6)`, marginBottom: '0.5rem' }}>
      {label}{required && <span style={{ color: SAGE }}> *</span>}
    </label>
    {options ? (
      <select value={value} onChange={e => onChange(e.target.value)}
        style={{ width: '100%', padding: '0.85rem 1rem', border: `1.5px solid rgba(44,53,57,0.2)`, background: CREAM, color: INK, fontSize: '0.95rem', fontFamily: 'inherit', outline: 'none' }}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    ) : (
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder} required={required}
        style={{ width: '100%', padding: '0.85rem 1rem', border: `1.5px solid rgba(44,53,57,0.2)`, background: CREAM, color: INK, fontSize: '0.95rem', fontFamily: 'inherit', outline: 'none' }}
      />
    )}
  </div>
);

export default function CheckoutPage({ cart = [], onClearCart }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', city: '', country: 'Kenya', notes: '',
  });
  const [status, setStatus]  = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMsg, setError] = useState('');

  const set = (field) => (val) => setForm(f => ({ ...f, [field]: val }));

  const subtotal = cart.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);
  const total    = subtotal + DELIVERY_FEE;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setError('');

    const orderItems = cart.map(item => ({
      product_id: item.id,
      name:       item.name,
      price:      item.price,
      quantity:   item.qty || 1,
    }));

    const { error } = await supabase.from('orders').insert({
      customer_name:    form.name,
      customer_email:   form.email,
      customer_phone:   form.phone,
      delivery_address: form.address,
      delivery_city:    form.city,
      delivery_country: form.country,
      notes:            form.notes,
      items:            orderItems,
      subtotal,
      delivery_fee:     DELIVERY_FEE,
      total_amount:     total,
      payment_status:   'pending',
    });

    if (error) {
      setStatus('error');
      setError('Something went wrong saving your order. Please try WhatsApp instead.');
      return;
    }

    // TODO: once Pesapal is set up, replace the success screen with a redirect:
    // const { data } = await supabase.functions.invoke('create-pesapal-order', {
    //   body: { amount: total, currency: 'KES', phone: form.phone, email: form.email, name: form.name }
    // });
    // window.location.href = data.redirect_url;

    setStatus('success');
    if (onClearCart) onClearCart();
  };

  if (status === 'success') {
    return (
      <div style={{ minHeight: '100vh', background: CREAM, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ textAlign: 'center', maxWidth: 480 }}>
          <CheckCircle style={{ width: 64, height: 64, color: SAGE, margin: '0 auto 2rem' }} />
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '2.5rem', marginBottom: '1rem', color: INK }}>Order Received!</h2>
          <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: '1.25rem', color: `rgba(44,53,57,0.75)`, marginBottom: '2rem', lineHeight: 1.5 }}>
            Thank you for your order. We'll contact you on WhatsApp within 24 hours to confirm payment and delivery details.
          </p>
          <a href="https://wa.me/254705016590" target="_blank" rel="noopener noreferrer"
             style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '0.9rem 2rem', fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.06em', textDecoration: 'none', background: SAGE, color: 'white', border: `2px solid ${SAGE}`, boxShadow: `4px 4px 0 ${INK}` }}>
            Message Us on WhatsApp <ArrowRight style={{ width: 15, height: 15 }} />
          </a>
          <div style={{ marginTop: '1.5rem' }}>
            <a href="/" style={{ fontSize: '0.85rem', color: SAGE, textDecoration: 'none' }}>← Back to shop</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: CREAM, fontFamily: "'Inter', sans-serif", color: INK }}>

      {/* Nav */}
      <nav style={{ padding: '1.25rem 3rem', borderBottom: `1px solid rgba(44,53,57,0.1)`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.5rem', textDecoration: 'none', color: INK }}>KIJIVU</a>
        <span style={{ fontSize: '0.8rem', color: `rgba(44,53,57,0.5)`, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Checkout</span>
      </nav>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '4rem 2rem', display: 'grid', gridTemplateColumns: '1fr 400px', gap: '4rem', alignItems: 'start' }}>

        {/* Left — form */}
        <form onSubmit={handleSubmit}>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '2.5rem', marginBottom: '2.5rem' }}>Your Details</h1>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1.5rem' }}>
            <Field label="Full Name"     value={form.name}  onChange={set('name')}  placeholder="Jane Wanjiru" />
            <Field label="Phone Number"  type="tel" value={form.phone} onChange={set('phone')} placeholder="+254 7XX XXX XXX" />
          </div>
          <Field label="Email Address" type="email" value={form.email} onChange={set('email')} placeholder="jane@example.com" />

          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '1.75rem', margin: '2rem 0 1.5rem' }}>Delivery Address</h2>

          <Field label="Street Address" value={form.address} onChange={set('address')} placeholder="123 Ngong Road, Karen" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1.5rem' }}>
            <Field label="City / Town" value={form.city} onChange={set('city')} placeholder="Nairobi" />
            <Field label="Country" value={form.country} onChange={set('country')} options={[
              { value: 'Kenya',  label: 'Kenya' },
              { value: 'Uganda', label: 'Uganda' },
            ]} />
          </div>
          <Field label="Order Notes" value={form.notes} onChange={set('notes')} placeholder="Any special instructions…" required={false} />

          {errorMsg && (
            <div style={{ background: BLUSH, padding: '1rem 1.25rem', marginBottom: '1.5rem', fontSize: '0.9rem', color: INK }}>
              {errorMsg}
            </div>
          )}

          <button type="submit" disabled={status === 'loading' || cart.length === 0}
            style={{ width: '100%', padding: '1.1rem 2rem', fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.06em', cursor: cart.length === 0 ? 'not-allowed' : 'pointer', background: status === 'loading' ? SAGE : INK, color: 'white', border: `2px solid ${INK}`, boxShadow: `4px 4px 0 ${SAGE}`, transition: 'all 0.2s', opacity: cart.length === 0 ? 0.5 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            {status === 'loading' ? 'Placing Order…' : <>Place Order <ArrowRight style={{ width: 16, height: 16 }} /></>}
          </button>

          <p style={{ marginTop: '1rem', fontSize: '0.78rem', color: `rgba(44,53,57,0.5)`, textAlign: 'center' }}>
            We'll confirm your order and payment via WhatsApp within 24 hours.
          </p>
        </form>

        {/* Right — order summary */}
        <div style={{ position: 'sticky', top: '2rem' }}>
          <div style={{ border: `1.5px solid rgba(44,53,57,0.12)`, background: CANVAS }}>
            <div style={{ padding: '1.5rem 1.75rem', borderBottom: `1px solid rgba(44,53,57,0.1)`, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ShoppingBag style={{ width: 18, height: 18 }} />
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Order Summary ({cart.length} item{cart.length !== 1 ? 's' : ''})
              </span>
            </div>

            <div style={{ padding: '1.5rem 1.75rem' }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <p style={{ color: `rgba(44,53,57,0.5)`, fontSize: '0.9rem', marginBottom: '1rem' }}>Your cart is empty.</p>
                  <a href="/#shop" style={{ fontSize: '0.85rem', color: SAGE, textDecoration: 'none' }}>← Back to shop</a>
                </div>
              ) : (
                <>
                  {cart.map((item, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: `1px dotted rgba(44,53,57,0.12)` }}>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '0.88rem', fontWeight: 500, lineHeight: 1.3, marginBottom: '0.25rem' }}>{item.name}</p>
                        <p style={{ fontSize: '0.72rem', color: `rgba(44,53,57,0.5)` }}>Qty: {item.qty || 1}</p>
                      </div>
                      <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
                        KES {item.price.toLocaleString()}
                      </span>
                    </div>
                  ))}

                  <div style={{ paddingTop: '0.5rem' }}>
                    {[
                      { label: 'Subtotal', val: `KES ${subtotal.toLocaleString()}` },
                      { label: 'Delivery', val: `KES ${DELIVERY_FEE.toLocaleString()}` },
                    ].map(({ label, val }) => (
                      <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.85rem', color: `rgba(44,53,57,0.65)` }}>
                        <span>{label}</span><span>{val}</span>
                      </div>
                    ))}
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1rem', borderTop: `1.5px solid ${INK}`, fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.1rem' }}>
                      <span>Total</span>
                      <span>KES {total.toLocaleString()}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div style={{ marginTop: '1rem', padding: '1rem 1.25rem', background: `rgba(135,169,107,0.08)`, border: `1px solid rgba(135,169,107,0.25)`, fontSize: '0.8rem', color: `rgba(44,53,57,0.7)`, lineHeight: 1.6 }}>
            <strong style={{ color: SAGE }}>Payment</strong> — After placing your order we'll send payment instructions via WhatsApp. We accept M-Pesa, Airtel Money & card.
          </div>
        </div>

      </div>
    </div>
  );
}
