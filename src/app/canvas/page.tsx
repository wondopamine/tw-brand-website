import Desktop from "@/components/desktop/Desktop";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function CanvasPage() {
  return (
    <main>
      <ErrorBoundary>
        <Desktop />
      </ErrorBoundary>
    </main>
  );
}
