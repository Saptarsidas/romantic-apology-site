import PageShell from "../components/PageShell";
import SweetQuizGame from "../components/games/SweetQuizGame";

export default function Page6Quiz() {
  return (
    <PageShell
      title="Know My Promise"
      subtitle="I am learning to love you better by listening better."
      imageLabel="Image Placeholder: A calm cozy photo of us"
      nextTo="/page-7"
      nextText="Next Page"
    >
      <SweetQuizGame />
    </PageShell>
  );
}
