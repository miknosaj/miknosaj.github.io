import type React from 'react';
import { ExternalLinkIcon } from '@/shared/icons/ExternalLinkIcon';
import { DimmedSection } from './DimmedSection';
import type { BioSectionProps } from './types';
import { InteractiveTypewriter } from './InteractiveTypewriter';

export function InteractiveBioSection(props: BioSectionProps) {
  const { sections, activeByLevel, handleToggleLevel, contentLevels, hyperlinkUrls } = props;

  return (
    <div className="flex flex-col gap-4 w-full overflow-visible">
      {sections.map((section) => {
        const rootActive = activeByLevel[0];
        const isActive = rootActive === section.id;
        const isDimmed = Boolean(rootActive && !isActive);

        return (
          <div
            key={section.id}
            className={`relative shrink-0 w-full overflow-visible ${isActive ? 'cursor-default' : ''}`}
            onClick={(event) => {
              if (isActive) {
                event.stopPropagation();
              }
            }}
            style={{ position: 'relative' }}
          >
            <DimmedSection dimmed={isDimmed}>
              <p className="portfolio-text">
                {section.sentence.map((segment, index) => {
                  if (segment.type === 'text') {
                    return (
                      <span key={index} className="transition-colors duration-300">
                        {segment.text}
                      </span>
                    );
                  }

                  if (segment.type === 'trigger') {
                    const triggerId = segment.triggerId;
                    const isTriggerActive = rootActive === triggerId;
                    const isDisabled = Boolean(rootActive && !isTriggerActive);

                    const baseClasses = `portfolio-trigger ${
                      isTriggerActive
                        ? 'portfolio-trigger--active'
                        : isDisabled
                        ? 'portfolio-trigger--disabled'
                        : ''
                    } focus-ring rounded-sm`;

                    const onKeyDown = (e: React.KeyboardEvent) => {
                      if (isDisabled) return;
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleToggleLevel(0, triggerId);
                      }
                    };

                    return (
                      <button
                        type="button"
                        key={index}
                        className={baseClasses}
                        aria-pressed={isTriggerActive}
                        disabled={isDisabled}
                        onClick={(event) => handleToggleLevel(0, triggerId, event)}
                        onKeyDown={onKeyDown}
                      >
                        {segment.text}
                      </button>
                    );
                  }

                  if (segment.type === 'link') {
                    const isDisabled = Boolean(rootActive && !isActive);
                    const href = hyperlinkUrls[segment.linkId];
                    return (
                      <a
                        key={index}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`portfolio-link ${isDisabled ? 'portfolio-link--disabled' : ''} focus-ring rounded-sm`}
                        tabIndex={isDisabled ? -1 : 0}
                        onClick={(event) => {
                          if (isDisabled) {
                            event.preventDefault();
                          }
                        }}
                      >
                        {segment.text}
                        <ExternalLinkIcon />
                      </a>
                    );
                  }

                  return null;
                })}
              </p>
            </DimmedSection>
            {isActive && (
              <InteractiveTypewriter
                content={contentLevels[0]?.[section.id] ?? { type: 'richText', segments: [] }}
                currentLevel={0}
                activeByLevel={activeByLevel}
                onToggleLevel={handleToggleLevel}
                contentLevels={contentLevels}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
