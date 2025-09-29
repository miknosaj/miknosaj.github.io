import { useMemo, type MouseEvent } from 'react';
import { ArrowRightIcon } from '@/shared/icons/ArrowRightIcon';
import { getPageConfig } from '@/features/content/data/page-registry';
import { SectionList } from './SectionList';
import type { SideProjectsSectionProps } from './types';

export function SideProjectsSection({ disabled, items, onNavigateToPage, title }: SideProjectsSectionProps) {
  const pageConfigByKey = useMemo(() => {
    const map: Record<string, ReturnType<typeof getPageConfig> | null> = {};
    for (const item of items) {
      map[item.key] = getPageConfig(item.key);
    }
    return map;
  }, [items]);

  return (
    <SectionList
      title={title}
      items={items}
      disabled={disabled}
      headerInnerClassName="portfolio-text portfolio-text--muted w-[100px]"
      headerTitleClassName="whitespace-nowrap"
      leftClassName="flex-1 portfolio-text pr-14 md:pr-16 relative overflow-visible z-10"
      rightClassName="portfolio-text portfolio-text--muted text-right w-[100px] z-0"
      renderLeft={(item, { disabled: isDisabled }) => {
        const pageConfig = pageConfigByKey[item.key] || null;
        const itemTitle = item.label || pageConfig?.title || item.key;
        const isWip = item.status === 'wip';

        if (!item.isClickable) {
          return (
            <p className={isWip ? 'line-through' : ''} style={isWip ? { color: '#9c9c9b' } : {}}>
              {itemTitle}
            </p>
          );
        }

        return (
          <p>
            <a
              href={`/${item.key}`}
              className={`portfolio-link cursor-pointer group relative inline-flex items-center overflow-visible focus-ring rounded-sm z-10 ${
                isDisabled ? 'portfolio-link--disabled' : ''
              } ${isWip ? 'line-through' : ''}`}
              style={isWip ? { color: '#9c9c9b' } : {}}
              onClick={(event: MouseEvent) => {
                if (isDisabled) {
                  event.preventDefault();
                  return;
                }
                event.preventDefault();
                event.stopPropagation();
                onNavigateToPage(item.key);
              }}
              aria-disabled={isDisabled || undefined}
            >
              {itemTitle}
              {!isWip && (
                <ArrowRightIcon
                  className={`ml-1 transition-transform duration-300 ease-out ${
                    isDisabled ? 'opacity-60' : 'opacity-100 group-hover:translate-x-0.5'
                  }`}
                />
              )}
            </a>
          </p>
        );
      }}
      renderRight={(item) => {
        const pageConfig = pageConfigByKey[item.key] || null;
        const meta = item.status === 'wip' ? 'WIP' : pageConfig?.subtitle || pageConfig?.type || '';
        return <p>{meta}</p>;
      }}
    />
  );
}
