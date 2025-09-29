interface ErrorPageProps {
  message: string;
  onNavigateToIndex: () => void;
}

export function ErrorPage({ message, onNavigateToIndex }: ErrorPageProps) {
  return (
    <div className="portfolio-container">
      <div className="portfolio-text">{message}</div>
      <button onClick={onNavigateToIndex} className="portfolio-link mt-4">
        ← Back to index
      </button>
    </div>
  );
}
