import PageShell from "../components/PageShell";
import LoveClickerGame from "../components/games/LoveClickerGame";

export default function Page5LoveClicker() {
  return (
    <PageShell
      title="Heart Rush"
      subtitle="My heart races for you now, tomorrow, and always."
      imageLabel="Image Placeholder: A goofy happy selfie"
      nextTo="/page-6"
      nextText="Next Page"
    >
      <LoveClickerGame />
    </PageShell>
  );
}
