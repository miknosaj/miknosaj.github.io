interface ArrowRightIconProps {
  className?: string;
}

export function ArrowRightIcon({ className = '' }: ArrowRightIconProps) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`inline-block align-middle ${className}`.trim()}
      >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
