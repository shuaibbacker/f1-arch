'use client';

import { useScroll, useTransform, motion } from 'framer-motion';

export default function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-8 py-5 md:px-14 pointer-events-none"
      style={{ background: 'transparent' }}
    >
      {/* Logo (Centered) */}
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '13px',
          letterSpacing: '0.22em',
          color: 'white',
          textTransform: 'uppercase',
          pointerEvents: 'auto',
        }}
      >
        F1 ARCH
      </span>
    </nav>
  );
}
