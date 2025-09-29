import { motion } from 'framer-motion';
import { getGallery, type Gallery, type GalleryImage } from '@/shared/data/gallery/registry';

interface ModularGalleryProps {
  galleryId: string;
  disableAnimations?: boolean;
}

interface AnimatedImageProps {
  image: GalleryImage;
  index: number;
  gallery: Gallery;
  disableAnimations?: boolean;
}

function AnimatedImage({ image, index, gallery, disableAnimations }: AnimatedImageProps) {
  const defaultAnimations = { stagger: 0.2, duration: 0.6, ease: 'easeOut' } as const;
  const animations = gallery.animations ?? defaultAnimations;
  const delay = index * animations.stagger;

  const finalState = {
    opacity: 1,
    scale: (image.position?.scale ?? 1) * 1.1,
    rotate: image.position?.rotation ?? 0,
  };

  const initialState = disableAnimations
    ? finalState
    : {
        opacity: 0,
        scale: 1.1,
        rotate: (image.position?.rotation ?? 0) - 5,
      };

  const transition = disableAnimations
    ? { duration: 0 }
    : { duration: animations.duration, delay, ease: animations.ease };

  const commonStyle = {
    isolation: 'isolate' as const,
    filter: 'none',
    zIndex: 5,
  };

  if (gallery.layout !== 'fan') {
    return null;
  }

  const imageSize = image.styling?.size ?? '107px';
  const imageStyle = { width: imageSize, height: imageSize };

  return (
    <motion.div
      initial={initialState}
      animate={finalState}
      transition={transition}
      className="absolute"
      style={{
        ...commonStyle,
        ...imageStyle,
        left: `${image.position?.x ?? 0}px`,
        top: `${image.position?.y ?? 0}px`,
        position: 'absolute',
      }}
    >
      <div className="modular-gallery-image overflow-hidden relative bg-[#f5f5f5]" style={imageStyle}>
        <img
          src={image.src}
          alt={image.alt}
          className="absolute shadow-[0px_2px_8px_0px_rgba(0,0,0,0.15)] left-0 top-0 object-cover"
          style={{
            ...imageStyle,
            objectPosition: image.styling?.backgroundPosition ?? 'center',
          }}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.visibility = 'hidden';
          }}
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute border-[8px] border-solid border-white inset-[-8px] pointer-events-none shadow-[0px_2px_8px_0px_rgba(0,0,0,0.15)]"
      />
    </motion.div>
  );
}

function FanLayout({ gallery, disableAnimations }: { gallery: Gallery; disableAnimations?: boolean }) {
  return (
    <div
      className="modular-gallery-container relative w-full pt-2"
      style={{
        height: `${gallery.height}px`,
        isolation: 'isolate',
        filter: 'none',
        position: 'relative',
        zIndex: 10,
      }}
    >
      {gallery.images.map((image, index) => (
        <AnimatedImage
          key={`${image.src}-${index}`}
          image={image}
          index={index}
          gallery={gallery}
          disableAnimations={disableAnimations}
        />
      ))}
    </div>
  );
}

export function ModularGallery({ galleryId, disableAnimations }: ModularGalleryProps) {
  const gallery = getGallery(galleryId);

  if (!gallery) {
    return null;
  }

  return <FanLayout gallery={gallery} disableAnimations={disableAnimations} />;
}
