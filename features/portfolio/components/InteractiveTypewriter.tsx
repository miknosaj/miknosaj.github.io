import type React from 'react';
import { useEffect, useMemo, useState, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { ModularGallery } from '@/shared/ui/media/ModularGallery';
import { getGalleryHeight } from '@/shared/data/gallery/registry';
import type { InteractiveContent } from '../data/types';

interface InteractiveTypewriterProps {
  content: InteractiveContent;
  speed?: number;
  onComplete?: () => void;
  className?: string;
  currentLevel: number;
  activeByLevel: (string | null)[];
  onToggleLevel: (level: number, key: string, event?: MouseEvent) => void;
  contentLevels: Record<number, Record<string, InteractiveContent>>;
}

const DEFAULT_SPEED = 4;
const TYPEWRITER_DELAY_MS = 300;
const MOTION_DURATION_FAST = 0.3;
const MOTION_EASE = [0.25, 0.46, 0.45, 0.94] as const;

export function InteractiveTypewriter({
  content,
  speed = DEFAULT_SPEED,
  onComplete,
  className = '',
  currentLevel,
  activeByLevel,
  onToggleLevel,
  contentLevels,
}: InteractiveTypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [actualSpeed, setActualSpeed] = useState(speed);

  useEffect(() => {
    try {
      const cssSpeed = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--typewriter-speed'),
        10,
      );
      setActualSpeed(Number.isFinite(cssSpeed) && cssSpeed > 0 ? cssSpeed : DEFAULT_SPEED);
    } catch (error) {
      setActualSpeed(DEFAULT_SPEED);
    }
  }, []);

  const segments = useMemo(() => (content.type === 'richText' ? content.segments ?? [] : []), [content]);
  const plainText = useMemo(() => segments.map((s) => s.text).join(''), [segments]);

  useEffect(() => {
    if (!hasStarted) {
      const delayTimeout = setTimeout(() => {
        setHasStarted(true);
      }, TYPEWRITER_DELAY_MS);

      return () => clearTimeout(delayTimeout);
    }
  }, [hasStarted]);

  useEffect(() => {
    if (hasStarted && currentIndex < plainText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + plainText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, actualSpeed);

      return () => clearTimeout(timeout);
    }

    if (hasStarted && currentIndex >= plainText.length) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [actualSpeed, currentIndex, hasStarted, onComplete, plainText]);

  useEffect(() => {
    setDisplayText('');
    setCurrentIndex(0);
    setHasStarted(false);
    setIsComplete(false);
  }, [segments]);

  const renderParsedText = () => {
    let charIndex = 0;

    const renderedParts = segments.map((segment, index) => {
      const segmentLength = segment.text.length;
      const visibleLength = Math.max(0, Math.min(segmentLength, displayText.length - charIndex));
      const visibleContent = segment.text.substring(0, visibleLength);
      charIndex += segmentLength;

      if (visibleLength === 0) {
        return null;
      }

      if (segment.type === 'trigger') {
        const nextLevel = currentLevel + 1;
        const triggerId = (segment as any).triggerId || `trigger-${currentLevel}-${segment.text}`;
        const activeNestedKey = activeByLevel[nextLevel] ?? null;
        const isActive = activeNestedKey === triggerId;
        const isFullyVisible = visibleLength === segmentLength && isComplete;
        const controlsId = `nested-content-${nextLevel}-${triggerId}`;

        const baseClasses = `nested-trigger ${
          isActive
            ? 'nested-trigger--active'
            : isFullyVisible
            ? 'nested-trigger--inactive nested-trigger--clickable'
            : 'nested-trigger--inactive'
        } focus-ring rounded-sm`;

        const onKeyDown = (e: React.KeyboardEvent) => {
          if (!isFullyVisible) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggleLevel(nextLevel, triggerId);
          }
        };

        return (
          <button
            type="button"
            key={`${triggerId}-${index}`}
            className={baseClasses}
            onClick={isFullyVisible ? (event) => onToggleLevel(nextLevel, triggerId, event) : undefined}
            onKeyDown={onKeyDown}
            aria-expanded={isActive}
            aria-controls={controlsId}
            disabled={!isFullyVisible}
          >
            {visibleContent}
          </button>
        );
      }

      if (segment.type === 'link') {
        return <span key={`${(segment as any).linkId}-${index}`}>{visibleContent}</span>;
      }

      return <span key={index}>{visibleContent}</span>;
    });

    return (
      <>
        {renderedParts}
      </>
    );
  };

  const nextLevel = currentLevel + 1;
  const activeNestedKey = activeByLevel[nextLevel] ?? null;
  const activeNestedContent = activeNestedKey ? contentLevels[nextLevel]?.[activeNestedKey] : undefined;
  const isModularGalleryActive = activeNestedContent?.type === 'gallery';
  const galleryId = isModularGalleryActive ? activeNestedContent.galleryId : null;
  const galleryHeight = galleryId ? getGalleryHeight(galleryId) : 160;

  return (
    <div
      className={`absolute left-0 right-0 top-full overflow-visible z-30 cursor-default ${className}`}
      style={{ cursor: 'default', marginTop: '14px' }}
    >
      {content.type === 'richText' && (
        <p className="portfolio-text typewriter-content">{renderParsedText()}</p>
      )}

      {isModularGalleryActive && galleryId && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: galleryHeight }}
          transition={{
            height: { duration: MOTION_DURATION_FAST, ease: MOTION_EASE },
            opacity: { duration: MOTION_DURATION_FAST, delay: 0.15 },
          }}
          className="mt-6 w-full relative overflow-visible"
          style={{
            isolation: 'isolate',
            position: 'relative',
            zIndex: 50,
          }}
          id={`nested-content-${nextLevel}-${galleryId}`}
        >
          <div className="relative" style={{ filter: 'none' }}>
            <ModularGallery galleryId={galleryId} />
          </div>
        </motion.div>
      )}

      {activeNestedContent && !isModularGalleryActive && (
        <div className="relative" id={`nested-content-${nextLevel}-${activeNestedKey}`}
        >
          <InteractiveTypewriter
            content={activeNestedContent}
            speed={speed}
            currentLevel={nextLevel}
            activeByLevel={activeByLevel}
            onToggleLevel={onToggleLevel}
            contentLevels={contentLevels}
          />
        </div>
      )}
    </div>
  );
}
