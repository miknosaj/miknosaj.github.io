import { InlineMediaFrame } from './InlineMedia';

interface InlineImageProps {
  src: string;
  alt: string;
  pageType?: 'photography' | 'writing';
  caption?: string;
  orientation?: 'portrait' | 'landscape';
}

export function InlineImage({ src, alt, pageType = 'writing', caption, orientation }: InlineImageProps) {
  return (
    <InlineMediaFrame pageType={pageType} orientation={orientation} caption={caption}>
      <img
        src={src}
        alt={alt}
        className="w-full h-auto object-cover bg-[#f5f5f5]"
        style={{ objectPosition: 'center' }}
        loading="lazy"
        decoding="async"
        onError={(e) => {
          // Hide the broken image to reveal the solid background color
          (e.currentTarget as HTMLImageElement).style.visibility = 'hidden';
        }}
      />
    </InlineMediaFrame>
  );
}
