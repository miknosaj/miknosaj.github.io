import { InlineMediaFrame } from './InlineMedia';

interface InlineVideoProps {
  src: string;
  caption?: string;
}

export function InlineVideo({ src, caption }: InlineVideoProps) {
  return (
    <InlineMediaFrame caption={caption}>
      <video
        src={src}
        className="w-full h-auto object-cover"
        style={{ objectPosition: 'center' }}
        preload="metadata"
        autoPlay
        loop
        muted
        playsInline
      />
    </InlineMediaFrame>
  );
}
