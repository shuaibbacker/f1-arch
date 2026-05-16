'use client';

import { useTransform, motion, type MotionValue } from 'framer-motion';
import type { SectionData, ScrollPhase } from '@/data/sections';

interface SectionOverlayProps {
  sectionProgress: MotionValue<number>;
  section: SectionData;
}

// ─── Phase block (must be its own component so each phase gets its own hooks) ───
function PhaseBlock({
  phase,
  sectionProgress,
}: {
  phase: ScrollPhase;
  sectionProgress: MotionValue<number>;
}) {
  const mid = (phase.scrollStart + phase.scrollEnd) / 2;

  const opacity = useTransform(
    sectionProgress,
    [
      phase.scrollStart,
      phase.scrollStart + 0.07,
      mid,
      phase.scrollEnd - 0.07,
      phase.scrollEnd,
    ],
    [0, 1, 1, 1, 0]
  );

  const y = useTransform(
    sectionProgress,
    [
      phase.scrollStart,
      phase.scrollStart + 0.1,
      phase.scrollEnd - 0.1,
      phase.scrollEnd,
    ],
    [28, 0, 0, -28]
  );

  const isLeft = phase.alignment === 'left';
  const isRight = phase.alignment === 'right';
  const isCenter = phase.alignment === 'center';

  const lines = phase.headline.split('\n');

  const alignStyles: React.CSSProperties = isLeft
    ? { alignItems: 'flex-start', textAlign: 'left' }
    : isRight
      ? { alignItems: 'flex-end', textAlign: 'right', marginLeft: 'auto' }
      : { alignItems: 'center', textAlign: 'center', margin: '0 auto' };

  return (
    <motion.div
      style={{ opacity, y, display: 'flex', flexDirection: 'column', ...alignStyles }}
    >
      {/* Subheadline */}
      {phase.subheadline && (
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '10px',
            letterSpacing: '0.4em',
            color: 'rgba(255,255,255,0.55)',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          {phase.subheadline}
        </p>
      )}

      {/* Headline lines */}
      <div>
        {lines.map((line, i) => {
          const color =
            i === phase.accentWordIndex && phase.accentColor
              ? phase.accentColor
              : 'white';
          return (
            <span
              key={i}
              style={{
                display: 'block',
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 6vw, 88px)',
                fontWeight: 900,
                lineHeight: 1.0,
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                color,
              }}
            >
              {line}
            </span>
          );
        })}
      </div>

      {/* Red rule */}
      <div
        style={{
          width: '32px',
          height: '1px',
          background: '#E8002D',
          margin: '24px 0',
          ...(isRight ? { marginLeft: 'auto' } : {}),
        }}
      />

      {/* Paragraph */}
      {phase.paragraph && (
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(12px, 1.1vw, 15px)',
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.5)',
            maxWidth: isCenter ? '480px' : '380px',
            textAlign: isCenter ? 'center' : isRight ? 'right' : 'left',
          }}
        >
          {phase.paragraph}
        </p>
      )}
    </motion.div>
  );
}

// ─── Hero title (section 1 only) ─────────────────────────────────────────────
function HeroTitle({
  sectionProgress,
  heroTitle,
  heroSubtitle,
}: {
  sectionProgress: MotionValue<number>;
  heroTitle: string;
  heroSubtitle?: string;
}) {
  const heroTitleOpacity = useTransform(
    sectionProgress,
    [0, 0.08, 0.22, 0.3],
    [0, 1, 1, 0]
  );

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        pointerEvents: 'none',
      }}
    >
      <motion.div
        style={{
          opacity: heroTitleOpacity,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(72px, 12vw, 160px)',
            fontWeight: 900,
            color: 'white',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            textAlign: 'center',
          }}
        >
          {heroTitle}
        </span>
        {heroSubtitle && (
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '13px',
              letterSpacing: '0.55em',
              color: 'rgba(255,255,255,0.5)',
              textTransform: 'uppercase',
              textAlign: 'center',
              marginTop: '20px',
            }}
          >
            {heroSubtitle}
          </span>
        )}
      </motion.div>
    </div>
  );
}

