import PageShell from "../components/PageShell";
import LoveClickerGame from "../components/games/LoveClickerGame";
import { useSiteContent } from "../content/SiteContentContext";

export default function Page5LoveClicker() {
  const { content } = useSiteContent();
  const page = content.page5;

  return (
    <PageShell
      title={page.title}
      subtitle={page.subtitle}
      imageSrc={page.imageSrc}
      imageAlt={page.imageAlt}
      imageLabel={page.imageLabel}
      nextTo="/page-6"
      nextText="Next Page"
    >
      <LoveClickerGame />
    </PageShell>
  );
}
