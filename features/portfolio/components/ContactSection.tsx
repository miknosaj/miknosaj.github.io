import { ExternalLinkIcon } from '@/shared/icons/ExternalLinkIcon';
import { SectionList } from './SectionList';
import type { ContactSectionProps } from './types';

export function ContactLinksSection({ disabled, section }: ContactSectionProps) {
  return (
    <SectionList
      title={section.sectionTitle}
      items={section.items}
      disabled={disabled}
      headerInnerClassName="flex-1 portfolio-text portfolio-text--muted"
      leftClassName="portfolio-text"
      rightClassName="portfolio-text portfolio-text--muted text-right"
      renderLeft={(contact, { disabled: isDisabled }) => (
        <p>
          <a
            href={contact.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`portfolio-link focus-ring rounded-sm ${
              isDisabled ? 'portfolio-link--disabled' : ''
            }`}
            onClick={(event) => {
              if (isDisabled) {
                event.preventDefault();
                return;
              }
            }}
          >
            {contact.handle}
            <ExternalLinkIcon />
          </a>
        </p>
      )}
      renderRight={(contact) => <p>{contact.platform}</p>}
    />
  );
}
