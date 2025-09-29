import type { ComponentType } from 'react';
import type { PageConfig } from '../data/page-registry';
import { ContentPage } from './ContentPage';

export interface WithContentPageProps {
  onNavigateToIndex: () => void;
  pageConfig: PageConfig;
}

export function withContentPage<P extends WithContentPageProps>(Inner: ComponentType<P>) {
  return function Wrapped(props: P) {
    const { pageConfig, onNavigateToIndex } = props;
    return (
      <ContentPage
        title={pageConfig.title}
        subtitle={pageConfig.subtitle}
        description={pageConfig.description}
        slug={pageConfig.slug}
        onNavigateToIndex={onNavigateToIndex}
      >
        <Inner {...props} />
      </ContentPage>
    );
  };
}
