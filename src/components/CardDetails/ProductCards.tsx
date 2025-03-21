"use client";
import Image from "next/image";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useState } from "react";
import { fadeInAnimationsVariants } from "@/lib/motion-anim";
import { motion } from "framer-motion";
import { IoSearchOutline } from "react-icons/io5";
import { Products } from "@prisma/client";
import { useGlobalContext } from "@/context/global-context";
import AddToCart from "./AddToCart";

export default function ProductCards({ products }: { products: Products[] }) {
	const [items, setItems] = useState(products);
	const { selectValue, setSelectValue } = useGlobalContext();
	const [searchValue, setSearchValue] = useState<string>("");

	useEffect(() => {
		const handleFilterBySelectValue = (selectValue: string) => {
			const categories: { [key: string]: string } = {
				pizzas: "pizza",
				sauces: "sauce",
				drinks: "drink",
				creams: "cream",
			};

			return selectValue in categories
				? products.filter(
						(product) => product.itemCategory === categories[selectValue],
					)
				: products;
		};

		const selectedItems = handleFilterBySelectValue(selectValue);
		setItems(selectedItems);
	}, [selectValue, products]);

	const handleSelectValue = (event: ChangeEvent<HTMLSelectElement>) => {
		setSelectValue(event.target.value);
	};

	const handleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
		const target = event.currentTarget as HTMLSpanElement;
		const value = target.innerText.toLowerCase();
		setSelectValue(value);
	};

	const filteredItems = items.filter((item) =>
		searchValue
			? item.itemName.toLowerCase().includes(searchValue.toLowerCase())
			: true,
	);

	const spanStyles = (category: string) => {
		return `hover:bg-slate-200 hover:dark:bg-black/60 py-[.6rem] sm:py-[.5rem] px-3 rounded-md cursor-pointer bg-slate-100 dark:bg-black/40 ${selectValue === category && "bg-slate-200 dark:bg-black/60"}`;
	};

	return (
		<div>
			<form className="md:w-[600px] lg:w-[899px] flex flex-col justify-between sm:flex-row gap-x-6 gap-y-4 items-start mb-4">
				<select
					name="categories"
					value={selectValue}
					onChange={handleSelectValue}
					className="hidden sm:flex lg:hidden appearance-none bg-slate-100 rounded-md py-[.7rem] sm:py-[.5rem] px-4 tracking-wider
				dark:bg-black/40 text-gray-600 dark:text-gray-300 cursor-pointer outline-none"
				>
					<option value="all">All products</option>
					<option value="pizzas">Pizzas</option>
					<option value="sauces">Sauces</option>
					<option value="drinks">Drinks</option>
					<option value="creams">Ice creams</option>
				</select>

				<div className="hidden xl:flex gap-x-4 tracking-wider">
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

				<div
					className="flex items-center gap-[.6rem] text-gray-600 dark:text-gray-300 bg-slate-100 rounded-md dark:bg-black/40 
					py-[.7rem] sm:py-[.5rem] px-2 w-full md:w-min"
				>
					<IoSearchOutline className="size-5" />
					<input
						type="text"
						value={searchValue}
						placeholder="Search here..."
						onChange={(e) => setSearchValue(e.target.value)}
						className="tracking-wider bg-transparent outline-none placeholder:text-gray-600 dark:placeholder:text-gray-300"
					/>
				</div>
			</form>

			{filteredItems.length === 0 && (
				<span className="text-lg tracking-wider">Product not found 🤷‍♂️</span>
			)}

			<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8 mb-[5.5rem] sm:mb-0">
				{filteredItems.map((product, index) => (
					<motion.div
						variants={fadeInAnimationsVariants}
						initial="initial"
						whileInView="animate"
						viewport={{
							once: true,
						}}
						custom={index}
						key={index}
						className="rounded-md overflow-hidden shadow-xl bg-slate-100 dark:bg-black/40 backdrop-blur-sm"
					>
						<div className="p-4 rounded-sm transition-all">
							<Link href={`/menu/${product.id}`}>
								<Image
									className={`mx-auto
									${
										product.itemCategory == "pizza"
											? "h-[8.5rem] w-[9rem] sm:h-[11rem] sm:w-[11rem] hover:animate-spin-17s"
											: "h-[8rem] w-[9rem]"
									}
									`}
									src={product.itemImg}
									width={200}
									height={200}
									alt="sale product"
								/>
							</Link>
						</div>
						<div className="p-4">
							<h2 className="tracking-wider font-semibold text-sm lg:text-xl dark:text-gray-400">
								{product.itemName}
							</h2>
							<div className="hidden sm:block">
								<p className="tracking-wide w-[14rem] py-1 text-gray-600 dark:text-gray-400 line-clamp-2">
									{product.itemDescription}
								</p>
								<AddToCart product={product} index={index} />
							</div>
						</div>
					</motion.div>
				))}
			</div>
		</div>
	);
}
