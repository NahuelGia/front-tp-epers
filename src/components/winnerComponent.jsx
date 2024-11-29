import { ArrowDown } from "lucide-react";
import { useRef } from "react";
import { BouncingBall } from "./bouncingBall";

const palabrasPosibles = [
	"hola",
	"perro",
	"pera",
	"casa",
	"gato",
	"pato",
	"palo",
];

export function WinnerComponent({ ritual }) {
	const winnerCardRef = useRef(null);

	const scrollToWinnerCard = () => {
		winnerCardRef.current.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<>
			{/* Bouncing ball */}
			<BouncingBall onClick={scrollToWinnerCard} />

			{/* Winner card */}
			<div ref={winnerCardRef} className="pt-[5rem] text-white pb-[10rem]">
				<div className="flex justify-center">
					<h1 className="text-[3rem] font-bold">{ritual.name}</h1>
				</div>
				<div className="p-8 text-white space-y-8">
					<div className="flex space-x-2 text-[2.5rem]">
						<p>Puntos:</p>
						<p>{ritual.score}</p>
					</div>
					<div className="text-[2.5rem]">
						<p className="pb-3">Palabras usadas:</p>
						<div className="flex flex-wrap border-2 border-blue-400 rounded-lg bg-white p-4 gap-4">
							{ritual.palabrasUsadas.map((word, index) => (
								<span
									key={index}
									className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-[2rem]"
								>
									{word}
								</span>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Total words against used card */}
			<div>
				<div className="flex justify-center pb-4">
					<h1 className="text-white font-bold text-[3rem]">
						Estas son las palabras
					</h1>
				</div>
				<div className="flex flex-wrap border-2 border-blue-400 rounded-lg bg-white p-4 gap-4">
					{palabrasPosibles.map((word, index) => (
						<span
							key={index}
							className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-[2rem]"
						>
							{word}
						</span>
					))}
				</div>
			</div>
		</>
	);
}
