import type { ProfessionalHistoryProps } from './types';

export function ProfessionalHistorySection({ section }: ProfessionalHistoryProps) {
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
      {section.items.map((job) => (
        <div
          key={`${job.company}-${job.period}`}
          className="flex items-start justify-between py-2 relative w-full border-b overflow-visible"
          style={{ borderColor: 'var(--portfolio-border)' }}
        >
          <div className="portfolio-text w-[100px]">
            <p>{job.company}</p>
          </div>
          <div className="flex-1 portfolio-text portfolio-text--muted">
            <p>{job.role}</p>
          </div>
          <div className="portfolio-text portfolio-text--muted text-right w-[100px]">
            <p>{job.period}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
