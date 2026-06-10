import { useEffect, useMemo, useState } from "react";

export default function CatchHeartsGame() {
  const [hearts, setHearts] = useState([]);
  const [score, setScore] = useState(0);

  const target = 12;
  const isWin = score >= target;

  useEffect(() => {
    const spawn = setInterval(() => {
      setHearts((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          x: Math.random() * 92,
          y: -10,
          speed: 0.6 + Math.random() * 1.2,
        },
      ]);
    }, 650);

    const fall = setInterval(() => {
      setHearts((prev) =>
        prev
          .map((h) => ({ ...h, y: h.y + h.speed }))
          .filter((h) => h.y < 110)
      );
    }, 35);

    return () => {
      clearInterval(spawn);
      clearInterval(fall);
    };
  }, []);

  const heartsLeft = useMemo(() => Math.max(target - score, 0), [score]);

  const catchHeart = (id) => {
    setHearts((prev) => prev.filter((h) => h.id !== id));
    setScore((prev) => prev + 1);
  };

  return (
    <div className="rounded-2xl border border-rose-200 bg-white/70 p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-sm font-semibold text-rose-700">
        <span>Catch the falling hearts!</span>
        <span>Score: {score}</span>
        <span>{isWin ? "You did it ❤️" : `${heartsLeft} more to go`}</span>
      </div>

      <div className="relative h-56 overflow-hidden rounded-xl border border-rose-200 bg-gradient-to-b from-white to-rose-100">
        {hearts.map((heart) => (
          <button
            key={heart.id}
            className="absolute text-2xl transition hover:scale-125"
            style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
            onClick={() => catchHeart(heart.id)}
            aria-label="Catch heart"
          >
            ❤️
          </button>
        ))}
      </div>
    </div>
  );
}
