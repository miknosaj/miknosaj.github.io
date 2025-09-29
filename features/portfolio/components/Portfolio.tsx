import { InteractiveBioSection } from './InteractiveBioSection';
import { ProfessionalHistorySection } from './ProfessionalHistorySection';
import { AwardsRecognitionSection } from './AwardsRecognitionSection';
import { SideProjectsSection } from './SideProjectsSection';
import { ContactLinksSection } from './ContactSection';
import { DimmedSection } from './DimmedSection';
import type { PortfolioProps } from './types';

export function Portfolio({
  profile,
  bioSections,
  workHistory,
  awards,
  sideProjects,
  contact,
  activeByLevel,
  hasAnyActiveTrigger,
  contentLevels,
  handleToggleLevel,
  onNavigateToPage,
  hyperlinkUrls,
}: PortfolioProps) {
  const shouldDimAuxiliary = hasAnyActiveTrigger;

  return (
    <div className="flex flex-col w-full overflow-visible">
      <DimmedSection dimmed={shouldDimAuxiliary} className="w-full">
        <div className="portfolio-text">
          <p>{profile.name}</p>
        </div>
        <div className="portfolio-text portfolio-text--muted">
          <p>{profile.title}</p>
        </div>
      </DimmedSection>

      <div className="w-full mt-6 overflow-visible">
        <InteractiveBioSection
          sections={bioSections}
          activeByLevel={activeByLevel}
          handleToggleLevel={handleToggleLevel}
          contentLevels={contentLevels}
          hyperlinkUrls={hyperlinkUrls}
        />
      </div>

      <div className="w-full mt-6 space-y-6 overflow-visible">
        <DimmedSection dimmed={shouldDimAuxiliary} className="w-full">
          <ProfessionalHistorySection section={workHistory} />
        </DimmedSection>

        <DimmedSection dimmed={shouldDimAuxiliary} className="w-full">
          <AwardsRecognitionSection section={awards} />
        </DimmedSection>

        <DimmedSection dimmed={shouldDimAuxiliary} className="w-full">
          <SideProjectsSection
            disabled={shouldDimAuxiliary}
            title={sideProjects.sectionTitle}
            items={sideProjects.items}
            onNavigateToPage={onNavigateToPage || (() => {})}
          />
        </DimmedSection>

        <DimmedSection dimmed={shouldDimAuxiliary} className="w-full">
          <ContactLinksSection
            disabled={shouldDimAuxiliary}
            section={contact}
          />
        </DimmedSection>
      </div>

      <DimmedSection dimmed={shouldDimAuxiliary} className="w-full mt-12">
        <p className="portfolio-text portfolio-text--muted whitespace-pre-wrap">
          {profile.tagline}
        </p>
      </DimmedSection>
    </div>
  );
}
