import { useState } from 'react';
import { InlineMediaFrame } from './InlineMedia';

interface InlineImageThemeToggleProps {
  src: string;
  darkSrc: string;
  alt: string;
  pageType?: 'photography' | 'writing';
  caption?: string;
  orientation?: 'portrait' | 'landscape';
  onToggle: () => void;
}

export function InlineImageThemeToggle({
  src,
  darkSrc,
  alt,
  pageType = 'writing',
  caption,
  orientation,
  onToggle,
}: InlineImageThemeToggleProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <InlineMediaFrame pageType={pageType} orientation={orientation} caption={caption}>
      <div
        className="relative w-full h-auto cursor-pointer transition-opacity duration-200"
        onClick={onToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-auto object-cover bg-[#f5f5f5]"
          style={{
            objectPosition: 'center',
            opacity: isHovered ? 0.9 : 1,
          }}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.visibility = 'hidden';
          }}
        />
      </div>
    </InlineMediaFrame>
  );
}
