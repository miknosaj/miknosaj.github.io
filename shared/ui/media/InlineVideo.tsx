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

    // Ensure the right attributes are present before playback attempts (important for iOS Safari)
    video.setAttribute('playsinline', 'true');
    video.setAttribute('muted', 'true');
    video.muted = true;
    video.autoplay = true;
    video.controls = false;

    const attemptPlayback = async () => {
      try {
        await video.play();
        video.controls = false;
      } catch (error) {
        video.controls = true;
      }
    };

    if (video.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
      void attemptPlayback();
      return;
    }

    const handleLoadedData = () => {
      void attemptPlayback();
    };

    video.addEventListener('loadeddata', handleLoadedData, { once: true });
    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [src]);

  return (
    <InlineMediaFrame caption={caption}>
      <video
        ref={videoRef}
        src={src}
        className="w-full h-auto object-cover"
        style={{ objectPosition: 'center' }}
        preload="auto"
        autoPlay
        loop
        muted
        playsInline
        controls={false}
        controlsList="nodownload noremoteplayback"
      />
    </InlineMediaFrame>
  );
}
