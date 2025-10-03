import { useMemo, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { InlineMediaFrame } from './InlineMedia';
import { PhotoCard } from './PhotoCard';
import { imageDimensionsCache, type ImageDimensions } from '@/shared/utils/imageDimensionsCache';

export interface StackImage {
  src: string;
  alt: string;
  caption?: string;
}

interface InlineImageStackProps {
  images: StackImage[];
  pageType?: 'photography' | 'writing';
  height?: number; // optional fixed container height in px (will use natural dimensions if not provided)
  mobileHeight?: number; // optional mobile height (defaults to 60% of height if not provided)
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
  height,
  mobileHeight,
  rotationMin = 1.2,
  rotationMax = 2.8,
  duration,
}: InlineImageStackProps) {
  const [order, setOrder] = useState<number[]>(() => images.map((_, i) => i));
  const [hovered, setHovered] = useState(false);
  const [fadingTop, setFadingTop] = useState(false);
  const [movingUp, setMovingUp] = useState(false);
  const [enteringBack, setEnteringBack] = useState(false);
  const [hoverCycle, setHoverCycle] = useState(0);
  const [imageDimensions, setImageDimensions] = useState<Map<number, ImageDimensions>>(() => {
    // Try to get cached dimensions immediately
    const cachedMap = new Map<number, ImageDimensions>();
    images.forEach((img, idx) => {
      const cached = imageDimensionsCache.getCached(img.src);
      if (cached) {
        cachedMap.set(idx, cached);
      }
    });
    return cachedMap;
  });
  const reduceMotion = useReducedMotion();

  // Auto-reset hover state after 5 seconds on mobile/touch devices
  useEffect(() => {
    if (hovered) {
      // Only auto-reset on mobile (touch devices)
      const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
      if (isTouchDevice) {
        const timeout = setTimeout(() => {
          setHovered(false);
          setHoverCycle((cycle) => cycle + 1);
        }, 5000);
        return () => clearTimeout(timeout);
      }
    }
  }, [hovered]);

  // Load image dimensions using cache
  useEffect(() => {
    const loadDimensions = async () => {
      const dimensionsMap = new Map<number, ImageDimensions>();

      await Promise.all(
        images.map(async (img, idx) => {
          const dimensions = await imageDimensionsCache.getDimensions(img.src);
          if (dimensions) {
            dimensionsMap.set(idx, dimensions);
          }
        })
      );

      setImageDimensions(dimensionsMap);
    };

    loadDimensions();
  }, [images]);

  const baseTransforms = useMemo(() => {
    const sanitizedMin = Math.max(rotationMin, 0);
    const span = Math.max(rotationMax - rotationMin, 0);
    const maxIndex = Math.max(images.length - 1, 1);
    const minimumSeparation = 0.35; // degrees – keep angles visually distinct
    const usedAngles: number[] = [];

    return images.map((img, i) => {
      const rnd = lcg(seedFromString(`${img.src}:${i}:${hoverCycle}`));
      const direction = i % 2 === 0 ? 1 : -1;
      const verticalDirection = ((i + hoverCycle) % 4 < 2 ? 1 : -1);
      const depth = i / maxIndex;
      const progression = sanitizedMin + span * depth;

      const bias = Math.sin((hoverCycle + i) * 1.13) * 0.2;
      let angle = direction * (progression + (rnd() - 0.5) * 0.32 + bias);

      if (Math.abs(angle) < sanitizedMin * 0.65) {
        angle = direction * sanitizedMin * 0.65;
      }

      // Prevent overlapping angles by nudging until separation is respected
      let guard = 0;
      while (
        usedAngles.some((used) => Math.abs(used - angle) < minimumSeparation) &&
        guard < 6
      ) {
        angle += direction * (minimumSeparation - 0.05);
        guard += 1;
      }
      usedAngles.push(angle);

      const radialScale = 1 + 0.25 * Math.cos((hoverCycle + i) * 0.9);
      const radialBase = (10 + depth * 24) * radialScale;
      const lateralJitter = (rnd() - 0.5) * (3 + depth * 3);
      const offCenter = Math.sin((hoverCycle + i) * 0.7) * 2;
      let tx = direction * (radialBase + lateralJitter) + offCenter;

      const verticalBase = radialBase * 0.42;
      const verticalJitter = (rnd() - 0.5) * (2.5 + depth * 2.5);
      let ty = verticalDirection * (verticalBase + verticalJitter);

      const minLateral = 12 + depth * 8;
      if (Math.abs(tx) < minLateral) {
        const lateralSign = tx === 0 ? direction : Math.sign(tx);
        tx = lateralSign * minLateral;
      }

      const minVertical = 6 + depth * 6;
      if (Math.abs(ty) < minVertical) {
        const verticalSign = ty === 0 ? verticalDirection : Math.sign(ty);
        ty = verticalSign * minVertical;
      }

      return { angle, tx, ty };
    });
  }, [images, rotationMin, rotationMax, hoverCycle]);

  const topIndex = order[0] ?? 0;
  const topCaption = images[topIndex]?.caption;
  const topDimensions = imageDimensions.get(topIndex);

  // Calculate container dimensions based on top image or provided height
  const containerHeight = height ?? topDimensions?.height ?? 360;
  const containerWidth = topDimensions ? topDimensions.width : undefined;

  // Calculate scaled mobile height
  const scaledMobileHeight = mobileHeight ?? Math.round(containerHeight * 0.75);

  const handleClick = () => {
    if (fadingTop || movingUp || order.length < 2) return;

    // Phase 1: Move top card up and fade out
    setMovingUp(true);
    setTimeout(() => setFadingTop(true), 50);

    // Reset hover state on tap to restart the auto-spread timer
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) {
      setHovered(false);
      // Re-trigger hover on next tick to restart timer
      setTimeout(() => setHovered(true), 0);
    }
  };

  const afterTopFade = () => {
    // Phase 2: Cycle order and trigger back entrance quickly
    setOrder(([first, ...rest]) => [...rest, first]);
    setFadingTop(false);
    setMovingUp(false);

    // Trigger back entrance immediately for faster transition
    setTimeout(() => {
      setEnteringBack(true);
      // Reset entering state after animation completes
      setTimeout(() => setEnteringBack(false), 400);
    }, 10);
  };

  const animDuration = duration ?? (reduceMotion ? 0 : 0.28);

  // Emil Kowalski style spring curves - snappy and natural
  const springConfig = {
    type: 'spring' as const,
    stiffness: 400,
    damping: 30,
  };

  const exitSpring = {
    type: 'spring' as const,
    stiffness: 500,
    damping: 35,
  };

  const enterSpring = {
    type: 'spring' as const,
    stiffness: 300,
    damping: 28,
  };

  return (
    <InlineMediaFrame
      pageType={pageType}
      caption={topCaption}
      noBorder={true}
      captionClassName="mt-[3.25rem] md:mt-12"
      containerClassName="mt-12 mb-10 md:mt-16 md:mb-18"
    >
      <div
        className="relative w-full scale-[0.75] md:scale-100 [--stack-border-thickness:10.6667px] md:[--stack-border-thickness:8px]"
        style={{
          transformOrigin: 'top center',
          '--mobile-height': `${scaledMobileHeight}px`,
          '--desktop-height': `${containerHeight}px`,
          height: 'var(--mobile-height)',
          marginTop: '3rem',
          marginBottom: '2rem',
        } as React.CSSProperties & { '--mobile-height': string; '--desktop-height': string }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setHoverCycle((cycle) => cycle + 1);
        }}
      >
        <div
          className="group relative w-full mx-auto"
          style={{
            height: containerHeight,
            maxWidth: containerWidth,
          }}
        >
          {order.map((idx, pos) => {
            const img = images[idx];
            const imgDims = imageDimensions.get(idx);
            const z = images.length - pos;
            const base = baseTransforms[idx] ?? { angle: 0, tx: 0, ty: 0 };
            const isTop = pos === 0;
            // When hovered: remove rotation but keep slight scatter (less on x, more on y)
            const targetRotate = hovered ? 0 : base.angle;
            const targetX = hovered ? base.tx * 0.2 : base.tx;
            const targetY = hovered ? base.ty * 0.35 : base.ty;
            const targetOpacity = isTop && fadingTop ? 0 : 1;

            // Calculate dimensions for each image to maintain aspect ratio
            let imgWidth = '100%';
            let imgHeight = '100%';

            if (imgDims) {
              if (height) {
                // If fixed height is provided, scale width accordingly
                imgWidth = `${(height * imgDims.aspectRatio)}px`;
                imgHeight = `${height}px`;
              } else {
                // Use natural dimensions
                imgWidth = `${imgDims.width}px`;
                imgHeight = `${imgDims.height}px`;
              }
            }

            const isBack = pos === order.length - 1;
            const isExiting = isTop && (movingUp || fadingTop);

            // Animation states for back card entrance
            let backY = targetY;
            let backOpacity = 1;

            if (isBack && enteringBack) {
              // Start above and fade in, then slide down
              backY = targetY - 40; // Start higher
              backOpacity = 0.3; // Start more transparent
            }

            return (
              <motion.div
                key={`${img.src}-${idx}`}
                className="absolute left-1/2 top-1/2"
                style={{
                  zIndex: z,
                  transformOrigin: '50% 50%',
                  width: imgWidth,
                  height: imgHeight,
                  marginLeft: `-${parseFloat(imgWidth) / 2}${imgWidth.includes('px') ? 'px' : '%'}`,
                  marginTop: `-${parseFloat(imgHeight) / 2}${imgHeight.includes('px') ? 'px' : '%'}`,
                }}
                initial={isBack && enteringBack ? {
                  opacity: 0,
                  y: targetY - 25,
                  rotate: targetRotate,
                  x: targetX,
                } : false}
                animate={{
                  opacity: isExiting ? 0 : (isBack && enteringBack ? 1 : targetOpacity),
                  y: isExiting ? -40 : (isBack && enteringBack ? targetY : targetY),
                  rotate: targetRotate,
                  x: targetX,
                }}
                transition={
                  isExiting
                    ? exitSpring
                    : isBack && enteringBack
                    ? enterSpring
                    : reduceMotion ? { duration: 0 } : springConfig
                }
                onAnimationComplete={() => {
                  if (isTop && fadingTop) afterTopFade();
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
