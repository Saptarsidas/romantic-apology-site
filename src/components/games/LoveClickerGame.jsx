import { useEffect, useState } from "react";

export default function LoveClickerGame() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started || timeLeft === 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [started, timeLeft]);

  const clickHeart = () => {
    if (timeLeft === 0) return;
    if (!started) setStarted(true);
    setScore((prev) => prev + 1);
  };

  const reset = () => {
    setScore(0);
    setTimeLeft(15);
    setStarted(false);
  };

  const won = timeLeft === 0 && score >= 35;

  return (
    <div className="rounded-2xl border border-rose-200 bg-white/70 p-4">
      <p className="text-sm font-semibold text-rose-700">
        Tap the heart fast! Time: {timeLeft}s | Score: {score}
      </p>
      <button
        onClick={clickHeart}
        className="pulse-love mt-4 rounded-full bg-rose-500 px-8 py-5 text-4xl text-white shadow-lg shadow-rose-300/60 hover:bg-rose-600"
      >
        ❤️
      </button>
      <p className="mt-3 text-sm text-rose-700">
        {timeLeft === 0
          ? won
            ? "Perfect rhythm! Your love energy is unstoppable."
            : "So close! Try one more round."
          : "Reach 35 before time runs out."}
      </p>
      <button
        onClick={reset}
        className="mt-3 rounded-full border border-rose-300 px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-100"
      >
        Restart
      </button>
    </div>
  );
}
