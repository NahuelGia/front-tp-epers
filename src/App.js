import { useState } from "react";
import { Card } from "./components/card";

import { Shuffle } from "lucide-react";
import FlipCardButton from "./components/flipCardButton";
import { WinnerComponent } from "./components/winnerComponent";

const mockedCards = [
	{ id: 1, name: "Persistir a lo Gradle", score: 85, isFlipped: false },
	{ id: 2, name: "Carlos", score: 92, isFlipped: false },
	{ id: 3, name: "Epers Strikers", score: 78, isFlipped: false },
	{ id: 4, name: "The EPERStrikes Back", score: 95, isFlipped: false },
	{ id: 5, name: "Laura", score: 88, isFlipped: false },
	{ id: 6, name: "Pedro", score: 73, isFlipped: false },
	{ id: 7, name: "Pedro", score: 73, isFlipped: false },
	{ id: 8, name: "Pedro", score: 73, isFlipped: false },
	{ id: 9, name: "Pedro", score: 73, isFlipped: false },
	{ id: 10, name: "Los angeles de guido", score: 73, isFlipped: false },
];

const ganador = {
	id: 4,
	name: "Los angeles de guido",
	score: 95,
	isFlipped: false,
	palabrasUsadas: ["hola", "perro", "pera", "casa", "gato", "pato", "palo", "perro", "pera", "casa", "gato", "pato", "palo"],
};

export default function CardsGame() {
	const [cards, setCards] = useState(mockedCards);
	const [winner, setWinner] = useState(null);

	const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

	const flipRandomCard = async () => {
		setCards((prevCards) =>
			prevCards.map((card) => ({ ...card, isFlipped: false }))
		);

		await delay(500);

		const shuffledCards = [...cards].sort(() => Math.random() - 0.5);

		for (const card of shuffledCards) {
			setCards((prevCards) =>
				prevCards.map((c) => (c.id === card.id ? { ...c, isFlipped: true } : c))
			);

			await delay(500);
		}
	};

	const flipCard = (id) => {
		setCards((prevCards) =>
			prevCards.map((card) =>
				card.id === id ? { ...card, isFlipped: !card.isFlipped } : card
			)
		);
	};

	return (
		<div className="min-h-screen bg-gray-900 pt-[5rem] p-8">
			<div className="max-w-6xl mx-auto">
				<div className="flex justify-between items-center mb-8 pb-2">
					<h1 className="text-[2rem] font-bold text-white">Rituales</h1>
					<FlipCardButton
						onClick={flipRandomCard}
						className="bg-purple-400 hover:bg-purple-600 "
					>
						<Shuffle className="mr-2 h-4 w-4" />
						Voltear Carta
					</FlipCardButton>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{cards.map((card, index) => (
						<Card
							key={card.id}
							name={card.name}
							score={card.score}
							isFlipped={card.isFlipped}
							onFlip={() => flipCard(card.id)}
						/>
					))}
				</div>

				<WinnerComponent ritual={ganador} />
			</div>
		</div>
	);
}
