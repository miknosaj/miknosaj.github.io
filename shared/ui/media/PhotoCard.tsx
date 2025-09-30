interface PhotoCardProps {
  src: string;
  alt: string;
  borderWidth?: number;
}

export function PhotoCard({ src, alt, borderWidth = 8 }: PhotoCardProps) {
  return (
    <div className="relative w-full h-full" style={{ transformOrigin: '50% 50%' }}>
      <div className="absolute inset-0 overflow-hidden bg-white shadow-[0px_2px_8px_0px_rgba(0,0,0,0.15)]">
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
          className="pointer-events-none absolute border-solid border-white shadow-[0px_2px_8px_0px_rgba(0,0,0,0.15)]"
          style={{
            borderWidth: `${borderWidth}px`,
            inset: `-${borderWidth}px`
          }}
        />
      </div>
    </div>
  );
}
