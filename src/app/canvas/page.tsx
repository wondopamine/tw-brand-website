import CanvasViewport from "@/components/canvas/CanvasViewport";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function CanvasPage() {
  return (
    <main>
      <ErrorBoundary>
        <CanvasViewport />
      </ErrorBoundary>
    </main>
  );
}
