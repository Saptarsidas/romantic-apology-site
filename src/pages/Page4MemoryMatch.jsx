import PageShell from "../components/PageShell";
import MemoryMatchGame from "../components/games/MemoryMatchGame";

export default function Page4MemoryMatch() {
  return (
    <PageShell
      title="Pieces Of Us"
      subtitle="Every memory with you is a treasure I never want to lose."
      imageLabel="Image Placeholder: One of our sweetest moments"
      nextTo="/page-5"
      nextText="Next Page"
    >
      <MemoryMatchGame />
    </PageShell>
  );
}
