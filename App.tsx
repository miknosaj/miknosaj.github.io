import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Portfolio, usePortfolioState, getPortfolioContent, getBioSections } from '@/features/portfolio';
import { PageFactory, getPageConfig } from '@/features/content';
import { ErrorPage } from '@/shared/ui/feedback/ErrorPage';
import { AppLayout } from '@/shared/ui/layout/AppLayout';
import { PageTransition } from '@/shared/ui/layout/PageTransition';

function RoutedPageFactory({ onNavigateToIndex }: { onNavigateToIndex: () => void }) {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <ErrorPage message="Page not found" onNavigateToIndex={onNavigateToIndex} />;
  }

  return <PageFactory slug={slug} onNavigateToIndex={onNavigateToIndex} />;
}

function IndexPage({
  portfolioContent,
  bioSections,
  portfolioState,
  onNavigateToPage,
}: {
  portfolioContent: ReturnType<typeof getPortfolioContent>;
  bioSections: ReturnType<typeof getBioSections>;
  portfolioState: ReturnType<typeof usePortfolioState>;
  onNavigateToPage: (page: string) => void;
}) {
  return (
    <PageTransition>
      <Portfolio
        profile={portfolioContent.profile}
        bioSections={bioSections}
        workHistory={portfolioContent.workHistory}
        awards={portfolioContent.awards}
        sideProjects={portfolioContent.sideProjects}
        contact={portfolioContent.contact}
        {...portfolioState}
        onNavigateToPage={onNavigateToPage}
      />
    </PageTransition>
  );
}

export default function App() {
  try {
    const portfolioContent = getPortfolioContent();
    const bioSections = getBioSections();
    const portfolioState = usePortfolioState();
    const navigate = useNavigate();
    const location = useLocation();
    const isIndexPage = location.pathname === '/' || location.pathname === '';

    // Determine if current page needs full width
    const isFullWidth = useMemo(() => {
      if (isIndexPage) return false;
      const slug = location.pathname.slice(1); // Remove leading slash
      const pageConfig = getPageConfig(slug);
      return pageConfig?.fullWidth ?? false;
    }, [location.pathname, isIndexPage]);

    const handleNavigateToPage = (page: string) => {
      navigate(`/${page}`);
    };

    const handleNavigateToIndex = () => {
      navigate('/');
    };

    // Allow Escape to clear any active interactive trigger
    useEffect(() => {
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          portfolioState.handleGlobalClick();
        }
      };
      window.addEventListener('keydown', onKeyDown);
      return () => window.removeEventListener('keydown', onKeyDown);
    }, [portfolioState.handleGlobalClick]);

    return (
      <AppLayout
        isIndexPage={isIndexPage}
        hasActiveTrigger={portfolioState.hasAnyActiveTrigger}
        onGlobalClick={portfolioState.handleGlobalClick}
        fullWidth={isFullWidth}
      >
        <Analytics />
        <Analytics route={location.pathname} path={`${location.pathname}${location.search}`} />
        <Routes>
          <Route
            path="/"
            element={
              <IndexPage
                portfolioContent={portfolioContent}
                bioSections={bioSections}
                portfolioState={portfolioState}
                onNavigateToPage={handleNavigateToPage}
              />
            }
          />
          <Route
            path="/:slug"
            element={<RoutedPageFactory onNavigateToIndex={handleNavigateToIndex} />}
          />
          <Route
            path="*"
            element={<ErrorPage message="Page not found" onNavigateToIndex={handleNavigateToIndex} />}
          />
        </Routes>
      </AppLayout>
    );
  } catch (error) {
    console.error('App error:', error);
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="portfolio-container">
          <div className="portfolio-text">Loading...</div>
        </div>
      </div>
    );
  }
}
