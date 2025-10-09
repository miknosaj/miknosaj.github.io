export type PageType = 'photography' | 'writing';

export interface PageConfig {
  id: string;
  slug: string;
  type: PageType;
  title: string;
  subtitle?: string;
  description?: string;
  componentPath: string;
  fullWidth?: boolean;
}

export const pageRegistry = {
  'local-minima': {
    id: 'local-minima',
    slug: 'local-minima',
    type: 'photography',
    title: 'Local Minima',
    subtitle: 'Photography',
    description: 'Photographic study of subtle dips in mood and light, part of an ongoing series.',
    componentPath: '../pages/photography/LocalMinimaPage.tsx',
  },
  'modernism-photography': {
    id: 'modernism-photography',
    slug: 'modernism-photography',
    type: 'writing',
    title: "Photography's modernism",
    subtitle: 'Writing',
    description: 'Work-in-progress essay tracing how modernist thinking reshaped photographic practice and perception.',
    componentPath: '../pages/writing/ModernismPhotographyPage.tsx',
  },
  'productivity-ai': {
    id: 'productivity-ai',
    slug: 'productivity-ai',
    type: 'writing',
    title: 'Productivity in the age of AI',
    subtitle: 'Writing',
    description: 'Reflective essay on productivity rituals, creative focus, and the role of AI in meaningful work.',
    componentPath: '../pages/writing/ProductivityAIPage.tsx',
  },
} as const satisfies Record<string, PageConfig>;

export type PageSlug = keyof typeof pageRegistry;

export const getPageConfig = (slug: string): PageConfig | null => pageRegistry[slug as PageSlug] ?? null;

export const getPagesByType = (type: PageType): PageConfig[] =>
  Object.values(pageRegistry).filter((page) => page.type === type);
