import { InlineImage } from '@/shared/ui/media/InlineImage';
import { localMinimaImages } from '../..';
import { withContentPage } from '../../components/withContentPage';
import type { PageConfig } from '../../data/page-registry';

interface LocalMinimaPageProps {
  onNavigateToIndex: () => void;
  pageConfig: PageConfig;
}

function LocalMinimaContent(_: LocalMinimaPageProps) {
  return (
    <div className="flex flex-col gap-4 w-full overflow-visible mb-6">
      <p className="portfolio-text">
        In mathematics, a local minimum is a dip that looks like the bottom, but isn't. Its depth is modest, relative, only temporary.
        The line turns upward again, the lowest it gets here but not the lowest it could ever be.
      </p>
      <p className="portfolio-text">This project is an ongoing work in progress.</p>

      {localMinimaImages.map(({ src, alt, orientation }, index) => (
        <InlineImage
          key={`${src}-${index}`}
          src={src}
          alt={alt ?? `Local Minima photograph ${index + 1}`}
          pageType="photography"
          orientation={orientation}
        />
      ))}
    </div>
  );
}

export default withContentPage<LocalMinimaPageProps>(LocalMinimaContent);
