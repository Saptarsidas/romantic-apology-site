import PageShell from "../components/PageShell";
import MemoryMatchGame from "../components/games/MemoryMatchGame";
import { useSiteContent } from "../content/SiteContentContext";

export default function Page4MemoryMatch() {
  const { content } = useSiteContent();
  const page = content.page4;

  return (
    <PageShell
      title={page.title}
      subtitle={page.subtitle}
      imageSrc={page.imageSrc}
      imageAlt={page.imageAlt}
      imageLabel={page.imageLabel}
      nextTo="/page-5"
      nextText="Next Page"
    >
      <MemoryMatchGame />
    </PageShell>
  );
}
