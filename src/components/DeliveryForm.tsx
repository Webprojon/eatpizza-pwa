"use client";
import { Basket, OrderedItem } from "@prisma/client";
import Inputs from "./Inputs";
import { submitOrders } from "@/actions/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useFcmToken from "@/hooks/useFcmToken";

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
		<div className="px-3 py-5">
			<h2 className="mb-2 font-bold text-gray-600 dark:text-gray-300 tracking-wider text-lg">
				Contact information
			</h2>

			<form onSubmit={handleAddItem} className="relative flex flex-col gap-y-4">
				<div className="flex flex-col md:flex-row gap-6">
					<Inputs
						name="username"
						onChange={(e) => setUserName(e.target.value)}
						placeholder={
							orderedItems[0] ? orderedItems[0].username : "Your name"
						}
					/>
					<Inputs
						type="number"
						name="userphonenumber"
						onChange={(e) => setUserPhoneNumber(e.target.value)}
						placeholder={
							orderedItems[0] ? orderedItems[0].phoneNumber : "+48 576 375 586"
						}
					/>
					<Inputs
						name="userstreet"
						placeholder={orderedItems[0] ? orderedItems[0].street : "Street"}
						onChange={(e) => setUserStreet(e.target.value)}
					/>
					<div className="flex gap-x-4">
						<Inputs
							type="number"
							className="w-[8rem]"
							name="userflatnumber"
							onChange={(e) => setUserFlatNumber(e.target.value)}
							placeholder={orderedItems[0] ? orderedItems[0].flat : "Flat"}
						/>
						<Inputs
							name="userfloornumber"
							placeholder={orderedItems[0] ? orderedItems[0].floor : "Floor"}
							className="w-[8rem]"
							onChange={(e) => setUserFloorNumber(e.target.value)}
						/>
					</div>
				</div>
				<button
					disabled={!token}
					onClick={handleTestNotification}
					className="self-end bg-gradient-green font-semibold tracking-wider text-white px-3 py-2 rounded-md transition-all
							mt-[1.5rem]"
				>
					Confirm Orders
				</button>
			</form>
		</div>
	);
}
