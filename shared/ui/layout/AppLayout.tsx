import type { PropsWithChildren } from 'react';
import { ImagePreloader } from '@/shared/ui/media/ImagePreloader';

interface AppLayoutProps {
  isIndexPage: boolean;
  hasActiveTrigger: boolean;
  onGlobalClick?: () => void;
}

export function AppLayout({
  isIndexPage,
  hasActiveTrigger,
  onGlobalClick,
  children,
}: PropsWithChildren<AppLayoutProps>) {
  const shouldDimBackground = isIndexPage && hasActiveTrigger;

  return (
    <div
      className={`min-h-screen flex justify-center overflow-visible ${
        isIndexPage ? 'transition-all duration-300' : ''
      } ${shouldDimBackground ? 'cursor-pointer portfolio-background-active' : ''}`}
      onClick={isIndexPage ? onGlobalClick : undefined}
    >
      <ImagePreloader />
      {/* Skip link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:text-black focus:px-3 focus:py-2 focus:rounded focus:shadow"
      >
        Skip to content
      </a>

      <main id="main-content" tabIndex={-1} className="portfolio-container overflow-visible">
        {children}
      </main>
    </div>
  );
}
