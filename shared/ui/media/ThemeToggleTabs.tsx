import { motion } from 'framer-motion';

interface ThemeToggleTabsProps {
  isDark: boolean;
  onToggle: (isDark: boolean) => void;
}

export function ThemeToggleTabs({ isDark, onToggle }: ThemeToggleTabsProps) {
  return (
    <div className="flex justify-center my-8">
      <div
        className="relative inline-flex gap-1 p-1 rounded-lg border"
        style={{
          borderColor: 'var(--portfolio-border)',
          backgroundColor: isDark ? '#000' : '#fff',
          transition: 'background-color 700ms cubic-bezier(0.4, 0, 0.2, 1), border-color 700ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <button
          onClick={() => onToggle(false)}
          className="relative z-10 px-4 py-2 text-sm font-medium rounded-md"
          style={{
            color: !isDark ? 'var(--portfolio-text)' : 'var(--portfolio-muted)',
            transition: 'color 700ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          Light
        </button>
        <button
          onClick={() => onToggle(true)}
          className="relative z-10 px-4 py-2 text-sm font-medium rounded-md"
          style={{
            color: isDark ? 'var(--portfolio-text)' : 'var(--portfolio-muted)',
            transition: 'color 700ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          Dark
        </button>
        <motion.div
          className="absolute z-0 rounded-md"
          animate={{
            x: isDark ? 'calc(100% + 4px)' : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 35,
            mass: 0.8,
          }}
          style={{
            backgroundColor: 'var(--portfolio-border)',
            width: 'calc(50% - 4px)',
            height: 'calc(100% - 8px)',
            top: '4px',
            left: '4px',
          }}
        />
      </div>
    </div>
  );
}
