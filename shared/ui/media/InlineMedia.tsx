import type { ReactNode } from 'react';

type PhotoOrientation = 'portrait' | 'landscape';

interface InlineMediaFrameProps {
  pageType?: 'photography' | 'writing';
  orientation?: PhotoOrientation;
  caption?: string;
  children: ReactNode;
  noBorder?: boolean;
  captionClassName?: string;
  containerClassName?: string;
}

export function InlineMediaFrame({
  pageType = 'writing',
  orientation,
  caption,
  children,
  noBorder = false,
  captionClassName,
  containerClassName,
}: InlineMediaFrameProps) {
  const getWidthClasses = () => {
    if (pageType === 'photography') {
      if (orientation === 'landscape') {
        return 'w-full md:w-[120%] md:-translate-x-[10%]';
      }
      return 'w-full md:w-[95%] md:mx-auto';
    }
    return 'w-full md:w-[115%] md:-ml-[7.5%]';
  };

  return (
    <figure className={`mt-10 mb-6 inline-image-container ${getWidthClasses()} ${containerClassName ?? ''}`}>
      <div className={`relative w-full overflow-hidden ${!noBorder ? 'shadow-[0px_2px_8px_0px_rgba(0,0,0,0.15)]' : ''}`}>
        {children}
        {!noBorder && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute border-[8px] border-solid border-white inset-[-8px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.15)]"
          />
        )}
      </div>
      {caption && (
        <figcaption
          className={`mt-8 text-sm text-[#9c9c9b] leading-relaxed text-center ${captionClassName ?? ''}`}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
