export type PhotoOrientation = 'portrait' | 'landscape';

const localMinimaImageModules = import.meta.glob<string>(
  '../../../assets/content/local-minima/*.webp',
  { eager: true, import: 'default' },
);

const getAltText = (filePath: string, index: number) => {
  const fileName = filePath.split('/').pop() ?? `image-${index + 1}`;
  const baseName = fileName.replace(/\.[^/.]+$/, '').replace(/[-_]+/g, ' ').trim();
  const label = baseName ? baseName.replace(/\b\w/g, (char) => char.toUpperCase()) : `Image ${index + 1}`;
  return `Local Minima photograph — ${label}`;
};

const portraitImages = new Set<string>([
  'local-minima-2.webp',
  'local-minima-3.webp',
  'local-minima-5.webp',
  'local-minima-7.webp',
  'local-minima-8.webp',
  'local-minima-9.webp',
]);

export interface LocalMinimaImageMeta {
  src: string;
  alt: string;
  orientation: PhotoOrientation;
}

export const localMinimaImages: LocalMinimaImageMeta[] = Object.entries(localMinimaImageModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src], index) => {
    const fileName = path.split('/').pop() ?? '';
    const orientation: PhotoOrientation = portraitImages.has(fileName) ? 'portrait' : 'landscape';
    return {
      src,
      alt: getAltText(path, index),
      orientation,
    };
  });
