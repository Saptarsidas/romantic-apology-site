import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";
import WordScrambleGame from "../components/games/WordScrambleGame";
import { useSiteContent } from "../content/SiteContentContext";

export default function Page7WordScramble() {
  const { content } = useSiteContent();
  const page = content.page7;

  return (
    <PageShell
      title={page.title}
      subtitle={page.subtitle}
      imageSrc={page.imageSrc}
      imageAlt={page.imageAlt}
      imageLabel={page.imageLabel}
      showNext={false}
    >
      <WordScrambleGame />
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link
          to="/"
          className="rounded-full bg-rose-600 px-5 py-2.5 text-sm font-bold text-white transition hover:scale-105 hover:bg-rose-700"
        >
          Replay From Start
        </Link>
      </div>
    </PageShell>
  );
}
