interface PhotoCardProps {
  src: string;
  alt: string;
  borderWidth?: number;
}

export function PhotoCard({ src, alt, borderWidth = 8 }: PhotoCardProps) {
  const borderThickness = `var(--stack-border-thickness, ${borderWidth}px)`;
  return (
    <div className="relative w-full h-full" style={{ transformOrigin: '50% 50%' }}>
      <div
        className="absolute inset-0 overflow-hidden bg-white transition-shadow duration-300 ease-out shadow-[0px_6px_18px_0px_rgba(0,0,0,0.22)] group-hover:shadow-[0px_3px_12px_0px_rgba(0,0,0,0.16)]"
      >
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-contain select-none"
          style={{
            objectPosition: 'center',
            userSelect: 'none' as const
          }}
          draggable={false}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute border-solid border-white transition-shadow duration-300 ease-out shadow-[0px_4px_12px_0px_rgba(0,0,0,0.18)] group-hover:shadow-[0px_2px_8px_0px_rgba(0,0,0,0.12)]"
          style={{
            borderWidth: borderThickness,
            inset: `calc(-1 * ${borderThickness})`
          }}
        />
      </div>
    </div>
  );
}
