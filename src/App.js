import { useEffect, useState } from "react";
import { Card } from "./components/card";

import { Shuffle } from "lucide-react";
import FlipCardButton from "./components/flipCardButton";
import { WinnerComponent } from "./components/winnerComponent";
import { Wheel } from "react-custom-roulette";
import axios from "axios";

const mockedCards = [
	{
		id: 1,
		name: "Persistir a lo Gradle",
		score: 95,
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
	const [rituals, setRituals] = useState([]);
	const [winner, setWinner] = useState(null);
	const [usedWords, setUsedWords] = useState([]);
	const [areAllFlipped, setAreAllFlipped] = useState(false);
	const [isTie, setIsTie] = useState(false);
	const [tiePlayers, setTiePlayers] = useState([]);
	const [prizeIndex, setPrizeIndex] = useState(null);
	const [startSpin, setStartSpin] = useState(false);
	const [mustStopAtIndex, setMustStopAtIndex] = useState(0);

	const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

	useEffect(() => {
		const fetchData = async () => {
			const res = await axios.get("http://localhost:8080/ritual");
			setRituals(res.data);
		};
		fetchData();
	}, []);

	useEffect(() => {
		setAreAllFlipped(rituals.every((card) => card.isFlipped));
	}, [rituals]);

	useEffect(() => {
		// collect used words
		const allWords = rituals.flatMap((ritual) => ritual?.palabrasUsadas || []);

		const uniqueWords = Array.from(new Set(allWords));

		setUsedWords(uniqueWords);

		// Handle winner
		if (rituals.length > 0) {
			const maxScore = Math.max(...rituals.map((ritual) => ritual.puntaje));
			const topPlayers = rituals.filter((ritual) => ritual.puntaje === maxScore);

			if (topPlayers.length > 1) {
				// Tie case
				setIsTie(true);
				setTiePlayers(topPlayers);
			} else {
				// Winner case
				setWinner(topPlayers[0]);
				setIsTie(false);
				setTiePlayers([]);
			}
		} else {
			setWinner(null);
			setIsTie(false);
			setTiePlayers([]);
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

	const wheelData = tiePlayers.map((player, index) => ({
		option: player.name,
		style: {
			backgroundColor: index % 2 === 0 ? "#7bbf2b" : "#080808",
			textColor: index % 2 === 0 ? "#080808" : "#ffff",
		},
	}));

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
								name={ritual.nombre}
								score={ritual.puntaje}
								isFlipped={ritual.isFlipped}
								onFlip={() => flipCard(ritual.id)}
							/>
						);
					})}
				</div>
				{areAllFlipped && winner && (
					<WinnerComponent ritual={winner} usedWords={usedWords} />
				)}
			</div>

			{isTie && areAllFlipped && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
					<div className="bg-white rounded-lg p-8">
						<h2 className="text-2xl font-bold mb-4">¡Empate!</h2>
						<p>Los jugadores empatados son:</p>
						<ul className="mb-4">
							{tiePlayers.map((player) => (
								<li key={player.id} className="text-lg">
									{player.nombre} (Score: {player.puntaje})
								</li>
							))}
						</ul>
						<div className="parent-container">
							<Wheel
								mustStartSpinning={startSpin}
								prizeNumber={0}
								data={wheelData}
								onStopSpinning={() => {
									const winner = tiePlayers[prizeIndex];
									setWinner(winner);
									setIsTie(false);
									setStartSpin(false);
								}}
								fontSize={18}
								outerBorderColor="#5a616f"
								outerBorderWidth={8}
								innerBorderColor="#5a616f"
								radiusLineColor="#5a616f"
								innerBorderWidth={6}
								innerRadius={5}
							/>
						</div>

						<button
							onClick={() => {
								const randomIndex = Math.floor(
									Math.random() * tiePlayers.length
								);
								setPrizeIndex(randomIndex);
								setStartSpin(true);
								setMustStopAtIndex(1);
							}}
							className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700"
						>
							Girar Ruleta
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
