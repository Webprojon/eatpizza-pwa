"use client";
import { FaChevronLeft } from "react-icons/fa6";
import Counter from "@/components/Basket-Components/Counter";
import DeleteItem from "@/components/Basket-Components/DeleteItem";
import Image from "next/image";
import ClearItems from "@/components/Basket-Components/ClearItems";
import { Basket, OrderedItem } from "@prisma/client";
import { useGlobalContext } from "@/context/global-context";
import DeliveryForm from "./DeliveryForm";

type DeliveryDetailsProps = {
	basketItems: Basket[];
	orderedItems: OrderedItem[];
	sum: number;
};

export default function DeliveryDetails({
	basketItems,
	orderedItems,
	sum,
}: DeliveryDetailsProps) {
	const { isDeliveryPageOpen, setIsDeliveryPageOpen } = useGlobalContext();

	return (
		<div
			className={`fixed top-16 sm:top-20 h-[calc(100vh-8vh)] bg-slate-100 dark:bg-slate-900 w-full max-w-[1250px] mx-auto
		 font-semibold tracking-wider rounded-md ${isDeliveryPageOpen ? "flex" : "hidden"}`}
		>
			<div className="mb-[5.7rem] w-full">
				{/* Header */}
				<div className="flex justify-between items-center w-full h-10 py-8 px-3">
					<div
						onClick={() => setIsDeliveryPageOpen(false)}
						className="flex items-center cursor-pointer"
					>
						<FaChevronLeft className="size-6" />
						<span className="pl-2 font-semibold">Back</span>
					</div>

					<span className="font-bold tracking-wide">
						Cart ({basketItems.length})
					</span>
					<ClearItems />
				</div>

				{/* Basket */}
				<div className="w-full px-3 py-10 h-[36vh] overflow-y-scroll no-scrollbar">
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
						Total: {sum} zł
					</span>
				</div>

				{/* Contact information */}
				<DeliveryForm basketItems={basketItems} orderedItems={orderedItems} />
			</div>
		</div>
	);
}
