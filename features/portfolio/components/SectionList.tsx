import type { ReactNode } from 'react';

interface SectionListProps<T> {
  title: string;
  items: T[];
  disabled?: boolean;
  renderLeft: (item: T, opts: { disabled: boolean }) => ReactNode;
  renderRight?: (item: T) => ReactNode;
  leftClassName?: string;
  rightClassName?: string;
  headerInnerClassName?: string;
  headerTitleClassName?: string;
}

export function SectionList<T>({
  title,
  items,
  disabled = false,
  renderLeft,
  renderRight,
  leftClassName = 'flex-1 portfolio-text',
  rightClassName = 'portfolio-text portfolio-text--muted text-right',
  headerInnerClassName = 'flex-1 portfolio-text portfolio-text--muted',
  headerTitleClassName = '',
}: SectionListProps<T>) {
  if (!items.length) return null;

  return (
    <div className="flex flex-col w-full overflow-visible">
      <div
        className="flex gap-2.5 items-start justify-start py-2 relative w-full border-b overflow-visible"
        style={{ borderColor: 'var(--portfolio-border)' }}
      >
        <div className={headerInnerClassName}>
          <p className={headerTitleClassName}>{title}</p>
        </div>
      </div>

      {items.map((item, idx) => (
        <div
          key={idx}
          className="flex gap-2.5 items-start justify-between py-2 relative w-full border-b overflow-visible"
          style={{ borderColor: 'var(--portfolio-border)' }}
        >
          <div className={leftClassName}>{renderLeft(item, { disabled })}</div>
          {renderRight && <div className={rightClassName}>{renderRight(item)}</div>}
        </div>
      ))}
    </div>
  );
}

