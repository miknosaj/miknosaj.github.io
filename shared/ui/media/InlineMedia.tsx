import type { ReactNode } from 'react';

type PhotoOrientation = 'portrait' | 'landscape';

interface InlineMediaFrameProps {
  pageType?: 'photography' | 'writing';
  orientation?: PhotoOrientation;
  caption?: string;
  children: ReactNode;
}

export function InlineMediaFrame({ pageType = 'writing', orientation, caption, children }: InlineMediaFrameProps) {
  const getWidthClasses = () => {
    if (pageType === 'photography') {
      if (orientation === 'landscape') {
        return 'w-full md:w-[120%] md:-ml-[10%]';
      }
      return 'w-full md:w-[95%] md:-ml-[2.5%]';
    }
    return 'w-full md:w-[115%] md:-ml-[7.5%]';
  };

  return (
    <figure className={`mt-10 mb-6 inline-image-container ${getWidthClasses()}`}>
      <div className="relative w-full overflow-hidden shadow-[0px_2px_8px_0px_rgba(0,0,0,0.15)]">
        {children}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute border-[8px] border-solid border-white inset-[-8px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.15)]"
        />
      </div>
      {caption && (
        <figcaption className="mt-8 text-sm text-[#9c9c9b] leading-relaxed text-center">{caption}</figcaption>
      )}
    </figure>
  );
}

