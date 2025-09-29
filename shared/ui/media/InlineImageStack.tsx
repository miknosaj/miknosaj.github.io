import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { InlineMediaFrame } from './InlineMedia';
import { PhotoCard } from './PhotoCard';

export interface StackImage {
  src: string;
  alt: string;
  caption?: string;
}

interface InlineImageStackProps {
  images: StackImage[];
  pageType?: 'photography' | 'writing';
  height?: number; // fixed container height in px
  borderWidth?: number; // white frame thickness
  rotationMin?: number; // degrees
  rotationMax?: number; // degrees
  duration?: number; // seconds
}

// deterministic randomness per image
function seedFromString(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i);
  return h >>> 0;
}
function lcg(seed: number) {
  let state = seed;
  return () => (state = (1664525 * state + 1013904223) % 4294967296) / 4294967296;
}

export function InlineImageStack({
  images,
  pageType = 'writing',
  height = 360,
  rotationMin = 0.5,
  rotationMax = 1.5,
  duration,
}: InlineImageStackProps) {
  const [order, setOrder] = useState<number[]>(() => images.map((_, i) => i));
  const [hovered, setHovered] = useState(false);
  const [fadingTop, setFadingTop] = useState(false);
  const reduceMotion = useReducedMotion();

  const baseTransforms = useMemo(() => {
    const range = Math.max(rotationMin, 0);
    const span = Math.max(rotationMax - rotationMin, 0);
    return images.map((img, i) => {
      const rnd = lcg(seedFromString(img.src + ':' + i));
      const angle = (rnd() * span + range) * (rnd() > 0.5 ? 1 : -1);
      const tx = rnd() * 2 - 1; // subtle horizontal jitter
      return { angle, tx };
    });
  }, [images, rotationMin, rotationMax]);

  const topIndex = order[0] ?? 0;
  const topCaption = images[topIndex]?.caption;

  const handleClick = () => {
    if (fadingTop || order.length < 2) return;
    setFadingTop(true);
  };
  const afterFade = () => {
    setOrder(([first, ...rest]) => [...rest, first]);
    setFadingTop(false);
  };

  const animDuration = duration ?? (reduceMotion ? 0 : 0.4);
  const ease = [0.25, 0.46, 0.45, 0.94] as const;

  return (
    <InlineMediaFrame pageType={pageType} caption={topCaption}>
      <div className="relative w-full" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <div className="relative w-full" style={{ height }}>
          {order.map((idx, pos) => {
            const img = images[idx];
            const z = images.length - pos;
            const base = baseTransforms[idx] ?? { angle: 0, tx: 0 };
            const isTop = pos === 0;
            const isSecond = pos === 1;
            const targetRotate = hovered ? 0 : base.angle;
            const targetX = hovered ? 0 : base.tx;
            const targetOpacity = isTop && fadingTop ? 0 : isSecond && fadingTop ? 1 : 1;
            return (
              <motion.div
                key={`${img.src}-${idx}`}
                className="absolute inset-0"
                style={{ zIndex: z, transformOrigin: '50% 50%' }}
                initial={{ opacity: 1, y: 0, rotate: targetRotate, x: targetX }}
                animate={{
                  opacity: targetOpacity,
                  y: isTop && fadingTop ? -28 : 0,
                  rotate: targetRotate,
                  x: targetX,
                }}
                transition={{ duration: animDuration, ease }}
                onAnimationComplete={() => {
                  if (isTop && fadingTop) afterFade();
                }}
                onClick={isTop ? handleClick : undefined}
                role={isTop ? 'button' : undefined}
                aria-label={isTop ? 'Next photo' : undefined}
              >
                <PhotoCard src={img.src} alt={img.alt} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </InlineMediaFrame>
  );
}
