import galleryImage1 from '@/assets/typewriter-gallery/gallery1.webp';
import galleryImage2 from '@/assets/typewriter-gallery/gallery2.webp';
import galleryImage3 from '@/assets/typewriter-gallery/gallery3.webp';

export type GalleryImage = {
  src: string;
  alt: string;
  position?: {
    x?: number;
    y?: number;
    rotation?: number;
    scale?: number;
  };
  styling?: {
    size?: string;
    className?: string;
    backgroundPosition?: string;
    backgroundSize?: string;
  };
};

export type Gallery = {
  id: string;
  name: string;
  height: number;
  layout: 'fan';
  images: GalleryImage[];
  animations?: {
    stagger: number;
    duration: number;
    ease: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
  };
};

export const galleryRegistry: Record<string, Gallery> = {
  'gallery-1': {
    id: 'gallery-1',
    name: 'Gallery 1',
    height: 260,
    layout: 'fan',
    images: [
      {
        src: galleryImage1,
        alt: 'Gallery photo 1',
        position: { x: -8, y: 36, rotation: -18 },
        styling: {
          size: '150px',
          backgroundPosition: '43.8% 74.81%',
          backgroundSize: '104.61% 104.61%',
        },
      },
      {
        src: galleryImage2,
        alt: 'Gallery photo 2',
        position: { x: 128, y: 18 },
        styling: {
          size: '150px',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        },
      },
      {
        src: galleryImage3,
        alt: 'Gallery photo 3',
        position: { x: 260, y: 42, rotation: 18 },
        styling: {
          size: '150px',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        },
      },
    ],
    animations: {
      stagger: 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export const getGallery = (galleryId: string): Gallery | null => {
  return galleryRegistry[galleryId] ?? null;
};

export const getAvailableGalleries = (): string[] => Object.keys(galleryRegistry);

export const getGalleryHeight = (galleryId: string): number => {
  const gallery = getGallery(galleryId);
  return gallery?.height ?? 160;
};

export const getNextGalleryNumber = (): number => {
  const galleryIds = getAvailableGalleries();
  const numbers = galleryIds
    .filter((id) => id.startsWith('gallery-'))
    .map((id) => parseInt(id.replace('gallery-', ''), 10))
    .filter((num) => !Number.isNaN(num));

  return numbers.length > 0 ? Math.max(...numbers) + 1 : 1;
};
