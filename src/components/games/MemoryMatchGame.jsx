import { useMemo, useState } from "react";

const symbols = ["💌", "🌹", "🎀", "🍫", "🎵", "✨"];

function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default function MemoryMatchGame() {
  const initialCards = useMemo(
    () =>
      shuffle([...symbols, ...symbols]).map((symbol, index) => ({
        id: `${symbol}-${index}`,
        symbol,
        flipped: false,
        matched: false,
      })),
    []
  );

  const [cards, setCards] = useState(initialCards);
  const [selected, setSelected] = useState([]);
  const [busy, setBusy] = useState(false);

  const matchedCount = cards.filter((c) => c.matched).length;

  const handleClick = (card) => {
    if (busy || card.flipped || card.matched || selected.length === 2) return;

    const updated = cards.map((c) =>
      c.id === card.id ? { ...c, flipped: true } : c
    );
    const nextSelected = [...selected, card.id];

    setCards(updated);
    setSelected(nextSelected);

    if (nextSelected.length === 2) {
      const [firstId, secondId] = nextSelected;
      const first = updated.find((c) => c.id === firstId);
      const second = updated.find((c) => c.id === secondId);

      if (first.symbol === second.symbol) {
        setCards((prev) =>
          prev.map((c) =>
            c.id === firstId || c.id === secondId ? { ...c, matched: true } : c
          )
        );
        setSelected([]);
      } else {
        setBusy(true);
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId ? { ...c, flipped: false } : c
            )
          );
          setSelected([]);
          setBusy(false);
        }, 700);
      }
    }
  };

  const reset = () => {
    const refreshed = shuffle([...symbols, ...symbols]).map((symbol, index) => ({
      id: `${symbol}-${index}`,
      symbol,
      flipped: false,
      matched: false,
    }));
    setCards(refreshed);
    setSelected([]);
    setBusy(false);
  };

  return (
    <div className="rounded-2xl border border-rose-200 bg-white/70 p-4">
      <p className="mb-3 text-sm font-semibold text-rose-700">
        Match all pairs: {matchedCount}/12
      </p>
      <div className="grid grid-cols-4 gap-2 sm:max-w-sm">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleClick(card)}
            className="h-16 rounded-xl border border-rose-200 bg-rose-50 text-xl hover:bg-rose-100"
          >
            {card.flipped || card.matched ? card.symbol : "?"}
          </button>
        ))}
      </div>
      <button
        onClick={reset}
        className="mt-4 rounded-full bg-rose-500 px-4 py-2 text-sm font-bold text-white hover:bg-rose-600"
      >
        Shuffle Again
      </button>
    </div>
  );
}
