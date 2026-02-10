import CanvasViewport from "@/components/canvas/CanvasViewport";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher";

export default function Home() {
  return (
    <main>
      <ThemeSwitcher />
      <CanvasViewport />
    </main>
  );
}
