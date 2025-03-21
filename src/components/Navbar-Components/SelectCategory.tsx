"use client";
import { useGlobalContext } from "@/context/global-context";
import { useState } from "react";
import { VscSettings } from "react-icons/vsc";

export default function SelectCategory() {
	const [isOpen, setIsOpen] = useState(false);
	const { selectValue, setSelectValue } = useGlobalContext();

	const handleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
		const target = event.currentTarget as HTMLSpanElement;
		const value = target.innerText.toLowerCase();
		setSelectValue(value);
		toggleModal();
	};

	const toggleModal = () => {
		setIsOpen(!isOpen);
	};

	const spanStyles = (category: string) => {
		return `${selectValue === category && "text-slate-400 dark:text-slate-500"}`;
	};

	return (
		<div>
			<div
				className={`absolute top-[4.7rem] right-[.5rem] px-6 py-3 flex flex-col gap-y-4 text-lg sm:hidden bg-slate-100 dark:bg-slate-900 rounded-md
				${isOpen ? "flex" : "hidden"}
				`}
			>
				<span className={spanStyles("all products")} onClick={handleClick}>
					All Products
				</span>
				<span className={spanStyles("pizzas")} onClick={handleClick}>
					Pizzas
				</span>
				<span className={spanStyles("sauces")} onClick={handleClick}>
					Sauces
				</span>
				<span className={spanStyles("drinks")} onClick={handleClick}>
					Drinks
				</span>
				<span className={spanStyles("creams")} onClick={handleClick}>
					Creams
				</span>
			</div>

			<VscSettings onClick={toggleModal} className="sm:hidden size-6" />
		</div>
	);
}
