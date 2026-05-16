export default function Footer() {
  return (
    <footer
      id="contact"
      style={{
        background: 'var(--base-dark)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        paddingTop: '80px',
        paddingBottom: '80px',
        paddingLeft: '24px',
        paddingRight: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
      }}
      className="footer-root"
    >
      {/* LEFT — Brand */}
      <div>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(40px, 7vw, 96px)',
            fontWeight: 900,
            color: 'white',
            textTransform: 'uppercase',
            lineHeight: 0.95,
            marginBottom: '24px',
          }}
        >
          F1 Arch
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            color: 'rgba(255,255,255,0.35)',
          }}
        >
          Engineered without compromise.
        </p>
      </div>

      {/* RIGHT — Contact + copyright */}
      <div className="footer-right">
        <a
          href="mailto:hello@f1arch.com"
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-display)',
            fontSize: '11px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--accent-silver)',
            textDecoration: 'none',
            borderBottom: '1px solid rgba(255,255,255,0.2)',
            paddingBottom: '4px',
            transition: 'color 300ms',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.color = 'white';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.color =
              'var(--accent-silver)';
          }}
        >
          hello@f1arch.com
        </a>

        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '9px',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.18)',
            marginTop: '16px',
          }}
        >
          2025 F1 ARCH — ALL RIGHTS RESERVED
        </p>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .footer-root {
            flex-direction: row !important;
            justify-content: space-between;
            align-items: flex-end;
            padding-left: 56px !important;
            padding-right: 56px !important;
          }
          .footer-right {
            text-align: right;
          }
        }
      `}</style>
    </footer>
  );
}
