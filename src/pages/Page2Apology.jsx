import PageShell from "../components/PageShell";
import CatchHeartsGame from "../components/games/CatchHeartsGame";

export default function Page2Apology() {
  return (
    <PageShell
      title="I am so sorry! ❤️"
      subtitle="If I could rewind time, I would choose your smile over every mistake, every single time."
      imageLabel="Image Placeholder: Our favorite photo together"
      nextTo="/page-3"
      nextText="Next Page"
    >
      <CatchHeartsGame />
    </PageShell>
  );
}
