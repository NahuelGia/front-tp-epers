export function Card({ name, score, isFlipped, onFlip }) {
	return (
		<div className="perspective">
			<div
				className={`relative w-full h-48 transition-transform duration-700 transform-style-preserve-3d cursor-pointer
					${isFlipped ? "rotate-y-180" : ""}`}
				onClick={onFlip}
			>
				{/* Frente de la carta */}
				<div className="absolute overflow-hidden w-full h-full backface-hidden bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl p-6 flex flex-col justify-center items-center text-white shadow-xl">
					<h2 className="text-[2rem] font-bold">{name}</h2>
				</div>

				{/* Reverso de la carta */}
				<div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl p-6 flex flex-col justify-center items-center text-white shadow-xl">
					<p className="text-[3rem]">Puntaje</p>
					<p className="text-[2.5rem] font-bold mt-2">{score}</p>
				</div>
			</div>
		</div>
	);
}
