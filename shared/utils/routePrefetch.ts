import { getPageConfig } from '@/features/content/data/page-registry';

const prefetchedPages = new Set<string>();

export async function prefetchRoute(slug: string): Promise<void> {
  if (prefetchedPages.has(slug)) {
    return;
  }

  const pageConfig = getPageConfig(slug);
  if (!pageConfig) {
    return;
  }

  prefetchedPages.add(slug);

  try {
    // Prefetch the page component
    const componentPath = pageConfig.componentPath;

    // Use dynamic import to prefetch (this leverages Vite's code splitting)
    // The import will be cached by the browser
    if (componentPath.includes('LocalMinimaPage')) {
      await import('@/features/content/pages/photography/LocalMinimaPage');
    } else if (componentPath.includes('ModernismPhotographyPage')) {
      await import('@/features/content/pages/writing/ModernismPhotographyPage');
    } else if (componentPath.includes('ProductivityAIPage')) {
      await import('@/features/content/pages/writing/ProductivityAIPage');
    }
  } catch (error) {
    console.error('Failed to prefetch route:', slug, error);
    prefetchedPages.delete(slug);
  }
}

export function clearPrefetchCache(): void {
  prefetchedPages.clear();
}