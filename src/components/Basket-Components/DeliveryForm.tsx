"use client";
import { Basket, OrderedItem } from "@prisma/client";
import { submitOrders } from "@/actions/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useFcmToken from "@/hooks/useFcmToken";
import Inputs from "../Inputs";

export default function DeliveryForm({
	basketItems,
	orderedItems,
}: {
	basketItems: Basket[];
	orderedItems: OrderedItem[];
}) {
	const { token } = useFcmToken();
	const [userName, setUserName] = useState("");
	const [userPhoneNumber, setUserPhoneNumber] = useState("");
	const [userStreet, setUserStreet] = useState("");
	const [userFlatNumber, setUserFlatNumber] = useState("");
	const [userFloorNumber, setUserFloorNumber] = useState("");
	const router = useRouter();

	const handleAddItem = async (e: React.FormEvent) => {
		e.preventDefault();
		const formData = {
			userName,
			userPhoneNumber,
			userStreet,
			userFlatNumber,
			userFloorNumber,
		};

		try {
			await submitOrders(basketItems, formData);
			router.push("/");
		} catch (error) {
			console.error("Error submitting order:", error);
		}
	};

	const handleTestNotification = async () => {
		const response = await fetch("/send-notification", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				token: token,
				title: "Order Confirmed!",
				message:
					"Thank you! Your delicious pizza is being prepared and will be delivered shortly.",
				link: "/",
			}),
		});

		const data = await response.json();
		console.log(data);
	};

	return (
		<div className="px-3 pt-5 pb-20 h-[45vh] overflow-y-scroll no-scrollbar">
			<h2 className="mb-2 font-bold text-gray-600 dark:text-gray-300 tracking-wider text-lg">
				Contact information
			</h2>

			<form onSubmit={handleAddItem} className="relative flex flex-col gap-y-4">
				<div className="flex flex-col md:flex-row gap-6">
					<Inputs
						name="username"
						placeholder="Your name"
						onChange={(e) => setUserName(e.target.value)}
						value={orderedItems[0] && orderedItems[0].username}
					/>
					<div className="tracking-wider py-3 px-4 rounded-md bg-transparent border text-gray-500 dark:text-gray-300 border-gray-400 dark:border-gray-700">
						<span className="mr-[.3rem]">+48</span>
						<input
							required
							type="number"
							autoComplete="off"
							name="userphonenumber"
							placeholder="576 375 586"
							onChange={(e) => setUserPhoneNumber(e.target.value)}
							value={orderedItems[0] && orderedItems[0].phoneNumber}
							className="placeholder:text-gray-500 outline-none bg-transparent dark:placeholder:text-gray-300"
						/>
					</div>
					<Inputs
						name="userstreet"
						placeholder="Street"
						onChange={(e) => setUserStreet(e.target.value)}
						value={orderedItems[0] && orderedItems[0].street}
					/>
					<div className="flex gap-x-4">
						<Inputs
							type="number"
							placeholder="Flat"
							className="w-[8rem]"
							name="userflatnumber"
							value={orderedItems[0] && orderedItems[0].flat}
							onChange={(e) => setUserFlatNumber(e.target.value)}
						/>
						<Inputs
							type="number"
							placeholder="Floor"
							className="w-[8rem]"
							name="userfloornumber"
							value={orderedItems[0] && orderedItems[0].floor}
							onChange={(e) => setUserFloorNumber(e.target.value)}
						/>
					</div>
				</div>

				<div className="flex gap-4 md:self-end">
					<button
						disabled={!token}
						onClick={handleTestNotification}
						className="w-full self-start bg-gradient-green font-semibold tracking-wider text-white p-3 rounded-md transition-all
					mt-[1.5rem]"
					>
						Confirm Orders
					</button>
				</div>
			</form>
		</div>
	);
}
