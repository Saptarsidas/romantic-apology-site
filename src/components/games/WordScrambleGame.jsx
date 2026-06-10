import { useMemo, useState } from "react";

const words = ["FOREVER", "SUNSHINE", "HEARTBEAT"];

function shuffleWord(word) {
  const arr = word.split("");
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join("");
}

export default function WordScrambleGame() {
  const [index, setIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [solved, setSolved] = useState(0);
  const [message, setMessage] = useState("Unscramble each word to unlock the final promise.");

  const currentWord = words[index];
  const scrambled = useMemo(() => shuffleWord(currentWord), [index, currentWord]);

  const submit = (event) => {
    event.preventDefault();
    if (guess.trim().toUpperCase() === currentWord) {
      const nextSolved = solved + 1;
      setSolved(nextSolved);
      setGuess("");

      if (index < words.length - 1) {
        setIndex((prev) => prev + 1);
        setMessage("Correct! Keep going ❤️");
      } else {
        setMessage("You solved everything. I promise to love you better, every day.");
      }
    } else {
      setMessage("Almost. Try again, my love.");
    }
  };

  const reset = () => {
    setIndex(0);
    setGuess("");
    setSolved(0);
    setMessage("Unscramble each word to unlock the final promise.");
  };

  const completed = solved === words.length;

  return (
    <div className="rounded-2xl border border-rose-200 bg-white/70 p-4">
      <p className="text-sm font-semibold text-rose-700">Progress: {solved}/{words.length}</p>
      {!completed ? (
        <form onSubmit={submit} className="mt-3 space-y-3">
          <p className="text-2xl font-bold tracking-[0.3em] text-rose-700">{scrambled}</p>
          <input
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            className="w-full rounded-xl border border-rose-200 px-3 py-2 text-sm outline-none ring-rose-200 focus:ring"
            placeholder="Type your answer"
          />
          <button
            type="submit"
            className="rounded-full bg-rose-500 px-4 py-2 text-sm font-bold text-white hover:bg-rose-600"
          >
            Check
          </button>
        </form>
      ) : (
        <button
          onClick={reset}
          className="mt-3 rounded-full bg-rose-500 px-4 py-2 text-sm font-bold text-white hover:bg-rose-600"
        >
          Play Again
        </button>
      )}
      <p className="mt-3 text-sm text-rose-700">{message}</p>
    </div>
  );
}
