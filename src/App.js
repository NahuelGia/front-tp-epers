import { useEffect, useState } from "react";
import { Card } from "./components/card";

import { Shuffle } from "lucide-react";
import FlipCardButton from "./components/flipCardButton";
import { WinnerComponent } from "./components/winnerComponent";

const mockedCards = [
	{
		id: 1,
		name: "Persistir a lo Gradle",
		score: 85,
		isFlipped: false,
		palabrasUsadas: [
			"hola",
			"perro",
			"pera",
			"casa",
			"gato",
			"pato",
			"palo",
			"perro",
			"pera",
			"casa",
			"gato",
			"pato",
			"palo",
		],
	},
	{
		id: 2,
		name: "Carlos",
		score: 92,
		isFlipped: false,
		palabrasUsadas: [
			"hola",
			"perro",
			"pera",
			"casa",
			"gato",
			"pato",
			"palo",
			"perro",
			"pera",
			"casa",
			"gato",
			"pato",
			"palo",
		],
	},
	{
		id: 3,
		name: "Epers Strikers",
		score: 78,
		isFlipped: false,
		palabrasUsadas: [
			"hola",
			"perro",
			"pera",
			"casa",
			"gato",
			"pato",
			"palo",
			"perro",
			"pera",
			"casa",
			"gato",
			"pato",
			"palo",
		],
	},
	{
		id: 4,
		name: "The EPERStrikes Back",
		score: 95,
		isFlipped: false,
		palabrasUsadas: [
			"hola",
			"palabra2",
			"pera",
			"casa",
			"gato",
			"pato",
			"palo",
			"perro",
			"pera",
			"casa",
			"gato",
			"pato",
			"palo",
		],
	},
	{
		id: 5,
		name: "Laura",
		score: 88,
		isFlipped: false,
		palabrasUsadas: [
			"hola",
			"perro",
			"pera",
			"casa",
			"gato",
			"pato",
			"palo",
			"perro",
			"pera",
			"casa",
			"gato",
			"pato",
			"palo",
		],
	},
	{
		id: 6,
		name: "Pedro",
		score: 73,
		isFlipped: false,
		palabrasUsadas: [
			"hola",
			"perro",
			"pera",
			"casa",
			"gato",
			"pato",
			"palo",
			"perro",
			"pera",
			"casa",
			"gato",
			"pato",
			"palo",
		],
	},
	{
		id: 8,
		name: "Pedro",
		score: 73,
		isFlipped: false,
		palabrasUsadas: [
			"hola",
			"perro",
			"pera",
			"casa",
			"gato",
			"pato",
			"palo",
			"perro",
			"pera",
			"casa",
			"gato",
			"pato",
			"palo",
		],
	},
	{
		id: 9,
		name: "Pedro",
		score: 73,
		isFlipped: false,
		palabrasUsadas: [
			"hola",
			"perro",
			"pera",
			"casa",
			"gato",
			"pato",
			"palo",
			"perro",
			"pera",
			"casa",
			"gato",
			"pato",
			"palo",
		],
	},
	{
		id: 10,
		name: "Los angeles de guido",
		score: 73,
		isFlipped: false,
		palabrasUsadas: [
			"hola",
			"perro",
			"pera",
			"casa",
			"gato",
			"pato",
			"palo",
			"perro",
			"pera",
			"casa",
			"gato",
			"pato",
			"palo",
		],
	},
];

export default function CardsGame() {
	const [rituals, setRituals] = useState(mockedCards);
	const [winner, setWinner] = useState(null);
	const [usedWords, setUsedWords] = useState([]);
	const [areAllFlipped, setAreAllFlipped] = useState(false);

	const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

	useEffect(() => {
		setAreAllFlipped(rituals.every((card) => card.isFlipped));
	}, [rituals]);

	useEffect(() => {
		const allWords = rituals.flatMap((ritual) => ritual?.palabrasUsadas || []);

		const uniqueWords = Array.from(new Set(allWords));

		setUsedWords(uniqueWords);

		if (rituals.length > 0) {
			const winner = rituals.reduce((acc, ritual) =>
				acc.score >= ritual.score ? acc : ritual
			);
			setWinner(winner);
		} else {
			setWinner(null);
		}
	}, [rituals]);

	const flipRandomCard = async () => {
		setRituals((prevCards) =>
			prevCards.map((card) => ({ ...card, isFlipped: false }))
		);

		await delay(500);

		const shuffledCards = [...rituals].sort(() => Math.random() - 0.5);

		for (const card of shuffledCards) {
			setRituals((prevCards) =>
				prevCards.map((c) => (c.id === card.id ? { ...c, isFlipped: true } : c))
			);

			await delay(500);
		}
	};

	const flipCard = (id) => {
		setRituals((prevCards) =>
			prevCards.map((card) => {
				if (card.id === id) {
					return { ...card, isFlipped: !card.isFlipped };
				}
				return card;
			})
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
					{rituals.map((ritual) => {
						return (
							<Card
								key={ritual.id}
								name={ritual.name}
								score={ritual.score}
								isFlipped={ritual.isFlipped}
								onFlip={() => flipCard(ritual.id)}
							/>
						);
					})}
				</div>
				{areAllFlipped && (
					<WinnerComponent ritual={winner} usedWords={usedWords} />
				)}
			</div>
		</div>
	);
}
