'use client'

import { useRef } from 'react'
import { useScroll, useTransform, useSpring } from 'framer-motion'
import { SECTIONS } from '@/data/sections'
import Navbar from '@/components/Navbar'
import SectionBlock from '@/components/SectionBlock'
import SpecsGrid from '@/components/SpecsGrid'
import Footer from '@/components/Footer'

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Apply a spring to the master scroll progress for an ultra-smooth cinematic feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 15,
    restDelta: 0.001,
  })

  const s1Progress = useTransform(smoothProgress, [0, 0.333], [0, 1])
  const s2Progress = useTransform(smoothProgress, [0.333, 0.666], [0, 1])
  const s3Progress = useTransform(smoothProgress, [0.666, 1.0], [0, 1])

  const progresses = [s1Progress, s2Progress, s3Progress]

  return (
    <main style={{ background: 'var(--base-dark)', position: 'relative' }}>
      <Navbar />
      <div
        ref={containerRef}
        style={{ height: '1500vh', position: 'relative' }}
      >
        {SECTIONS.map((section, i) => (
          <SectionBlock
            key={section.id}
            section={section}
            sectionProgress={progresses[i]}
            isFirst={i === 0}
          />
        ))}
      </div>
      <div
        style={{
          position: 'relative',
          zIndex: 20,
          background: 'var(--base-dark)',
        }}
      >
        <SpecsGrid />
        <Footer />
      </div>
    </main>
  )
}