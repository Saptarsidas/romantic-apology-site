import PageShell from "../components/PageShell";
import SweetQuizGame from "../components/games/SweetQuizGame";
import { useSiteContent } from "../content/SiteContentContext";

export default function Page6Quiz() {
  const { content } = useSiteContent();
  const page = content.page6;

  return (
    <PageShell
      title={page.title}
      subtitle={page.subtitle}
      imageSrc={page.imageSrc}
      imageAlt={page.imageAlt}
      imageLabel={page.imageLabel}
      nextTo="/page-7"
      nextText="Next Page"
    >
      <SweetQuizGame />
    </PageShell>
  );
}
