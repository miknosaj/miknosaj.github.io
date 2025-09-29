import { InlineMediaFrame } from './InlineMedia';
import { ProgressiveImage } from './ProgressiveImage';

interface InlineImageProps {
  src: string;
  alt: string;
  pageType?: 'photography' | 'writing';
  caption?: string;
  orientation?: 'portrait' | 'landscape';
  priority?: boolean;
}

export function InlineImage({ src, alt, pageType = 'writing', caption, orientation, priority }: InlineImageProps) {
  const aspectRatio = orientation ? (orientation === 'portrait' ? '3 / 4' : '4 / 3') : undefined;

  return (
    <InlineMediaFrame pageType={pageType} orientation={orientation} caption={caption}>
      <ProgressiveImage
        src={src}
        alt={alt}
        priority={priority}
        aspectRatio={aspectRatio}
        className="h-full"
        style={{ objectPosition: 'center' }}
      />
    </InlineMediaFrame>
  );
}
