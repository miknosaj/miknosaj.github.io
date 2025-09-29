import { lazy, Suspense, type ComponentType } from 'react';
import { ErrorPage } from '@/shared/ui/feedback/ErrorPage';
import { getPageConfig } from '../data/page-registry';

type PageModule = { default: ComponentType<any> };

const pageModules = import.meta.glob<PageModule>('../pages/**/*.tsx');

const loadComponent = (componentPath: string) => {
  const loader = pageModules[componentPath];
  if (!loader) {
    return null;
  }

  return lazy(loader);
};

interface PageFactoryProps {
  slug: string;
  onNavigateToIndex: () => void;
}

export function PageFactory({ slug, onNavigateToIndex }: PageFactoryProps) {
  const pageConfig = getPageConfig(slug);

  if (!pageConfig) {
    return <ErrorPage message="Page not found" onNavigateToIndex={onNavigateToIndex} />;
  }

  const ComponentLoader = loadComponent(pageConfig.componentPath);

  if (!ComponentLoader) {
    return (
      <ErrorPage
        message={`Component not found: ${pageConfig.componentPath}`}
        onNavigateToIndex={onNavigateToIndex}
      />
    );
  }

  return (
    <Suspense
      fallback={
        <div className="portfolio-container">
          <div className="portfolio-text">Loading...</div>
        </div>
      }
    >
      <ComponentLoader onNavigateToIndex={onNavigateToIndex} pageConfig={pageConfig} />
    </Suspense>
  );
}
