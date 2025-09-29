import { useEffect, useRef } from 'react';
import { InlineMediaFrame } from './InlineMedia';

interface InlineVideoProps {
  src: string;
  caption?: string;
}

export function InlineVideo({ src, caption }: InlineVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.controls = false;
    video.muted = true;

    const attemptPlayback = async () => {
      try {
        await video.play();
        video.controls = false;
      } catch (error) {
        video.controls = true;
      }
    };

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      void attemptPlayback();
      return;
    }

    const handleCanPlay = () => {
      void attemptPlayback();
    };

    video.addEventListener('canplay', handleCanPlay, { once: true });
    return () => {
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [src]);

  return (
    <InlineMediaFrame caption={caption}>
      <video
        ref={videoRef}
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
