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
  rotationMin = 1,
  rotationMax = 2.5,
  duration,
}: InlineImageStackProps) {
  const [order, setOrder] = useState<number[]>(() => images.map((_, i) => i));
  const [hovered, setHovered] = useState(false);
  const [fadingTop, setFadingTop] = useState(false);
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
    const range = Math.max(rotationMin, 0);
    const span = Math.max(rotationMax - rotationMin, 0);
    return images.map((img, i) => {
      const rnd = lcg(seedFromString(img.src + ':' + i));
      // Ensure each image gets a distinct angle by spreading them across the range
      // Use index to bias alternating directions for better visibility
      const angleDirection = i % 2 === 0 ? 1 : -1;
      const angleVariation = rnd() * span + range;
      const angle = angleVariation * angleDirection;
      const tx = (rnd() * 4 - 2) * (i % 2 === 0 ? 1 : -1); // more pronounced horizontal offset, alternating
      return { angle, tx };
    });
  }, [images, rotationMin, rotationMax]);

  const topIndex = order[0] ?? 0;
  const topCaption = images[topIndex]?.caption;
  const topDimensions = imageDimensions.get(topIndex);

  // Calculate container dimensions based on top image or provided height
  const containerHeight = height ?? topDimensions?.height ?? 360;
  const containerWidth = topDimensions ? topDimensions.width : undefined;

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
        <div
          className="relative w-full mx-auto"
          style={{
            height: containerHeight,
            maxWidth: containerWidth,
          }}
        >
          {order.map((idx, pos) => {
            const img = images[idx];
            const imgDims = imageDimensions.get(idx);
            const z = images.length - pos;
            const base = baseTransforms[idx] ?? { angle: 0, tx: 0 };
            const isTop = pos === 0;
            const isSecond = pos === 1;
            const targetRotate = hovered ? 0 : base.angle;
            const targetX = hovered ? 0 : base.tx;
            const targetOpacity = isTop && fadingTop ? 0 : isSecond && fadingTop ? 1 : 1;

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
