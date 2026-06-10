import PageShell from "../components/PageShell";
import LoveClickerGame from "../components/games/LoveClickerGame";
import { useSiteContent } from "../content/SiteContentContext";

export default function Page5LoveClicker() {
  const { content } = useSiteContent();
  const page = content.page5;

  return (
    <PageShell
      {...page}
      nextTo="/page-6"
      nextText="Next Page"
    >
      <LoveClickerGame />
    </PageShell>
  );
}