// ─── Right rail ───────────────────────────────────────────────────────────────
function SideRail({
  items,
  sectionProgress,
}: {
  items: string[];
  sectionProgress: MotionValue<number>;
}) {
  const railOpacity = useTransform(sectionProgress, [0.05, 0.18], [0, 1]);

  return (
    <motion.div
      style={{
        opacity: railOpacity,
        position: 'absolute',
        right: '40px',
        top: '50%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '16px',
      }}
    >
      {items.map((item) => (
        <span
          key={item}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '9px',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)',
            textAlign: 'right',
          }}
        >
          {item}
        </span>
      ))}
    </motion.div>
  );
}

// ─── Frame counter ────────────────────────────────────────────────────────────
function FrameCounter({
  sectionProgress,
  frameCount,
}: {
  sectionProgress: MotionValue<number>;
  frameCount: number;
}) {
  const counterOpacity = useTransform(sectionProgress, [0, 0.06], [0, 1]);

  const counterText = useTransform(sectionProgress, (v) => {
    const f =
      Math.min(Math.round(Math.max(0, v) * (frameCount - 1)), frameCount - 1) +
      1;
    return (
      String(f).padStart(3, '0') + ' / ' + String(frameCount).padStart(3, '0')
    );
  });

  return (
    <motion.div
      style={{
        opacity: counterOpacity,
        position: 'absolute',
        bottom: '28px',
        right: '40px',
        pointerEvents: 'none',
        fontFamily: 'var(--font-display)',
        fontSize: '10px',
        letterSpacing: '0.3em',
        color: 'rgba(255,255,255,0.25)',
      }}
    >
      <motion.span>{counterText}</motion.span>
    </motion.div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function SectionOverlay({
  sectionProgress,
  section,
}: SectionOverlayProps) {
  const hasHero = !!section.heroTitle;
  const hasRail = section.sideRailItems.length > 0;

  // Find the active phase(s) — skip fully empty phases
  const visiblePhases = section.phases.filter(
    (p) => p.headline || p.subheadline || p.paragraph
  );

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 10,
        pointerEvents: 'none',
        padding: 'clamp(48px, 5vw, 96px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* TOP-LEFT LABEL */}
      <div
        style={{
          position: 'absolute',
          top: '28px',
          left: '40px',
          zIndex: 15,
          pointerEvents: 'none',
        }}
      >
        {section.systemLabel ? (
          // Section 1: red dot + system label
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#E8002D',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '10px',
                letterSpacing: '0.4em',
                color: 'white',
                textTransform: 'uppercase',
                opacity: 0.7,
              }}
            >
              {section.systemLabel}
            </span>
          </div>
        ) : (
          // Sections 2 & 3: two red bars + accent label
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '3px',
              }}
            >
              <div style={{ width: '20px', height: '1.5px', background: '#E8002D' }} />
              <div style={{ width: '20px', height: '1.5px', background: '#E8002D' }} />
            </div>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '10px',
                letterSpacing: '0.4em',
                color: 'white',
                textTransform: 'uppercase',
                opacity: 0.7,
              }}
            >
              {section.accentLabel}
            </span>
          </div>
        )}
      </div>

      {/* HERO TITLE (section 1 only) */}
      {hasHero && (
        <HeroTitle
          sectionProgress={sectionProgress}
          heroTitle={section.heroTitle!}
          heroSubtitle={section.heroSubtitle}
        />
      )}

      {/* PHASE BLOCKS */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: 'clamp(48px, 5vw, 96px)',
          display: 'flex',
          alignItems: 'flex-end',
          pointerEvents: 'none',
        }}
      >
        <div style={{ width: '100%', position: 'relative' }}>
          {visiblePhases.map((phase, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
              }}
            >
              <PhaseBlock phase={phase} sectionProgress={sectionProgress} />
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT RAIL */}
      {hasRail && (
        <SideRail
          items={section.sideRailItems}
          sectionProgress={sectionProgress}
        />
      )}

      {/* FRAME COUNTER */}
      <FrameCounter
        sectionProgress={sectionProgress}
        frameCount={section.frameCount}
      />
    </div>
  );
}
