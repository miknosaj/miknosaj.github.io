import clsx from 'clsx';
import type { PropsWithChildren } from 'react';
import { getDimmedClasses, getDimmedCursor } from '../utils/dimming';

interface DimmedSectionProps {
  dimmed: boolean;
  className?: string;
}

export function DimmedSection({ dimmed, className, children }: PropsWithChildren<DimmedSectionProps>) {
  return (
    <div
      className={clsx('transition-all duration-300 overflow-visible', className, getDimmedClasses(dimmed))}
      style={{ cursor: getDimmedCursor(dimmed) }}
    >
      {children}
    </div>
  );
}
