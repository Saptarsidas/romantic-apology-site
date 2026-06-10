import { useState } from "react";

const questions = [
  {
    prompt: "Which moment describes us best?",
    options: ["Chaotic but cute", "Perfectly calm", "Always serious"],
    answer: "Chaotic but cute",
  },
  {
    prompt: "What should I do more often?",
    options: ["Listen deeply", "Get defensive", "Forget dates"],
    answer: "Listen deeply",
  },
  {
    prompt: "Our ideal next date is...",
    options: ["Sunset walk + ice cream", "Silent office meeting", "Traffic tour"],
    answer: "Sunset walk + ice cream",
  },
];

export default function SweetQuizGame() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const current = questions[index];

  const pick = (value) => {
    if (done) return;
    if (value === current.answer) setScore((prev) => prev + 1);

    if (index === questions.length - 1) {
      setDone(true);
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  const reset = () => {
    setIndex(0);
    setScore(0);
    setDone(false);
  };

  return (
    <div className="rounded-2xl border border-rose-200 bg-white/70 p-4">
      {done ? (
        <div className="space-y-2">
          <p className="text-lg font-bold text-rose-700">Score: {score}/{questions.length}</p>
          <p className="text-sm text-rose-700">
            {score === questions.length
              ? "You know my heart perfectly."
              : "I promise to do better and make sweeter memories."}
          </p>
          <button
            onClick={reset}
            className="rounded-full bg-rose-500 px-4 py-2 text-sm font-bold text-white hover:bg-rose-600"
          >
            Play Again
          </button>
        </div>
      ) : (
        <div>
          <p className="mb-3 text-sm font-semibold text-rose-700">{current.prompt}</p>
          <div className="grid gap-2">
            {current.options.map((option) => (
              <button
                key={option}
                onClick={() => pick(option)}
                className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-left text-sm font-semibold text-rose-700 hover:bg-rose-100"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
