import { useMemo, useState } from "react";

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function getWinner(board) {
  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return board[a];
    }
  }
  return null;
}

export default function TicTacToeGame() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xTurn, setXTurn] = useState(true);

  const winner = useMemo(() => getWinner(board), [board]);
  const draw = !winner && board.every(Boolean);

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const next = [...board];
    next[index] = xTurn ? "X" : "O";
    setBoard(next);
    setXTurn((prev) => !prev);
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setXTurn(true);
  };

  return (
    <div className="rounded-2xl border border-rose-200 bg-white/70 p-4">
      <p className="mb-3 text-sm font-semibold text-rose-700">
        {winner ? `Winner: ${winner}` : draw ? "Draw!" : `Turn: ${xTurn ? "X" : "O"}`}
      </p>
      <div className="grid w-full max-w-xs grid-cols-3 gap-2">
        {board.map((cell, idx) => (
          <button
            key={idx}
            className="h-20 rounded-xl border border-rose-200 bg-rose-50 text-2xl font-bold text-rose-700 hover:bg-rose-100"
            onClick={() => handleClick(idx)}
          >
            {cell}
          </button>
        ))}
      </div>
      <button
        className="mt-4 rounded-full bg-rose-500 px-4 py-2 text-sm font-bold text-white hover:bg-rose-600"
        onClick={reset}
      >
        Reset
      </button>
    </div>
  );
}
