"use client";
import { addItem } from "@/actions/actions";
import { ItemsType, SelectedItemType } from "@/lib/types";
import toast from "react-hot-toast";
import { FaCartShopping } from "react-icons/fa6";
import clsx from "clsx";
import { useState, useCallback } from "react";

const pizzaVolumes = [24, 29, 34, 39];
const sauceVolumes = [25, 50];
const drinkVolumes = [0.5, 0.85, 1.5];
const creamVolumes = [100, 465];

type VolumePriceMap = {
	[key: number]: number;
};

const calculateDrinkPrice = (
	volumeNum: number,
	itemCategory: string,
): number => {
	const priceMap: { [key: string]: VolumePriceMap } = {
		pizza: { 24: 29.99, 29: 37.99, 34: 42.99, 39: 47.99 },
		sauce: { 25: 2.99, 50: 5.99 },
		drink: { 0.5: 6.99, 0.85: 9.99, 1.5: 14.99 },
		cream: { 100: 18.99, 465: 39.99 },
	};

	return priceMap[itemCategory]?.[volumeNum] || 0;
};

const getVolumesByCategory = (itemCategory: string) => {
	switch (itemCategory) {
		case "pizza":
			return pizzaVolumes;
		case "sauce":
			return sauceVolumes;
		case "drink":
			return drinkVolumes;
		case "cream":
			return creamVolumes;
		default:
			return [];
	}
};

export default function AddToCart({
	product,
	index = 0,
}: {
	product: ItemsType;
	index?: number;
}) {
	const [selectedVolume, setSelectedVolume] = useState<SelectedItemType>({});
	const [productPrice, setProductPrice] = useState<SelectedItemType>({});

	const handleAddItem = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			await addItem(product.id, productPrice[index]);
			toast.success("Item added successfully 🥳");
		} catch (error) {
			console.error("Error adding product:", error);
		}
	};

	const handleChangeItemVolume = useCallback(
		(volumeId: number, volume: number, itemCategory: string) => {
			setSelectedVolume((prevVolume) => ({
				...prevVolume,
				[volumeId]: volume,
			}));

			const itemPrice = calculateDrinkPrice(volume, itemCategory);
			setProductPrice((prevPrices) => ({
				...prevPrices,
				[volumeId]: itemPrice,
			}));
		},
		[],
	);

	const volumesToMap = getVolumesByCategory(product.itemCategory);

	return (
		<>
			<div className="flex rounded-sm my-6 border border-gray-200 dark:border-slate-700">
				{volumesToMap.map((volume: number, idx: number) => {
					const isSelected =
						selectedVolume[index] === volume ||
						(idx === 0 && !selectedVolume[index]);
					const volumeLabel = isSelected
						? `${volume} ${
								product.itemCategory === "pizza"
									? "SM"
									: product.itemCategory === "drink"
									? "L"
									: "ML"
						  }`
						: volume;

					return (
						<div
							key={idx}
							className={clsx(
								"w-full text-center py-3 sm:py-2 relative text-sm cursor-pointer rounded-sm text-gray-600 dark:text-gray-400",
								{
									"bg-gray-200 text-gray-700 dark:bg-slate-700": isSelected,
								},
							)}
							onClick={() =>
								handleChangeItemVolume(index, volume, product.itemCategory)
							}
						>
							{volumeLabel}
						</div>
					);
				})}
			</div>

			<div className="flex justify-between items-end mt-10">
				<div className="text-md text-gray-700 dark:text-gray-400 font-bold pr-2">
					<span>{productPrice[index] || product.itemPrice + "." + 99} zł</span>
				</div>

				<form onSubmit={handleAddItem}>
					<button className="bg-gradient-green bg-gradient-green-hover flex place-items-center text-sm transition-all text-white content-start font-semibold px-4 py-3 sm:py-2 rounded-md tracking-wider">
						Add to
						<FaCartShopping className="ml-2" />
					</button>
				</form>
			</div>
		</>
	);
}
