import { ArrowDown } from "lucide-react";

export function BouncingBall({ onClick }) {
	return (
		<div className="flex justify-center pt-[2.5rem]">
			<div
				className="animate-bounce w-16 h-16 bg-purple-500 rounded-full flex justify-center items-center cursor-pointer"
				onClick={onClick}
			>
				<ArrowDown size={30} color="white" />
			</div>
		</div>
	);
}
