import { useState, useRef, MouseEvent } from 'react';
import { InlineMediaFrame } from './InlineMedia';

interface InlineImageWithMagnifierProps {
  src: string;
  alt: string;
  magnifierSrc?: string; // Optional high-res version for magnifier
  pageType?: 'photography' | 'writing';
  caption?: string;
  orientation?: 'portrait' | 'landscape';
  magnifierSize?: number;
  zoomLevel?: number;
}

export function InlineImageWithMagnifier({
  src,
  alt,
  magnifierSrc,
  pageType = 'writing',
  caption,
  orientation,
  magnifierSize = 180,
  zoomLevel = 2.5,
}: InlineImageWithMagnifierProps) {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const [backgroundPosition, setBackgroundPosition] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLImageElement>(null);

  const handleMouseEnter = () => {
    setShowMagnifier(true);
  };

  const handleMouseLeave = () => {
    setShowMagnifier(false);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;

    const rect = imgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMagnifierPosition({ x, y });
    setBackgroundPosition({ x, y });
  };

  return (
    <InlineMediaFrame pageType={pageType} orientation={orientation} caption={caption}>
      <div
        className="relative w-full h-auto cursor-none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className="w-full h-auto object-cover bg-[#f5f5f5]"
          style={{ objectPosition: 'center' }}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.visibility = 'hidden';
          }}
        />

        {/* Magnifier circle - replaces cursor */}
        {showMagnifier && imgRef.current && (
          <div
            className="absolute pointer-events-none rounded-full border-2 border-white shadow-[0px_4px_12px_0px_rgba(0,0,0,0.25)] overflow-hidden"
            style={{
              width: `${magnifierSize}px`,
              height: `${magnifierSize}px`,
              left: `${magnifierPosition.x}px`,
              top: `${magnifierPosition.y}px`,
              transform: 'translate(-50%, -50%)',
              backgroundImage: `url('${magnifierSrc || src}')`,
              backgroundSize: `${imgRef.current.width * zoomLevel}px ${imgRef.current.height * zoomLevel}px`,
              backgroundPosition: `${-(backgroundPosition.x * zoomLevel - magnifierSize / 2)}px ${-(backgroundPosition.y * zoomLevel - magnifierSize / 2)}px`,
              backgroundRepeat: 'no-repeat',
              zIndex: 50,
            }}
          />
        )}
      </div>
    </InlineMediaFrame>
  );
}
