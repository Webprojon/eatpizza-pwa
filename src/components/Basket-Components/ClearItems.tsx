"use client";
import { clearItems } from "@/actions/actions";
import { useGlobalContext } from "@/context/global-context";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ClearItems() {
	const { setIsDeliveryPageOpen } = useGlobalContext();

	const handleClear = async () => {
		try {
			await clearItems();
			toast.error("All Items cleared!");
			await new Promise((resolve) => setTimeout(resolve, 1500));
			setIsDeliveryPageOpen(false);
		} catch (error) {
			console.error("Error clearing basket:", error);
		}
	};

	return (
		<Link href="/" onClick={handleClear}>
			Clear
		</Link>
	);
}
