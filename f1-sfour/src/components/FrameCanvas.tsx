'use client';

import { useEffect, useRef } from 'react';
import { type MotionValue, useMotionValueEvent } from 'framer-motion';

interface FrameCanvasProps {
  sectionProgress: MotionValue<number>;
  frameCount: number;
  framesPath: string;
}

export default function FrameCanvas({
  sectionProgress,
  frameCount,
  framesPath,
}: FrameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentIndexRef = useRef<number>(0);

  function drawFrame(index: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete) return;

    const dpr = window.devicePixelRatio || 1;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    canvas.width = vw * dpr;
    canvas.height = vh * dpr;
    canvas.style.width = vw + 'px';
    canvas.style.height = vh + 'px';

    ctx.scale(dpr, dpr);

    const scale = Math.max(vw / img.naturalWidth, vh / img.naturalHeight);
    const drawW = img.naturalWidth * scale;
    const drawH = img.naturalHeight * scale;
    const offsetX = (vw - drawW) / 2;
    const offsetY = (vh - drawH) / 2;

    ctx.clearRect(0, 0, vw, vh);
    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
  }

  useEffect(() => {
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      
      let prefix = '';
      if (framesPath.includes('section1')) prefix = 'hero_';
      else if (framesPath.includes('section2')) prefix = 'cockpit_';
      else if (framesPath.includes('section3')) prefix = 'livery_';
      
      const num = String(i + 1).padStart(3, '0');
      img.src = `${framesPath}/${prefix}${num}.jpg`;
      
      images.push(img);
    }

    imagesRef.current = images;
    currentIndexRef.current = 0;

    images[0].onload = () => {
      drawFrame(0);
    };

    const handleResize = () => {
      drawFrame(currentIndexRef.current);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameCount, framesPath]);

  useMotionValueEvent(sectionProgress, 'change', (v) => {
    const index = Math.min(
      Math.round(Math.max(0, v) * (frameCount - 1)),
      frameCount - 1
    );
    if (index !== currentIndexRef.current) {
      currentIndexRef.current = index;
      drawFrame(index);
    }
  });

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
      }}
    />
  );
}
