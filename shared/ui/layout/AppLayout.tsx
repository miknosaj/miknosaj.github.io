import type { PropsWithChildren } from 'react';
import { ImagePreloader } from '@/shared/ui/media/ImagePreloader';

interface AppLayoutProps {
  isIndexPage: boolean;
  hasActiveTrigger: boolean;
  onGlobalClick?: () => void;
  fullWidth?: boolean;
}

export function AppLayout({
  isIndexPage,
  hasActiveTrigger,
  onGlobalClick,
  fullWidth = false,
  children,
}: PropsWithChildren<AppLayoutProps>) {
  const shouldDimBackground = isIndexPage && hasActiveTrigger;

  const containerClassName = `min-h-screen flex overflow-visible ${
    fullWidth ? 'justify-start' : 'justify-center'
  } ${isIndexPage ? 'transition-all duration-300' : ''} ${
    shouldDimBackground ? 'cursor-pointer portfolio-background-active' : ''
  }`;

  return (
    <div className={containerClassName} onClick={isIndexPage ? onGlobalClick : undefined}>
      <ImagePreloader />
      {/* Skip link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:text-black focus:px-3 focus:py-2 focus:rounded focus:shadow"
      >
        Skip to content
      </a>

      <main
        id="main-content"
        tabIndex={-1}
        className={`portfolio-container overflow-visible ${
          fullWidth ? 'portfolio-container--full' : ''
        }`}
        style={fullWidth ? { width: '100%' } : undefined}
      >
        {children}
      </main>
    </div>
  );
}
