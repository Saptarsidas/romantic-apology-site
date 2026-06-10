import PageShell from "../components/PageShell";
import CatchHeartsGame from "../components/games/CatchHeartsGame";
import { useSiteContent } from "../content/SiteContentContext";

export default function Page2Apology() {
  const { content } = useSiteContent();
  const page = content.page2;

  return (
    <PageShell
      {...page}
      nextTo="/page-3"
      nextText="Next Page"
    >
      <CatchHeartsGame />
    </PageShell>
  );
}
