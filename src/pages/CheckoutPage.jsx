import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { trackMeta } from '../lib/metaPixel';
import { ArrowRight, ShoppingBag, CheckCircle, Smartphone, Clock, Info } from 'lucide-react';

const INK    = '#1C1C1A';
const SAGE   = '#2E9E60';
const CANVAS = '#F8F4EE';
const CREAM  = '#FDFBF7';
const BLUSH  = '#E1F5EE';

const Field = ({ label, type = 'text', value, onChange, placeholder, required = true, options }) => (
  <div style={{ marginBottom: '1.5rem' }}>
    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: `rgba(28,28,26,0.6)`, marginBottom: '0.5rem' }}>
      {label}{required && <span style={{ color: SAGE }}> *</span>}
    </label>
    {options ? (
      <select value={value} onChange={e => onChange(e.target.value)}
        style={{ width: '100%', padding: '0.85rem 1rem', border: `1.5px solid rgba(28,28,26,0.2)`, background: CREAM, color: INK, fontSize: '0.95rem', fontFamily: 'inherit', outline: 'none' }}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    ) : (
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder} required={required}
        style={{ width: '100%', padding: '0.85rem 1rem', border: `1.5px solid rgba(28,28,26,0.2)`, background: CREAM, color: INK, fontSize: '0.95rem', fontFamily: 'inherit', outline: 'none' }}
      />
    )}
  </div>
);

