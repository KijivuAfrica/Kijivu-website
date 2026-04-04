// AnnouncementBar — visibility controlled by App.jsx via localStorage

const SHOPIFY_URL = 'YOUR_SHOPIFY_URL';

export default function AnnouncementBar({ onDismiss }) {
  const dismiss = () => {
    localStorage.setItem('kijivuBarDismissed', '1');
    onDismiss?.();
  };

  return (
    <div style={{
      position: 'relative',
      background: '#1A5C3A',
      height: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 200,
    }}>
      <p style={{
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 300,
        fontSize: 12,
        letterSpacing: '0.08em',
        color: '#9FE1CB',
        margin: 0,
        textAlign: 'center',
        padding: '0 2.5rem',
      }}>
        TAJI presale now open, ships August 2026, reserve yours at{' '}
        <a
          href={SHOPIFY_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#ffffff', textDecoration: 'underline', fontWeight: 300 }}
        >
          $36
        </a>
      </p>
      <button
        onClick={dismiss}
        aria-label="Dismiss announcement"
        style={{
          position: 'absolute',
          right: 14,
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#9FE1CB',
          fontSize: 16,
          lineHeight: 1,
          padding: '2px 4px',
        }}
      >
        ×
      </button>
    </div>
  );
}
