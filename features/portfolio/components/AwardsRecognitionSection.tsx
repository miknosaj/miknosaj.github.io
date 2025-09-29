import type { AwardsSectionProps } from './types';

export function AwardsRecognitionSection({ section }: AwardsSectionProps) {
  if (!section.items.length) {
    return null;
  }

  return (
    <div className="flex flex-col w-full overflow-visible">
      <div
        className="flex gap-2.5 items-start justify-start py-2 relative w-full border-b overflow-visible"
        style={{ borderColor: 'var(--portfolio-border)' }}
      >
        <div className="portfolio-text portfolio-text--muted w-[100px]">
          <p>{section.sectionTitle}</p>
        </div>
      </div>
      {section.items.map((award) => (
        <div
          key={`${award.title}-${award.year}`}
          className="flex gap-2.5 items-start justify-start py-2 relative w-full border-b overflow-visible"
          style={{ borderColor: 'var(--portfolio-border)' }}
        >
          <div className="flex-1 portfolio-text">
            <p>{award.title}</p>
          </div>
          <div className="portfolio-text portfolio-text--muted text-right w-[100px]">
            <p>{award.year}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
