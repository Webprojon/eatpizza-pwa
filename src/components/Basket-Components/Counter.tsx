"use client";
import { decrementItem, deleteItem, incrementItem } from "@/actions/actions";
import toast from "react-hot-toast";
import { FaMinus, FaPlus } from "react-icons/fa6";

export default function Counter({
	index,
	initialCount,
}: {
	index: string;
	initialCount: number;
}) {
	const handleIncrement = async () => {
		await incrementItem(index);
	};

	const handleDecrement = async () => {
		await decrementItem(index);
		if (initialCount <= 1) {
			await deleteItem(index);
			toast.error("You should have at least one item 😏");
		}
	};

	return (
		<div className="flex items-center justify-between w-[6rem]">
			<button onClick={handleDecrement}>
				<FaMinus
					className="hover:scale-90 transition-all bg-gradient-green text-white
					size-[1.4rem] rounded-full p-1 cursor-pointer"
				/>
			</button>

			<span>{initialCount}</span>

			<button onClick={handleIncrement}>
				<FaPlus
					className="hover:scale-110 transition-all bg-gradient-green text-white
					size-[1.4rem] rounded-full p-1 cursor-pointer"
				/>
			</button>
		</div>
	);
}
