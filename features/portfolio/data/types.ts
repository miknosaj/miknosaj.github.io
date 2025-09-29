export type SentenceSegment =
  | { type: 'text'; text: string }
  | { type: 'trigger'; triggerId: string; text: string }
  | { type: 'link'; linkId: string; text: string };

export type RichTextSegment = SentenceSegment;

export type ContentNode =
  | { type: 'richText'; segments: RichTextSegment[] }
  | { type: 'gallery'; galleryId: string };

export interface NestedContentNode {
  id: string;
  triggerLabel: string;
  content: ContentNode;
  children?: NestedContentNode[];
}

export interface BioSection {
  id: string;
  sentence: SentenceSegment[];
  content: ContentNode;
  children?: NestedContentNode[];
}

export interface PortfolioLink {
  id: string;
  text: string;
  url: string;
}

export interface WorkHistoryItem {
  company: string;
  role: string;
  period: string;
}

export interface WorkHistorySection {
  sectionTitle: string;
  items: WorkHistoryItem[];
}

export interface AwardItem {
  title: string;
  year: string;
}

export interface AwardsSection {
  sectionTitle: string;
  items: AwardItem[];
}

export interface SideProjectItem {
  key: string;
  label: string;
  isClickable: boolean;
  status?: 'wip' | 'published';
}

export interface SideProjectsSection {
  sectionTitle: string;
  items: SideProjectItem[];
}

export interface ContactItem {
  platform: string;
  handle: string;
  id: string;
  url: string;
}

export interface ContactSection {
  sectionTitle: string;
  items: ContactItem[];
}

export interface PortfolioProfile {
  name: string;
  title: string;
  tagline: string;
}

export interface PortfolioContent {
  profile: PortfolioProfile;
  links: Record<string, PortfolioLink>;
  bio: BioSection[];
  workHistory: WorkHistorySection;
  awards: AwardsSection;
  sideProjects: SideProjectsSection;
  contact: ContactSection;
}

// Typed interactive content used by the UI pipeline
export type InteractiveContent =
  | { type: 'richText'; segments: RichTextSegment[] }
  | { type: 'gallery'; galleryId: string };
