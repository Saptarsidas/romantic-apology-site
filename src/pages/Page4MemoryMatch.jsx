import PageShell from "../components/PageShell";
import MemoryMatchGame from "../components/games/MemoryMatchGame";
import { useSiteContent } from "../content/SiteContentContext";

export default function Page4MemoryMatch() {
  const { content } = useSiteContent();
  const page = content.page4;

  return (
    <PageShell
      {...page}
      nextTo="/page-5"
      nextText="Next Page"
    >
      <MemoryMatchGame />
    </PageShell>
  );
}
