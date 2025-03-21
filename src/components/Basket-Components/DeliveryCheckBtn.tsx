"use client";
import { useGlobalContext } from "@/context/global-context";
import { Basket } from "@prisma/client";
import toast from "react-hot-toast";
type DeliveryCheckBtnProps = {
	children: React.ReactNode;
	basketItems: Basket[];
	className: string;
};

export default function DeliveryCheckBtn({
	children,
	basketItems,
	className,
}: DeliveryCheckBtnProps) {
	const { setIsDeliveryPageOpen } = useGlobalContext();

	const handleBtn = () => {
		if (basketItems.length !== 0) {
			setIsDeliveryPageOpen(true);
		} else {
			toast.error("You should have at least one item !");
		}
	};

	return (
		<button onClick={handleBtn} className={`${className}`}>
			{children}
		</button>
	);
}
