export interface ImageDimensions {
  width: number;
  height: number;
  aspectRatio: number;
}

class ImageDimensionsCache {
  private cache: Map<string, ImageDimensions> = new Map();
  private loadingPromises: Map<string, Promise<ImageDimensions | null>> = new Map();

  async getDimensions(src: string): Promise<ImageDimensions | null> {
    // Check cache first
    if (this.cache.has(src)) {
      return this.cache.get(src)!;
    }

    // Check if already loading
    if (this.loadingPromises.has(src)) {
      return this.loadingPromises.get(src)!;
    }

    // Load image dimensions
    const promise = this.loadImageDimensions(src);
    this.loadingPromises.set(src, promise);

    const dimensions = await promise;
    this.loadingPromises.delete(src);

    return dimensions;
  }

  private loadImageDimensions(src: string): Promise<ImageDimensions | null> {
    return new Promise((resolve) => {
      const image = new Image();
      image.onload = () => {
        const dimensions: ImageDimensions = {
          width: image.naturalWidth,
          height: image.naturalHeight,
          aspectRatio: image.naturalWidth / image.naturalHeight,
        };
        this.cache.set(src, dimensions);
        resolve(dimensions);
      };
      image.onerror = () => resolve(null);
      image.src = src;
    });
  }

  async preloadImages(sources: string[]): Promise<void> {
    await Promise.all(sources.map((src) => this.getDimensions(src)));
  }

  getCached(src: string): ImageDimensions | null {
    return this.cache.get(src) ?? null;
  }

  clear(): void {
    this.cache.clear();
    this.loadingPromises.clear();
  }
}

export const imageDimensionsCache = new ImageDimensionsCache();