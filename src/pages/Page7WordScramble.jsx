import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";
import WordScrambleGame from "../components/games/WordScrambleGame";

export default function Page7WordScramble() {
  return (
    <PageShell
      title="Final Promise"
      subtitle="No perfect words, just a real promise: I will do better, and I will love you louder."
      imageLabel="Image Placeholder: The photo I want framed forever"
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
