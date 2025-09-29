import { useEffect, useState, type CSSProperties, type ImgHTMLAttributes } from 'react';
import clsx from 'clsx';

type ProgressiveImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'loading'> & {
  priority?: boolean;
  aspectRatio?: string;
  containerClassName?: string;
  containerStyle?: CSSProperties;
  placeholderClassName?: string;
};

export function ProgressiveImage({
  src,
  alt,
  priority = false,
  aspectRatio,
  containerClassName,
  containerStyle,
  placeholderClassName,
  className,
  style,
  onLoad,
  onError,
  ...rest
}: ProgressiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  const handleLoad: ImgHTMLAttributes<HTMLImageElement>['onLoad'] = (event) => {
    setIsLoaded(true);
    onLoad?.(event);
  };

  const handleError: ImgHTMLAttributes<HTMLImageElement>['onError'] = (event) => {
    setHasError(true);
    onError?.(event);
  };

  const ratioStyle: CSSProperties | undefined = aspectRatio ? { aspectRatio } : undefined;

  return (
    <div
      className={clsx(
        'relative w-full overflow-hidden bg-[#f5f5f5]',
        hasError && 'bg-[#e3e3e3]',
        containerClassName,
      )}
      style={{ ...ratioStyle, ...containerStyle }}
    >
      <img
        {...rest}
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={clsx(
          'w-full h-full object-cover transition-opacity duration-500 ease-out',
          isLoaded && !hasError ? 'opacity-100' : 'opacity-0',
          hasError && 'invisible',
          className,
        )}
        style={style}
        onLoad={handleLoad}
        onError={handleError}
      />

      <div
        aria-hidden="true"
        className={clsx(
          'pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out',
          'bg-gradient-to-br from-[#ececec] via-[#f7f7f7] to-[#e7e7e7] motion-safe:animate-pulse',
          isLoaded && !hasError ? 'opacity-0' : 'opacity-100',
          placeholderClassName,
        )}
      />

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center text-xs text-[#6a6a6a]">
          <span>Image unavailable</span>
        </div>
      )}
    </div>
  );
}
