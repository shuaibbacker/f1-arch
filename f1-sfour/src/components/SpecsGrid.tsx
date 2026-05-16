const SPECS = [
  {
    label: 'Power Unit',
    value: '1.6L V6',
    sub: 'Hybrid turbo, 1000+ combined bhp',
  },
  {
    label: 'Downforce',
    value: '1,200 KG',
    sub: 'At maximum velocity',
  },
  {
    label: 'Brake Dist',
    value: '< 17 M',
    sub: 'From 300 to 0 km/h',
  },
  {
    label: 'Cornering G',
    value: '6.5 G',
    sub: 'Lateral load at peak speed',
  },
] as const;

export default function SpecsGrid() {
  return (
    <section
      style={{
        background: 'var(--carbon)',
        paddingTop: '96px',
        paddingBottom: '96px',
        paddingLeft: '24px',
        paddingRight: '24px',
      }}
      // md breakpoint overrides handled via inline style below via a wrapper trick
    >
      {/* Inner container — constrains padding on md+ */}
      <div
        style={{
          maxWidth: '100%',
        }}
        className="specs-inner"
      >
        {/* Section eyebrow */}
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '10px',
            letterSpacing: '0.5em',
            color: 'var(--accent-silver)',
            textTransform: 'uppercase',
            opacity: 0.5,
            marginBottom: '64px',
          }}
        >
          Technical Specifications
        </p>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
          }}
          className="specs-grid"
        >
          {SPECS.map((spec, i) => (
            <div
              key={spec.label}
              style={{
                paddingLeft: i === 0 ? 0 : '32px',
                paddingBottom: '48px',
                borderLeft:
                  i === 0 ? 'none' : '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {/* Label */}
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '9px',
                  letterSpacing: '0.4em',
                  color: 'var(--accent-silver)',
                  textTransform: 'uppercase',
                  opacity: 0.45,
                  marginBottom: '16px',
                }}
              >
                {spec.label}
              </p>

              {/* Value */}
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 4vw, 48px)',
                  fontWeight: 900,
                  color: 'white',
                  marginBottom: '10px',
                  lineHeight: 1,
                }}
              >
                {spec.value}
              </p>

              {/* Sub */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.35)',
                  lineHeight: 1.6,
                }}
              >
                {spec.sub}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive overrides via a scoped style tag */}
      <style>{`
        @media (min-width: 768px) {
          .specs-inner {
            padding-left: 56px;
            padding-right: 56px;
          }
          .specs-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
    </section>
  );
}
