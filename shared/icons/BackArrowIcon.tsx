interface BackArrowIconProps {
  className?: string;
}

export function BackArrowIcon({ className = '' }: BackArrowIconProps) {
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
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </svg>
  );
}
