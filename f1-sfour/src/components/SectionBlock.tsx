'use client';

import { useRef, useEffect } from 'react';
import {
  motion,
  useSpring,
  useInView,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import type { SectionData } from '@/data/sections';
import FrameCanvas from './FrameCanvas';
import SectionOverlay from './SectionOverlay';

interface SectionBlockProps {
  section: SectionData;
  sectionProgress: MotionValue<number>;
  isFirst: boolean;
}

export default function SectionBlock({
  section,
  sectionProgress,
  isFirst,
}: SectionBlockProps) {
  const stickyRef = useRef<HTMLDivElement>(null);

  // 1. Entrance animation (triggers when section scrolls into view from bottom)
  const inView = useInView(stickyRef, {
    once: true,
    margin: '-10% 0px -10% 0px',
  });

  const enterOpacity = useSpring(isFirst ? 1 : 0, { stiffness: 50, damping: 20 });
  const enterY = useSpring(isFirst ? 0 : 60, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (inView) {
      enterOpacity.set(1);
      enterY.set(0);
    }
  }, [inView, enterOpacity, enterY]);

  // 2. Exit animation (triggers when section finishes its sticky scroll)
  const exitOpacity = useTransform(sectionProgress, [0.95, 1], [1, 0]);
  const scale = useTransform(sectionProgress, [0.95, 1], [1, 0.95]);

  // 3. Combine entrance and exit opacity
  const opacity = useTransform([enterOpacity, exitOpacity], ([enter, exit]) => {
    return Math.min(enter as number, exit as number);
  });

  const y = enterY;

  return (
    <section
      id={section.id}
      style={{ height: section.stickyHeight, position: 'relative' }}
    >
      {/* Accessible content for screen readers */}
      <div className="sr-only">
        <h2>{section.accentLabel}</h2>
        {section.phases.map((phase, i) => (
          <p key={i}>
            {[phase.headline, phase.paragraph]
              .filter(Boolean)
              .join(' — ')}
          </p>
        ))}
      </div>

      {/* Sticky viewport */}
      <motion.div
        ref={stickyRef}
        style={{
          opacity,
          y,
          scale,
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        {/* Frame canvas — z-index 0 */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <FrameCanvas
            sectionProgress={sectionProgress}
            frameCount={section.frameCount}
            framesPath={section.framesPath}
          />
        </div>

        {/* Top + bottom vignette — z-index 5 */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 5,
            pointerEvents: 'none',
            background:
              'linear-gradient(to bottom, rgba(8,8,8,0.55) 0%, transparent 25%, transparent 65%, rgba(8,8,8,0.8) 100%)',
          }}
        />

        {/* Left edge fade — z-index 5 */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 5,
            pointerEvents: 'none',
            background:
              'linear-gradient(to right, rgba(8,8,8,0.4) 0%, transparent 30%)',
          }}
        />

        {/* Section overlay (text, labels, counter) — z-index 10 */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
          <SectionOverlay
            sectionProgress={sectionProgress}
            section={section}
          />
        </div>
      </motion.div>
    </section>
  );
}
