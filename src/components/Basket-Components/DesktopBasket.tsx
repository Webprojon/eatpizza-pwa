import basket from "../../../public/general-imgs/basket.png";
import Image from "next/image";
import animpizza from "../../../public/general-imgs/animpizza.png";
import { basketDetails, totalPrice } from "@/actions/actions";
import ClearItems from "./ClearItems";
import DeleteItem from "./DeleteItem";
import Counter from "./Counter";
import DeliveryCheckBtn from "./DeliveryCheckBtn";

export default async function DesktopBasket() {
	const basketItems = await basketDetails();

	return (
		<div
			className="hidden lg:flex flex-col sticky top-[6.2rem] lg:w-[16rem] xl:w-[18rem] h-max bg-slate-100 rounded-md shadow-md
		pb-4 dark:bg-black/40"
		>
			<div className="flex items-center justify-between p-3 border-b border-gray-300 dark:border-gray-700">
				<span className="font-bold text-lg">Cart</span>
				<Image
					src={animpizza}
					alt="circle pizza"
					className="animate-spin-3s hover:animate-none w-[2.2em] h-[2.2rem]"
				/>
			</div>

			{basketItems.length !== 0 && (
				<div className="flex items-center justify-between w-full tracking-wider px-3 py-2">
					<span>({basketItems.length})</span>
					<ClearItems />
				</div>
			)}

			{basketItems.length === 0 ? (
				<div className="mt-5 mb-3 flex flex-col items-center gap-y-6">
					<Image src={basket} alt="basket" className="mt-4 w-[22vh]" />
					<p className="animate-pulse text-[15px] text-center px-3 text-gray-600 dark:text-gray-300 font-medium">
						Your cart is empty. Add items from the menu.
					</p>
				</div>
			) : (
				<>
					<div className="h-[25vh] overflow-y-scroll no-scrollbar border-b border-gray-300 dark:border-gray-700 px-3">
						{basketItems.map((item) => (
							<div key={item.id} className="mb-4">
								<div className="mb-3 last:mb-1 relative flex justify-between">
									<Image
										width={200}
										height={200}
										src={item.itemImg}
										alt={item.itemName}
										className="w-[3.8rem]"
									/>
									<div className="ml-3">
										<h2 className="text-gray-800 text-sm font-bold tracking-wider dark:text-gray-300">
											{item.itemName}
										</h2>
										<div className="flex pt-[.3rem] text-gray-700 dark:text-gray-300 text-xs font-semibold tracking-wide">
											<span
												className={
													item.itemCategory === "pizza"
														? `block pr-4`
														: "hidden"
												}
											>
												traditional
											</span>
										</div>
									</div>
									<DeleteItem itemId={item.id} />
								</div>
								<div className="flex items-end justify-between w-full">
									<Counter index={item.id} initialCount={item.itemCount} />
									<span className="font-semibold text-xs tracking-wider text-gray-700 dark:text-gray-300">
										{item.itemPrice} zł
									</span>
								</div>
							</div>
						))}
					</div>

					<div className="flex flex-col gap-y-4 tracking-wider font-semibold mt-4 px-3">
						<div className="flex items-center justify-between text-[18px]">
							<span>Total:</span>
							<span>{totalPrice()} zł</span>
						</div>
						<DeliveryCheckBtn
							basketItems={basketItems}
							className="flex items-center justify-center bg-gradient-green bg-gradient-green-hover font-semibold text-white transition-all rounded-md py-[.5rem] px-3"
						>
							Order Now
						</DeliveryCheckBtn>
					</div>
				</>
			)}
		</div>
	);
}
