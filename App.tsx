import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/next';
import { Portfolio, usePortfolioState, getPortfolioContent, getBioSections } from '@/features/portfolio';
import { PageFactory } from '@/features/content';
import { ErrorPage } from '@/shared/ui/feedback/ErrorPage';
import { AppLayout } from '@/shared/ui/layout/AppLayout';

function RoutedPageFactory({ onNavigateToIndex }: { onNavigateToIndex: () => void }) {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <ErrorPage message="Page not found" onNavigateToIndex={onNavigateToIndex} />;
  }

  return <PageFactory slug={slug} onNavigateToIndex={onNavigateToIndex} />;
}

export default function App() {
  try {
    const portfolioContent = getPortfolioContent();
    const bioSections = getBioSections();
    const portfolioState = usePortfolioState();
    const navigate = useNavigate();
    const location = useLocation();
    const isIndexPage = location.pathname === '/' || location.pathname === '';

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
      >
        <Analytics />
        <Routes>
          <Route
            path="/"
            element={
              <Portfolio
                profile={portfolioContent.profile}
                bioSections={bioSections}
                workHistory={portfolioContent.workHistory}
                awards={portfolioContent.awards}
                sideProjects={portfolioContent.sideProjects}
                contact={portfolioContent.contact}
                {...portfolioState}
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
