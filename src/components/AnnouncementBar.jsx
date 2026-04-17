// AnnouncementBar — visibility controlled by App.jsx via localStorage
const SHOPIFY_URL = 'https://4ykyr0-mp.myshopify.com/collections/all';

const GREEN_DARK = '#1A5C3A';
const SANS       = "'Montserrat', sans-serif";

export default function AnnouncementBar({ onDismiss }) {
  const dismiss = () => {
    localStorage.setItem('kijivuBarDismissed', '1');
    onDismiss?.();
  };

  return (
    <div style={{
      position: 'relative',
      background: GREEN_DARK,
      height: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 200,
    }}>
      <p style={{
        fontFamily: SANS,
        fontWeight: 400,
        fontSize: 11,
        letterSpacing: '0.1em',
        color: 'rgba(253,251,247,0.75)',
        margin: 0,
        textAlign: 'center',
        padding: '0 2.5rem',
      }}>
        TAJI presale now open, ships August 2026. Reserve yours at{' '}
        <a
          href={SHOPIFY_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#9FE1CB', textDecoration: 'underline', fontWeight: 400 }}
        >
          $36
        </a>
        {' '}— US and Canada only.
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
          color: 'rgba(253,251,247,0.35)',
          fontSize: 14,
          lineHeight: 1,
          padding: '2px 4px',
        }}
      >
        ×
      </button>
    </div>
  );
}
