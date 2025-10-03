import { InlineImage } from '@/shared/ui/media/InlineImage';
import { InlineImageWithMagnifier } from '@/shared/ui/media/InlineImageWithMagnifier';
import { InlineVideo } from '@/shared/ui/media/InlineVideo';
import { InlineImageStack } from '@/shared/ui/media/InlineImageStack';
import { InlineImageSpreadStack } from '@/shared/ui/media/InlineImageSpreadStack';
import { InlineImageThemeToggle } from '@/shared/ui/media/InlineImageThemeToggle';

export type ContentBlock =
  | { type: 'text'; content: string }
  | { type: 'sectionHeader'; title: string }
  | {
      type: 'image';
      image: {
        src: string;
        alt: string;
        caption?: string;
      };
    }
  | {
      type: 'imageWithMagnifier';
      image: {
        src: string;
        alt: string;
        caption?: string;
        magnifierSrc?: string;
      };
    }
  | {
      type: 'imageNoBorder';
      image: {
        src: string;
        alt: string;
        caption?: string;
      };
    }
  | {
      type: 'imageThemeToggle';
      image: {
        src: string;
        darkSrc: string;
        alt: string;
        caption?: string;
      };
      onToggle: () => void;
    }
  | {
      type: 'video';
      video: {
        src: string;
        caption?: string;
      };
    }
  | {
      type: 'quote';
      quote: string;
      cite?: string;
    }
  | {
      type: 'framedText';
      text: string;
      height?: number; // optional custom height in px
    }
  | {
      type: 'imageStack';
      stack: { src: string; alt: string; caption?: string }[];
      height?: number;
      mobileHeight?: number;
    }
  | {
      type: 'imageSpreadStack';
      images: { src: string; alt: string; caption?: string }[];
      caption?: string;
      rows?: number;
      cols?: number;
      gap?: number;
    };

interface WritingContentProps {
  blocks: ContentBlock[];
}

export function WritingContent({ blocks }: WritingContentProps) {
  return (
    <div className="flex flex-col gap-4 w-full overflow-visible">
      {blocks.map((block, index) => {
        if (block.type === 'sectionHeader') {
          return (
            <div key={`section-${index}`} className="flex items-center gap-3 w-full mt-8 mb-2 overflow-visible">
              <span className="portfolio-text halbfett whitespace-nowrap">{block.title}</span>
              <span
                className="flex-1 border-t"
                style={{
                  borderColor: 'var(--portfolio-border)',
                  transition: 'border-color 900ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              />
            </div>
          );
        }
        if (block.type === 'text') {
          return (
            <p key={`text-${index}`} className="portfolio-text">
              {block.content}
            </p>
          );
        }

        if (block.type === 'image') {
          const { image } = block;
          return (
            <InlineImage
              key={`image-${index}`}
              src={image.src}
              alt={image.alt}
              pageType="writing"
              caption={image.caption}
            />
          );
        }

        if (block.type === 'imageWithMagnifier') {
          const { image } = block;
          return (
            <InlineImageWithMagnifier
              key={`image-magnifier-${index}`}
              src={image.src}
              alt={image.alt}
              magnifierSrc={image.magnifierSrc}
              pageType="writing"
              caption={image.caption}
            />
          );
        }

        if (block.type === 'imageNoBorder') {
          const { image } = block;
          return (
            <div key={`image-no-border-${index}`} className="mt-10 mb-6 w-full md:w-[115%] md:-ml-[7.5%]">
              <div className="relative w-full overflow-hidden h-[300px] md:h-[500px]">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center 70%' }}
                  loading="lazy"
                  decoding="async"
                />
                {image.caption && (
                  <figcaption className="absolute -bottom-3 md:bottom-1 left-1/2 -translate-x-1/2 text-sm text-[#9c9c9b] leading-relaxed text-center whitespace-nowrap">
                    {image.caption}
                  </figcaption>
                )}
              </div>
            </div>
          );
        }

        if (block.type === 'imageThemeToggle') {
          const { image, onToggle } = block;
          return (
            <InlineImageThemeToggle
              key={`image-theme-toggle-${index}`}
              src={image.src}
              alt={image.alt}
              pageType="writing"
              caption={image.caption}
              onToggle={onToggle}
            />
          );
        }

        if (block.type === 'video') {
          const { video } = block;
          return <InlineVideo key={`video-${index}`} src={video.src} caption={video.caption} />;
        }

        if (block.type === 'quote') {
          const { quote, cite } = block;
          return (
            <figure
              key={`quote-${index}`}
              className="mt-6 mb-4 pl-4 border-l-2"
              style={{
                borderColor: 'var(--portfolio-border)',
                transition: 'border-color 900ms cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <blockquote className="portfolio-text halbfett text-[#9c9c9b]">
                {quote.split('\n').map((line, lineIndex, arr) => (
                  <span key={`${index}-line-${lineIndex}`}>
                    {line}
                    {lineIndex < arr.length - 1 && <br />}
                  </span>
                ))}
              </blockquote>
              {cite && (
                <figcaption className="mt-2 text-sm text-[#9c9c9b]">— {cite}</figcaption>
              )}
            </figure>
          );
        }

        if (block.type === 'framedText') {
          const { text, height } = block;
          const frameHeight = height ?? 200; // default ~200px
          return (
            <div key={`framed-${index}`} className="w-full">
              <div className="mt-10 mb-6 inline-image-container w-full md:w-[115%] md:-ml-[7.5%]">
                <div className="relative w-full overflow-hidden shadow-[0px_2px_8px_0px_rgba(0,0,0,0.15)]">
                  <div
                    className="w-full flex items-center justify-center bg-white"
                    style={{ height: `${frameHeight}px` }}
                  >
                    <span className="portfolio-text text-[#6a6a6a]">{text}</span>
                  </div>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute border-[8px] border-solid border-white inset-[-8px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.15)]"
                  />
                </div>
              </div>
            </div>
          );
        }

        if (block.type === 'imageStack') {
          return (
            <InlineImageStack
              key={`stack-${index}`}
              images={block.stack}
              pageType="writing"
              height={block.height}
              mobileHeight={block.mobileHeight}
            />
          );
        }

        if (block.type === 'imageSpreadStack') {
          return (
            <InlineImageSpreadStack
              key={`spread-stack-${index}`}
              images={block.images}
              pageType="writing"
              caption={block.caption}
              rows={block.rows}
              cols={block.cols}
              gap={block.gap}
            />
          );
        }

        return null;
      })}
    </div>
  );
}
