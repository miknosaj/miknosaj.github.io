import { portfolioContent } from './content';
import type {
  BioSection,
  ContentNode,
  NestedContentNode,
  PortfolioContent,
  SideProjectItem,
  InteractiveContent,
} from './types';

export const getPortfolioContent = (): PortfolioContent => portfolioContent;
export const getBioSections = (): BioSection[] => portfolioContent.bio;

const serializeContentNode = (content: ContentNode): InteractiveContent =>
  content.type === 'gallery'
    ? { type: 'gallery', galleryId: content.galleryId }
    : { type: 'richText', segments: content.segments };


export type ContentLevels = Record<number, Record<string, InteractiveContent>>;

const flattenNestedContent = (
  nodes: NestedContentNode[] | undefined,
  depth: number,
  accumulator: ContentLevels,
): void => {
  if (!nodes) return;

  nodes.forEach((node) => {
    const serialized = serializeContentNode(node.content);
    if (!accumulator[depth]) accumulator[depth] = {};
    accumulator[depth][node.id] = serialized;

    flattenNestedContent(node.children, depth + 1, accumulator);
  });
};

export const getContentLevels = (): ContentLevels => {
  const levels: ContentLevels = {};

  portfolioContent.bio.forEach((section) => {
    const serialized = serializeContentNode(section.content);
    if (!levels[0]) levels[0] = {};
    levels[0][section.id] = serialized;

    flattenNestedContent(section.children, 1, levels);
  });

  return levels;
};

// Deprecated map API removed; use getContentLevels() instead for typed content.

export const getHyperlinkUrls = (): Record<string, string> => {
  const linkUrls = Object.values(portfolioContent.links).reduce<Record<string, string>>(
    (acc, link) => ((acc[link.id] = link.url), acc),
    {},
  );

  return portfolioContent.contact.items.reduce<Record<string, string>>(
    (acc, item) => ((acc[item.id] = item.url), acc),
    linkUrls,
  );
};

export const getSideProjects = (): SideProjectItem[] =>
  portfolioContent.sideProjects.items;

export const getWorkHistory = () => portfolioContent.workHistory;

export const getAwards = () => portfolioContent.awards;

export const getContactSection = () => portfolioContent.contact;

export const getPortfolioLinks = () => portfolioContent.links;
