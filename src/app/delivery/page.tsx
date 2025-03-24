import { FaChevronLeft } from "react-icons/fa6";
import Image from "next/image";
import Counter from "@/components/Basket-Components/Counter";
import Link from "next/link";
import prisma from "@/lib/db";
import ClearItems from "@/components/Basket-Components/ClearItems";
import { totalPrice } from "@/actions/actions";
import DeleteItem from "@/components/Basket-Components/DeleteItem";
import DeliveryForm from "@/components/DeliveryForm";

export default async function Delivery() {
	const basketItems = await prisma.basket.findMany();
	const orderedItems = await prisma.orderedItem.findMany();

	return (
		<div className="md:h-[calc(100vh-11vh)] bg-slate-100 dark:bg-black/40 max-w-[1250px] mx-auto font-semibold tracking-wider rounded-md">
			{basketItems.length === 0 ? (
				<div className="w-full md:w-[55%] lg:w-[45%] h-[25vh] mx-auto flex flex-col gap-y-6 justify-center items-center sm:rounded-md md:pt-14">
					<span className="text-lg">No item selected yet 😏</span>
					<Link
						href="/"
						className="flex bg-gradient-green bg-gradient-green-hover text-white transition-all rounded-md py-3 px-4"
					>
						Go to menu
					</Link>
				</div>
			) : (
				<div>
					{/* Header */}
					<div className="flex justify-between items-center w-full h-10 py-8 px-3">
						<Link href="/" className="flex items-center cursor-pointer">
							<FaChevronLeft className="size-6" />
							<span className="pl-2 font-semibold">Back</span>
						</Link>

						<span className="font-bold tracking-wide">
							Cart ({basketItems.length})
						</span>
						<ClearItems />
					</div>

					{/* Basket */}
					<div className="w-full px-3 py-10  md:h-[36vh] overflow-y-scroll no-scrollbar">
						{basketItems.map((item) => (
							<div key={item.id} className="mb-8">
								<div className="flex items-start justify-between">
									<Image
										width={200}
										height={200}
										src={item.itemImg}
										alt={item.itemName}
										className="w-[7rem] sm:w-[10rem]"
									/>
									<div className="flex flex-col md:items-center md:justify-between md:flex-row-reverse gap-y-4 w-[15rem] md:w-[30rem]">
										<div className="flex justify-between gap-x-6">
											<div>
												<h2 className="font-semibold text-lg text-gray-700 dark:text-gray-300">
													{item.itemName}
												</h2>
												<p className="hidden text-sm text-gray-500 dark:text-gray-300 font-medium">
													{item.itemDescription}
												</p>
											</div>
											<DeleteItem itemId={item.id} />
										</div>

										<div className="flex justify-between gap-x-10">
											<Counter index={item.id} initialCount={item.itemCount} />
											<p className="font-semibold text-gray-700 dark:text-gray-300">
												{item.itemPrice}.99 zł
											</p>
										</div>
									</div>
								</div>
							</div>
						))}

						<span className="text-2xl pr-2 font-bold text-gray-700 dark:text-gray-300">
							Total: {totalPrice()} zł
						</span>
					</div>

					{/* Contact information */}
					<DeliveryForm basketItems={basketItems} orderedItems={orderedItems} />
				</div>
			)}
		</div>
	);
}
