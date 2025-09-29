interface ExternalLinkIconProps {
  className?: string;
}

export function ExternalLinkIcon({ className = 'inline-block align-middle ml-0.5 relative -top-px' }: ExternalLinkIconProps) {
  return (
    <svg
      width="14"
      height="14"
      className={className}
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        d="M6.16667 3.16667H4.5C3.76362 3.16667 3.16667 3.76362 3.16667 4.5V11.5C3.16667 12.2364 3.76362 12.8333 4.5 12.8333H11.5C12.2364 12.8333 12.8333 12.2364 12.8333 11.5V9.83333"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
      />
      <path
        d="M12.8333 6.16667V3.16667H9.83333"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
      />
      <path
        d="M12.6667 3.33333L7.83333 8.16667"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
      />
    </svg>
  );
}
