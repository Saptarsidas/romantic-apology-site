import PageShell from "../components/PageShell";
import TicTacToeGame from "../components/games/TicTacToeGame";

export default function Page3TicTacToe() {
  return (
    <PageShell
      title="Our Little Battles"
      subtitle="Even when we disagree, I still choose us. Every. Single. Day."
      imageLabel="Image Placeholder: A playful candid memory"
      nextTo="/page-4"
      nextText="Next Page"
    >
      <TicTacToeGame />
    </PageShell>
  );
}
