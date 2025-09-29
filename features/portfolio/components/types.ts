import type React from 'react';
import type { InteractiveContent } from '../data/types';
import type {
  AwardsSection,
  BioSection,
  ContactSection,
  PortfolioProfile,
  SideProjectItem,
  SideProjectsSection,
  WorkHistorySection,
} from '../data/types';

export interface PortfolioInteractionState {
  activeByLevel: (string | null)[];
  hasAnyActiveTrigger: boolean;
}

export interface PortfolioInteractionHandlers {
  handleToggleLevel: (level: number, key: string, event?: React.MouseEvent) => void;
  handleGlobalClick: () => void;
}

export interface PortfolioContentLevels {
  contentLevels: Record<number, Record<string, InteractiveContent>>;
}

export interface PortfolioProps extends PortfolioInteractionState, PortfolioInteractionHandlers, PortfolioContentLevels {
  profile: PortfolioProfile;
  bioSections: BioSection[];
  workHistory: WorkHistorySection;
  awards: AwardsSection;
  sideProjects: SideProjectsSection;
  contact: ContactSection;
  onNavigateToPage?: (slug: string) => void;
  hyperlinkUrls: Record<string, string>;
}

type BioSectionHandlers = Pick<PortfolioInteractionHandlers, 'handleToggleLevel'>;

type BioSectionState = Omit<PortfolioInteractionState, 'hasAnyActiveTrigger'>;

export interface BioSectionProps extends BioSectionState, BioSectionHandlers, PortfolioContentLevels {
  sections: BioSection[];
  hyperlinkUrls: Record<string, string>;
}

export interface ProfessionalHistoryProps {
  section: WorkHistorySection;
}

export interface AwardsSectionProps {
  section: AwardsSection;
}

export interface SideProjectsSectionProps {
  disabled: boolean;
  title: string;
  items: SideProjectItem[];
  onNavigateToPage: (page: string) => void;
}

export interface ContactSectionProps {
  disabled: boolean;
  section: ContactSection;
}
