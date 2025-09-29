interface PhotoCardProps {
  src: string;
  alt: string;
  borderWidth?: number;
}

export function PhotoCard({ src, alt, borderWidth = 8 }: PhotoCardProps) {
  return (
    <div className="relative w-full h-full" style={{ transformOrigin: '50% 50%' }}>
      <div
        className="absolute inset-0 bg-white shadow-[0px_2px_8px_0px_rgba(0,0,0,0.15)]"
        style={{ padding: borderWidth }}
      >
        <div className="relative w-full h-full overflow-hidden">
          <img
            src={src}
            alt={alt}
            className="absolute left-0 top-0 w-full h-full object-cover select-none"
            style={{ objectPosition: 'center', userSelect: 'none' as const }}
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
