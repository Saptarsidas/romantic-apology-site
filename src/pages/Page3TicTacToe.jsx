import PageShell from "../components/PageShell";
import TicTacToeGame from "../components/games/TicTacToeGame";
import { useSiteContent } from "../content/SiteContentContext";

export default function Page3TicTacToe() {
  const { content } = useSiteContent();
  const page = content.page3;

  return (
    <PageShell
      title={page.title}
      subtitle={page.subtitle}
      imageSrc={page.imageSrc}
      imageAlt={page.imageAlt}
      imageLabel={page.imageLabel}
      nextTo="/page-4"
      nextText="Next Page"
    >
      <TicTacToeGame />
    </PageShell>
  );
}
