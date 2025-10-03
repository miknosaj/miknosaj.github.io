import { useEffect, type ReactNode } from 'react';
import { BackArrowIcon } from '@/shared/icons/BackArrowIcon';
import { PageTransition } from '@/shared/ui/layout/PageTransition';

interface ContentPageProps {
  title: string;
  subtitle?: string;
  description?: string;
  slug: string;
  onNavigateToIndex: () => void;
  children?: ReactNode;
}

type HeadElementConfig = {
  selector: string;
  attributes: Record<string, string>;
  value?: string;
};

function updateHeadElements(
  configs: HeadElementConfig[],
  createElement: () => HTMLElement,
  valueAttribute: string,
): Array<() => void> {
  return configs.map(({ selector, attributes, value }) => {
    if (value === undefined) {
      return () => {};
    }

    let element = document.head.querySelector<HTMLElement>(selector);
    const created = !element;

    if (!element) {
      element = createElement();
      Object.entries(attributes).forEach(([attrName, attrValue]) => {
        element?.setAttribute(attrName, attrValue);
      });
      document.head.appendChild(element);
    }

    const previousValue = element.getAttribute(valueAttribute);
    element.setAttribute(valueAttribute, value);

    return () => {
      if (!element) {
        return;
      }

      if (created) {
        document.head.removeChild(element);
      } else if (previousValue !== null) {
        element.setAttribute(valueAttribute, previousValue);
      } else {
        element.removeAttribute(valueAttribute);
      }
    };
  });
}

function useContentPageHead(title: string, description: string | undefined, slug: string) {
  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    const siteName = 'Jason Kim';
    const previousTitle = document.title;
    const resolvedTitle = title ? `${title} | ${siteName}` : siteName;

    document.title = resolvedTitle;

    let canonicalUrl: string | undefined;
    if (typeof window !== 'undefined' && window.location) {
      const { origin, pathname } = window.location;
      if (origin) {
        canonicalUrl = `${origin}${pathname}`;
      }
    }

    if (!canonicalUrl && slug) {
      canonicalUrl = `/${slug}`;
    }

    const robotsValue = 'index, follow';

    const metaCleanups = updateHeadElements(
      [
        {
          selector: 'meta[name="description"]',
          attributes: { name: 'description' },
          value: description,
        },
        {
          selector: 'meta[property="og:title"]',
          attributes: { property: 'og:title' },
          value: resolvedTitle,
        },
        {
          selector: 'meta[property="og:description"]',
          attributes: { property: 'og:description' },
          value: description,
        },
        {
          selector: 'meta[property="og:url"]',
          attributes: { property: 'og:url' },
          value: canonicalUrl,
        },
        {
          selector: 'meta[name="twitter:title"]',
          attributes: { name: 'twitter:title' },
          value: resolvedTitle,
        },
        {
          selector: 'meta[name="twitter:description"]',
          attributes: { name: 'twitter:description' },
          value: description,
        },
        {
          selector: 'meta[name="twitter:url"]',
          attributes: { name: 'twitter:url' },
          value: canonicalUrl,
        },
        {
          selector: 'meta[name="robots"]',
          attributes: { name: 'robots' },
          value: robotsValue,
        },
      ],
      () => document.createElement('meta'),
      'content',
    );

    const linkCleanups = updateHeadElements(
      [
        {
          selector: 'link[rel="canonical"]',
          attributes: { rel: 'canonical' },
          value: canonicalUrl,
        },
      ],
      () => document.createElement('link'),
      'href',
    );

    return () => {
      document.title = previousTitle;
      [...metaCleanups, ...linkCleanups].forEach((cleanup) => cleanup());
    };
  }, [title, description, slug]);
}

export function ContentPage({ title, subtitle, description, slug, onNavigateToIndex, children }: ContentPageProps) {
  useContentPageHead(title, description, slug);

  return (
    <PageTransition>
      <div className="flex flex-col w-full overflow-visible content-page-container">
      <div className="w-full mb-8 overflow-visible">
        <button
          onClick={onNavigateToIndex}
          className="portfolio-link content-page-back-button cursor-pointer transition-colors duration-300 focus-ring rounded-sm"
          style={{
            fontSize: 'var(--portfolio-font-size)',
            lineHeight: 'var(--portfolio-line-height)',
            fontFamily: 'var(--portfolio-font-family)',
          }}
        >
          <span className="content-page-back-button__icon" aria-hidden="true">
            <BackArrowIcon />
          </span>
          <span>Index</span>
        </button>
      </div>

      <div className="w-full overflow-visible">
        <div className="flex flex-col gap-6 overflow-visible">
          <div className="flex flex-col gap-1 overflow-visible">
            <h1 className="portfolio-text halbfett" tabIndex={-1}>{title}</h1>
            {subtitle && (
              <p className="portfolio-text--muted">{`${subtitle}, ${new Date().getFullYear()}`}</p>
            )}
          </div>

          {children}
        </div>
      </div>
      </div>
    </PageTransition>
  );
}
