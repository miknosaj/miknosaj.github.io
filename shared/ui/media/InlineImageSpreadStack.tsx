import { useEffect, useMemo, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import type { StackImage } from './InlineImageStack';
import { imageDimensionsCache, type ImageDimensions } from '@/shared/utils/imageDimensionsCache';

// Custom PhotoCard for contact sheets that uses object-cover
function ContactSheetCard({ src, alt }: { src: string; alt: string }) {
  const borderThickness = 'var(--stack-border-thickness, 8px)';
  return (
    <div className="relative w-full h-full" style={{ transformOrigin: '50% 50%' }}>
      <div
        className="absolute inset-0 overflow-hidden bg-white transition-shadow duration-300 ease-out shadow-[0px_6px_18px_0px_rgba(0,0,0,0.22)] group-hover:shadow-[0px_3px_12px_0px_rgba(0,0,0,0.16)]"
      >
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover select-none"
          style={{
            objectPosition: 'center',
            userSelect: 'none' as const
          }}
          draggable={false}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute border-solid border-white transition-shadow duration-300 ease-out shadow-[0px_4px_12px_0px_rgba(0,0,0,0.18)] group-hover:shadow-[0px_2px_8px_0px_rgba(0,0,0,0.12)]"
          style={{
            borderWidth: borderThickness,
            inset: `calc(-1 * ${borderThickness})`
          }}
        />
      </div>
    </div>
  );
}

interface InlineImageSpreadStackProps {
  images: StackImage[];
  pageType?: 'photography' | 'writing';
  caption?: string;
  rows?: number;
  cols?: number;
  gap?: number;
}

const FALLBACK_ASPECT = 1.35;

export function InlineImageSpreadStack({
  images,
  caption,
  rows,
  cols,
  gap,
}: InlineImageSpreadStackProps) {
  const [isSpread, setIsSpread] = useState(false);
  const [imageDimensions, setImageDimensions] = useState<Map<number, ImageDimensions>>(new Map());
  const [isSmallScreen, setIsSmallScreen] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }
    return window.matchMedia('(max-width: 767px)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const media = window.matchMedia('(max-width: 767px)');

    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsSmallScreen(event.matches);
    };

    // Support older Safari versions
    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', handleChange);
    } else {
      media.addListener(handleChange);
    }

    return () => {
      if (typeof media.removeEventListener === 'function') {
        media.removeEventListener('change', handleChange);
      } else {
        media.removeListener(handleChange);
      }
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    const loadDimensions = async () => {
      const dimensionMap = new Map<number, ImageDimensions>();

      await Promise.all(
        images.map(async (img, idx) => {
          const dimensions = await imageDimensionsCache.getDimensions(img.src);
          if (dimensions) {
            dimensionMap.set(idx, dimensions);
          }
        })
      );

      if (mounted) {
        setImageDimensions(dimensionMap);
      }
    };

    loadDimensions();
    return () => {
      mounted = false;
    };
  }, [images]);

  const averageAspect = useMemo(() => {
    if (!imageDimensions.size) {
      return FALLBACK_ASPECT;
    }
    let sum = 0;
    imageDimensions.forEach(({ width, height }) => {
      if (width && height) {
        sum += width / height;
      }
    });
    const value = sum / imageDimensions.size;
    return Number.isFinite(value) && value > 0 ? value : FALLBACK_ASPECT;
  }, [imageDimensions]);

  const clampedAspect = Math.min(Math.max(averageAspect, 0.9), 1.6);
  const baseCardWidth = isSmallScreen ? 120 : 160;
  const cardWidth = baseCardWidth;
  const cardHeight = cardWidth / clampedAspect;
  const horizontalGap = gap ?? (isSmallScreen ? 14 : 20);
  const verticalGap = gap ?? (isSmallScreen ? 12 : 16);
  const colCount = Math.min(cols ?? (isSmallScreen ? 3 : 5), images.length);
  const rowCount = rows ?? Math.ceil(images.length / colCount);
  const gridWidth = colCount * cardWidth + (colCount - 1) * horizontalGap;
  const gridHeight = rowCount * cardHeight + (rowCount - 1) * verticalGap;
  const stackHeight = cardHeight * (isSmallScreen ? 2.2 : 2.4);
  const containerHeight = isSpread ? gridHeight + 40 : stackHeight;
  const stackMaxWidth = Math.max(cardWidth * 2.6, 420);
  const expandedMaxWidth = Math.min(gridWidth + horizontalGap * 2, isSmallScreen ? 460 : gridWidth + horizontalGap * 2 + 40);
  const containerMaxWidth = isSpread ? expandedMaxWidth : stackMaxWidth;

  const baseTransforms = useMemo(() => {
    // Seeded random for consistent but messy scattered appearance
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
      return x - Math.floor(x);
    };

    return images.map((_, idx) => {
      // Highly varied rotation - ensure no two angles are similar
      // Use golden ratio to maximize distribution
      const goldenRatio = 0.618033988749895;
      const baseRotation = (idx * goldenRatio * 360) % 30 - 15; // Spread across -15° to 15°
      const uniqueVariation = seededRandom(idx * 7.89) * 10 - 5; // Additional ±5° variation
      const angle = baseRotation + uniqueVariation;

      // Evenly distribute cards around circle but with varied distances
      const totalCards = images.length;
      const baseAngle = (idx / totalCards) * Math.PI * 2; // Even distribution
      const angleJitter = (seededRandom(idx * 7.2) - 0.5) * 0.8; // Add randomness to angle
      const spreadAngle = baseAngle + angleJitter;

      // Variable distance - some closer, some farther
      const distanceBase = 60 + (idx % 3) * 30; // Layered distances: 60, 90, 120
      const distanceVariation = seededRandom(idx * 9.5) * 40 - 20; // ±20px variation
      const distance = distanceBase + distanceVariation;

      // Wider horizontal spread, moderate vertical
      const horizontalStretch = 1.3;
      const verticalCompress = 0.75;

      const baseX = Math.cos(spreadAngle) * distance * horizontalStretch;
      const baseY = Math.sin(spreadAngle) * distance * verticalCompress;

      // Smaller jitter to keep even distribution but add messiness
      const jitterX = (seededRandom(idx * 13.6) - 0.5) * 30;
      const jitterY = (seededRandom(idx * 17.8) - 0.5) * 25;

      return {
        angle,
        x: baseX + jitterX,
        y: baseY + jitterY
      };
    });
  }, [images.length]);

  const handleToggle = () => {
    setIsSpread((prev) => !prev);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  };

  // Calculate caption margin as a percentage of container height for better scaling
  const captionMarginPx = isSpread
    ? (isSmallScreen ? 60 : 72) // Fixed spacing in spread state
    : (isSmallScreen ? 100 : 56); // Moderate spacing in collapsed state

  // Emil Kowalski style spring configurations - high damping for no bounce
  const containerSpring = {
    type: 'spring' as const,
    stiffness: 300,
    damping: 40,
  };

  const cardSpring = isSpread
    ? { type: 'spring' as const, stiffness: 260, damping: 38 }
    : { type: 'spring' as const, stiffness: 350, damping: 42 };

  const captionSpring = {
    type: 'spring' as const,
    stiffness: 280,
    damping: 40,
  };

  // Calculate bottom padding to keep consistent spacing to text below
  const bottomPaddingPx = isSpread
    ? (isSmallScreen ? 24 : 32) // Moderate padding in spread state
    : (isSmallScreen ? 16 : 32); // Less padding in collapsed state (caption is already lower)

  const containerPadding = isSpread
    ? "mt-4 md:mt-8"
    : "mt-16 md:mt-8";

  return (
    <div className={containerPadding} style={{ marginBottom: `${bottomPaddingPx}px` }}>
      <motion.div
        role="button"
        tabIndex={0}
        aria-pressed={isSpread}
        aria-label={isSpread ? 'Collapse contact sheet grid' : 'Expand contact sheet grid'}
        className="relative mx-auto flex w-full cursor-pointer items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/60"
        style={{
          '--stack-border-thickness': isSpread ? '6px' : '8px',
          marginTop: isSpread ? (isSmallScreen ? '2rem' : '2.5rem') : (isSmallScreen ? '2rem' : '3rem'),
        } as CSSProperties}
        animate={{ height: containerHeight, maxWidth: containerMaxWidth }}
        transition={containerSpring}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
      >
        <div className="relative h-full w-full">
          {images.map((img, index) => {
            const transform = baseTransforms[index] ?? { angle: 0, x: 0, y: 0 };
            const effectiveIndex = index;
            const col = effectiveIndex % colCount;
            const row = Math.floor(effectiveIndex / colCount);

            // Use individual image's aspect ratio if available, otherwise use average
            const imgDims = imageDimensions.get(index);
            const imgAspect = imgDims ? imgDims.aspectRatio : clampedAspect;
            const individualHeight = cardWidth / imgAspect;

            const gridX = (col - (colCount - 1) / 2) * (cardWidth + horizontalGap);
            const gridY = (row - (rowCount - 1) / 2) * (individualHeight + verticalGap);

            return (
              <motion.div
                key={`${img.src}-${index}`}
                className="absolute left-1/2 top-1/2"
                style={{
                  zIndex: images.length - index,
                  width: `${cardWidth}px`,
                  height: `${individualHeight}px`,
                  marginLeft: `-${cardWidth / 2}px`,
                  marginTop: `-${individualHeight / 2}px`,
                  transformOrigin: '50% 50%',
                }}
                initial={{
                  x: transform.x,
                  y: transform.y,
                  rotate: transform.angle,
                  scale: 1.3,
                }}
                animate={{
                  x: isSpread ? gridX : transform.x,
                  y: isSpread ? gridY : transform.y,
                  rotate: isSpread ? 0 : transform.angle,
                  scale: isSpread ? 0.9 : 1.3,
                }}
                transition={cardSpring}
              >
                <ContactSheetCard src={img.src} alt={img.alt} />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
      {caption && (
        <motion.figcaption
          className="text-sm text-[#9c9c9b] leading-relaxed text-center"
          animate={{ marginTop: `${captionMarginPx}px` }}
          transition={captionSpring}
        >
          {caption}
        </motion.figcaption>
      )}
    </div>
  );
}
