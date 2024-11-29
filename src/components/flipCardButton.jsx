import { Shuffle } from "lucide-react";

export default function FlipCardButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center px-4 py-2 bg-purple-500 text-white font-bold rounded-lg shadow-md hover:bg-purple-700 transition"
    >
      <Shuffle className="mr-2 h-4 w-4" />
      Voltear Cartas
    </button>
  );
}