export default function CheckoutPage({ cart = [], onClearCart }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', city: '', country: 'Kenya', notes: '', mpesaRef: '',
  });
  const [payFull, setPayFull]    = useState(false);
  const [status, setStatus]      = useState('idle');
  const [errorMsg, setError]     = useState('');
  const [savedSubtotal, setSavedSubtotal] = useState(0);
  const [savedDeposit,  setSavedDeposit]  = useState(0);
  const [savedBalance,  setSavedBalance]  = useState(0);
  const [savedPayFull,  setSavedPayFull]  = useState(false);

  const set = (field) => (val) => setForm(f => ({ ...f, [field]: val }));

  const subtotal = cart.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);

  // InitiateCheckout on mount
  useEffect(() => {
    if (cart.length > 0) {
      trackMeta('InitiateCheckout', {
        content_ids: cart.map(i => String(i.id)),
        num_items: cart.reduce((s, i) => s + (i.qty || 1), 0),
        currency: 'KES',
        value: subtotal,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const deposit  = payFull ? subtotal : Math.ceil(subtotal / 2);
  const balance  = subtotal - deposit;

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
      id:               crypto.randomUUID(),
      customer_name:    form.name,
      customer_email:   form.email,
      customer_phone:   form.phone,
      delivery_address: form.address,
      delivery_city:    form.city,
      delivery_country: form.country,
      notes:            form.mpesaRef ? `${form.notes}\nM-Pesa ref: ${form.mpesaRef}`.trim() : form.notes,
      items:            orderItems,
      subtotal,
      total_amount:     subtotal,
      payment_status:   'pending_payment',
    });

    if (error) {
      setStatus('error');
      setError('Something went wrong saving your order. Please contact us on WhatsApp instead.');
      return;
    }

    setSavedSubtotal(subtotal);
    setSavedDeposit(deposit);
    setSavedBalance(balance);
    setSavedPayFull(payFull);

    // Purchase event
    trackMeta('Purchase', {
      content_ids: cart.map(i => String(i.id)),
      currency: 'KES',
      value: subtotal,
      num_items: cart.reduce((s, i) => s + (i.qty || 1), 0),
    }, {
      name: form.name,
      email: form.email,
      phone: form.phone,
    });

    if (onClearCart) onClearCart();
    setStatus('success');
  };

  // ── SUCCESS SCREEN ──
  if (status === 'success') {
    const isWeekend   = [0, 6].includes(new Date().getDay());
    const deliveryEta = isWeekend ? 'early next week' : 'tomorrow';

    const waMessage = encodeURIComponent(
      savedPayFull
        ? `Hi Kijivu! I've just placed an order and paid in full.\n\nName: ${form.name}\nPhone: ${form.phone}\n\nOrder total: KES ${savedSubtotal.toLocaleString()} (paid in full)${form.mpesaRef ? `\nM-Pesa ref: ${form.mpesaRef}` : ''}\n\nPlease confirm my order and delivery details.`
        : `Hi Kijivu! I've just placed an order.\n\nName: ${form.name}\nPhone: ${form.phone}\n\nOrder total: KES ${savedSubtotal.toLocaleString()}\n50% Deposit (due now): KES ${savedDeposit.toLocaleString()}\nBalance on delivery: KES ${savedBalance.toLocaleString()}${form.mpesaRef ? `\nM-Pesa ref: ${form.mpesaRef}` : ''}\n\nPlease confirm my order and delivery details.`
    );

    return (
      <div style={{ minHeight: '100vh', background: CREAM, fontFamily: "'Montserrat', sans-serif", color: INK }}>
        <nav style={{ padding: '1.25rem 3rem', borderBottom: `1px solid rgba(28,28,26,0.1)`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="/" style={{ textDecoration: 'none' }}><img src="/Kijivu Logo Design.png" alt="Kijivu" style={{ height: '40px', width: 'auto' }} /></a>
        </nav>

        <div style={{ maxWidth: 580, margin: '0 auto', padding: '5rem 2rem', textAlign: 'center' }}>
          <CheckCircle style={{ width: 64, height: 64, color: SAGE, margin: '0 auto 2rem' }} />
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: '2.5rem', marginBottom: '0.75rem', color: INK }}>Order Placed!</h2>
          <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '1.2rem', color: `rgba(28,28,26,0.7)`, marginBottom: '2.5rem', lineHeight: 1.5 }}>
            {savedPayFull
              ? 'Pay the full amount via M-Pesa, then send us your confirmation on WhatsApp.'
              : 'Pay your 50% deposit via M-Pesa to confirm, then send us your confirmation on WhatsApp.'}
          </p>

          {/* Breakdown */}
          {savedPayFull ? (
            <div style={{ background: INK, color: CREAM, padding: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
              <p style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.5, marginBottom: '0.5rem' }}>Pay in Full</p>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: '1.5rem', color: SAGE }}>KES {savedSubtotal.toLocaleString()}</p>
              <p style={{ fontSize: '0.75rem', opacity: 0.5, marginTop: '0.35rem' }}>No balance due on delivery</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1px', background: `rgba(28,28,26,0.12)`, marginBottom: '1.5rem' }}>
              {[
                { label: 'Order Total',  val: `KES ${savedSubtotal.toLocaleString()}`, sub: 'products only' },
                { label: 'Pay Now',      val: `KES ${savedDeposit.toLocaleString()}`,  sub: '50% deposit', dark: true },
                { label: 'On Delivery',  val: `KES ${savedBalance.toLocaleString()}`,  sub: '50% balance' },
              ].map(({ label, val, sub, dark }) => (
                <div key={label} style={{ background: dark ? INK : CREAM, color: dark ? CREAM : INK, padding: '1.25rem 0.75rem', textAlign: 'center' }}>
                  <p style={{ fontSize: '0.58rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.55, marginBottom: '0.4rem' }}>{label}</p>
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: '1rem', marginBottom: '0.2rem' }}>{val}</p>
                  <p style={{ fontSize: '0.6rem', opacity: 0.5 }}>{sub}</p>
                </div>
              ))}
            </div>
          )}

          {/* Delivery timing */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.75rem', fontSize: '0.8rem', color: `rgba(28,28,26,0.55)`, background: CANVAS, padding: '0.75rem 1.25rem' }}>
            <Clock style={{ width: 14, height: 14, flexShrink: 0 }} />
            <span>
              Estimated delivery: <strong>{deliveryEta}</strong> once payment is confirmed.
              {!savedPayFull && ' Delivery fee paid separately to rider on arrival.'}
            </span>
          </div>

          {/* M-Pesa instructions */}
          <div style={{ background: CANVAS, border: `1.5px solid rgba(28,28,26,0.12)`, padding: '2rem', marginBottom: '2rem', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <Smartphone style={{ width: 20, height: 20, color: SAGE }} />
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Pay KES {savedDeposit.toLocaleString()} via M-Pesa
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ background: CREAM, padding: '1rem', border: `1px solid rgba(28,28,26,0.1)` }}>
                <p style={{ fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: `rgba(28,28,26,0.5)`, marginBottom: '0.4rem' }}>Option 1 — Paybill</p>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '1rem', marginBottom: '0.2rem' }}>247247</p>
                <p style={{ fontSize: '0.78rem', color: `rgba(28,28,26,0.6)` }}>Account: <strong>1990186537393</strong></p>
              </div>
              <div style={{ background: CREAM, padding: '1rem', border: `1px solid rgba(28,28,26,0.1)` }}>
                <p style={{ fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: `rgba(28,28,26,0.5)`, marginBottom: '0.4rem' }}>Option 2 — Send Money</p>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '1rem' }}>0705 016 590</p>
              </div>
            </div>
            <p style={{ fontSize: '0.78rem', color: `rgba(28,28,26,0.55)`, lineHeight: 1.6 }}>
              {savedPayFull
                ? 'After paying, tap WhatsApp below and send us your M-Pesa confirmation SMS.'
                : `After paying, tap WhatsApp below and send us your M-Pesa SMS. Balance of KES ${savedBalance.toLocaleString()} + rider's delivery fee paid on arrival.`}
            </p>
          </div>

          <a href={`https://wa.me/254705016590?text=${waMessage}`} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '1rem 2.5rem', fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '0.88rem', textTransform: 'uppercase', letterSpacing: '0.06em', textDecoration: 'none', background: SAGE, color: 'white', border: `2px solid ${SAGE}`, boxShadow: `4px 4px 0 ${INK}`, width: '100%', justifyContent: 'center', boxSizing: 'border-box' }}>
            Confirm on WhatsApp <ArrowRight style={{ width: 16, height: 16 }} />
          </a>
          <p style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: `rgba(28,28,26,0.4)` }}>
            Opens WhatsApp with your order details pre-filled.
          </p>

          <div style={{ marginTop: '2rem' }}>
            <a href="/" style={{ fontSize: '0.85rem', color: SAGE, textDecoration: 'none' }}>← Back to shop</a>
          </div>
        </div>
      </div>
    );
  }

  // ── CHECKOUT FORM ──
  return (
    <div style={{ minHeight: '100vh', background: CREAM, fontFamily: "'Montserrat', sans-serif", color: INK }}>

      <nav style={{ padding: '1.25rem 3rem', borderBottom: `1px solid rgba(28,28,26,0.1)`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ textDecoration: 'none' }}><img src="/Kijivu Logo Design.png" alt="Kijivu" style={{ height: '40px', width: 'auto' }} /></a>
        <span style={{ fontSize: '0.8rem', color: `rgba(28,28,26,0.5)`, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Checkout</span>
      </nav>

      {/* Policy banner */}
      <div style={{ background: INK, color: CREAM, padding: '0.75rem 3rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8rem' }}>
        <Info style={{ width: 15, height: 15, color: SAGE, flexShrink: 0 }} />
        <span>
          <strong>Payment:</strong> Pay 50% deposit now to confirm, balance on delivery — or pay in full upfront. Delivery fee paid separately to the rider.
        </span>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '4rem 2rem', display: 'grid', gridTemplateColumns: '1fr 400px', gap: '4rem', alignItems: 'start' }}>

        {/* Left — form */}
        <form onSubmit={handleSubmit}>
          <h1 style={{ fontFamily: "'EB Garamond', serif", fontSize: '2.5rem', marginBottom: '2.5rem' }}>Your Details</h1>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1.5rem' }}>
            <Field label="Full Name"    value={form.name}  onChange={set('name')}  placeholder="Jane Wanjiru" />
            <Field label="Phone Number" type="tel" value={form.phone} onChange={set('phone')} placeholder="+254 7XX XXX XXX" />
          </div>
          <Field label="Email Address" type="email" value={form.email} onChange={set('email')} placeholder="jane@example.com" required={false} />

          <h2 style={{ fontFamily: "'EB Garamond', serif", fontSize: '1.75rem', margin: '2rem 0 1.5rem' }}>Delivery Address</h2>

          <Field label="Street Address" value={form.address} onChange={set('address')} placeholder="123 Ngong Road, Karen" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1.5rem' }}>
            <Field label="City / Town" value={form.city} onChange={set('city')} placeholder="Nairobi" />
            <Field label="Country" value={form.country} onChange={set('country')} options={[
              { value: 'Kenya',  label: 'Kenya' },
              { value: 'Uganda', label: 'Uganda' },
            ]} />
          </div>
          <Field label="M-Pesa Reference (optional)" value={form.mpesaRef} onChange={set('mpesaRef')} placeholder="e.g. QAB3X1Y2Z3 — if you've already paid" required={false} />
          <Field label="Order Notes" value={form.notes} onChange={set('notes')} placeholder="Any special instructions…" required={false} />

          {/* Payment option toggle */}
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: `rgba(28,28,26,0.6)`, marginBottom: '0.75rem' }}>
              Payment Option
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {[
                { full: false, label: '50% Deposit', sub: `Pay KES ${subtotal > 0 ? Math.ceil(subtotal / 2).toLocaleString() : '—'} now · balance on delivery` },
                { full: true,  label: 'Pay in Full',  sub: `Pay KES ${subtotal > 0 ? subtotal.toLocaleString() : '—'} now · delivery fee paid to rider on arrival` },
              ].map(({ full, label, sub }) => (
                <button key={String(full)} type="button" onClick={() => setPayFull(full)}
                  style={{
                    padding: '1rem', textAlign: 'left', cursor: 'pointer',
                    background: payFull === full ? INK : CREAM,
                    color:      payFull === full ? CREAM : INK,
                    border:     payFull === full ? `2px solid ${INK}` : `1.5px solid rgba(28,28,26,0.2)`,
                    boxShadow:  payFull === full ? `3px 3px 0 ${SAGE}` : 'none',
                    transition: 'all 0.2s',
                  }}>
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.35rem' }}>{label}</p>
                  <p style={{ fontSize: '0.72rem', opacity: payFull === full ? 0.65 : 0.5, lineHeight: 1.4 }}>{sub}</p>
                </button>
              ))}
            </div>
          </div>

          {errorMsg && (
            <div style={{ background: BLUSH, padding: '1rem 1.25rem', marginBottom: '1.5rem', fontSize: '0.9rem', color: INK }}>
              {errorMsg}
            </div>
          )}

          <button type="submit" disabled={status === 'loading' || cart.length === 0}
            style={{ width: '100%', padding: '1.1rem 2rem', fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.06em', cursor: cart.length === 0 ? 'not-allowed' : 'pointer', background: status === 'loading' ? SAGE : INK, color: 'white', border: `2px solid ${INK}`, boxShadow: `4px 4px 0 ${SAGE}`, transition: 'all 0.2s', opacity: cart.length === 0 ? 0.5 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            {status === 'loading' ? 'Placing Order…' : <>Place Order <ArrowRight style={{ width: 16, height: 16 }} /></>}
          </button>

          <p style={{ marginTop: '1rem', fontSize: '0.78rem', color: `rgba(28,28,26,0.5)`, textAlign: 'center' }}>
            M-Pesa payment instructions shown after placing your order.
          </p>
        </form>

        {/* Right — order summary */}
        <div style={{ position: 'sticky', top: '2rem' }}>
          <div style={{ border: `1.5px solid rgba(28,28,26,0.12)`, background: CANVAS }}>
            <div style={{ padding: '1.5rem 1.75rem', borderBottom: `1px solid rgba(28,28,26,0.1)`, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ShoppingBag style={{ width: 18, height: 18 }} />
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Order Summary ({cart.length} item{cart.length !== 1 ? 's' : ''})
              </span>
            </div>

            <div style={{ padding: '1.5rem 1.75rem' }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <p style={{ color: `rgba(28,28,26,0.5)`, fontSize: '0.9rem', marginBottom: '1rem' }}>Your cart is empty.</p>
                  <a href="/shop" style={{ fontSize: '0.85rem', color: SAGE, textDecoration: 'none' }}>← Back to shop</a>
                </div>
              ) : (
                <>
                  {cart.map((item, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: `1px dotted rgba(28,28,26,0.12)` }}>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '0.88rem', fontWeight: 500, lineHeight: 1.3, marginBottom: '0.25rem' }}>{item.name}</p>
                        <p style={{ fontSize: '0.72rem', color: `rgba(28,28,26,0.5)` }}>Qty: {item.qty || 1}</p>
                      </div>
                      <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
                        KES {item.price.toLocaleString()}
                      </span>
                    </div>
                  ))}

                  <div style={{ paddingTop: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.85rem', color: `rgba(28,28,26,0.65)` }}>
                      <span>Products Total</span><span>KES {subtotal.toLocaleString()}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.78rem', color: `rgba(28,28,26,0.45)`, fontStyle: 'italic' }}>
                      <span>Delivery fee</span><span>paid to rider</span>
                    </div>

                    {/* Payment split */}
                    <div style={{ background: INK, color: CREAM, padding: '1rem', marginTop: '0.75rem' }}>
                      <p style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.5, marginBottom: '0.75rem' }}>
                        {payFull ? 'Pay in Full' : 'Payment Split'}
                      </p>
                      {payFull ? (
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                          <span style={{ opacity: 0.7 }}>Pay now (full)</span>
                          <span style={{ fontWeight: 700, color: SAGE }}>KES {subtotal.toLocaleString()}</span>
                        </div>
                      ) : (
                        <>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.82rem' }}>
                            <span style={{ opacity: 0.7 }}>50% Deposit now</span>
                            <span style={{ fontWeight: 700, color: SAGE }}>KES {deposit.toLocaleString()}</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                            <span style={{ opacity: 0.7 }}>50% Balance on delivery</span>
                            <span style={{ fontWeight: 700 }}>KES {balance.toLocaleString()}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* M-Pesa preview */}
          <div style={{ marginTop: '1rem', background: CANVAS, border: `1.5px solid rgba(28,28,26,0.12)`, padding: '1.25rem 1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Smartphone style={{ width: 16, height: 16, color: SAGE }} />
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {payFull ? 'Full Payment' : 'Deposit'} — M-Pesa
              </span>
            </div>
            <div style={{ fontSize: '0.8rem', color: `rgba(28,28,26,0.75)`, lineHeight: 1.7 }}>
              <p style={{ marginBottom: '0.5rem' }}><strong>Paybill:</strong> 247247<br /><strong>Account:</strong> 1990186537393</p>
              <p><strong>Or send to:</strong> 0705 016 590</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
