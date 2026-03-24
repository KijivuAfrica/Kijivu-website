import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';

const INK   = '#2C3539';
const SAGE  = '#87A96B';
const BLUSH = '#F4C7C3';
const CREAM = '#FDFBF7';

export default function PaymentCompletePage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('loading');

  // DPO sends TransactionToken and CompanyRef (our order_id) as URL params
  const transactionToken = searchParams.get('TransactionToken');
  const orderId          = searchParams.get('CompanyRef');

  useEffect(() => {
    if (!transactionToken || !orderId) {
      setStatus('unknown');
      return;
    }

    const timer = setTimeout(async () => {
      const { data, error } = await supabase.functions.invoke('verify-dpo-payment', {
        body: { transaction_token: transactionToken, order_id: orderId },
      });

      if (error || !data) { setStatus('pending'); return; }
      if (data.paid) setStatus('paid');
      else setStatus('failed');
    }, 2000);

    return () => clearTimeout(timer);
  }, [transactionToken, orderId]);

  const screens = {
    loading: { icon: <Clock style={{ width: 64, height: 64, color: SAGE, margin: '0 auto 2rem' }} />, title: 'Checking Payment…', msg: 'Please wait while we confirm your payment.' },
    paid:    { icon: <CheckCircle style={{ width: 64, height: 64, color: SAGE, margin: '0 auto 2rem' }} />, title: 'Payment Received!', msg: 'Thank you! Your order is confirmed and we\'ll be in touch within 24 hours.' },
    pending: { icon: <Clock style={{ width: 64, height: 64, color: SAGE, margin: '0 auto 2rem' }} />, title: 'Payment Pending', msg: 'Your payment is being processed. We\'ll confirm via WhatsApp once it clears.' },
    failed:  { icon: <XCircle style={{ width: 64, height: 64, color: BLUSH, margin: '0 auto 2rem' }} />, title: 'Payment Failed', msg: 'Something went wrong with your payment. Please try again or contact us on WhatsApp.' },
    unknown: { icon: <CheckCircle style={{ width: 64, height: 64, color: SAGE, margin: '0 auto 2rem' }} />, title: 'Order Received', msg: 'Your order has been placed. We\'ll confirm payment and delivery via WhatsApp.' },
  };

  const screen = screens[status];

  return (
    <div style={{ minHeight: '100vh', background: CREAM, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: "'Inter', sans-serif", color: INK }}>
      <div style={{ textAlign: 'center', maxWidth: 480 }}>
        {screen.icon}
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '2.5rem', marginBottom: '1rem', color: INK }}>{screen.title}</h2>
        <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: '1.2rem', color: `rgba(44,53,57,0.75)`, marginBottom: '2rem', lineHeight: 1.5 }}>
          {screen.msg}
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://wa.me/254705016590" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '0.9rem 1.75rem', fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.06em', textDecoration: 'none', background: SAGE, color: 'white', border: `2px solid ${SAGE}`, boxShadow: `4px 4px 0 ${INK}` }}>
            WhatsApp Us
          </a>
          <a href="/"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '0.9rem 1.75rem', fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.06em', textDecoration: 'none', background: 'transparent', color: INK, border: `2px solid ${INK}`, boxShadow: `4px 4px 0 ${SAGE}` }}>
            Back to Shop
          </a>
        </div>
      </div>
    </div>
  );
}
