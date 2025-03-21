"use client";
import { deleteItem } from "@/actions/actions";
import toast from "react-hot-toast";
import { CgClose } from "react-icons/cg";

export default function DeleteItem({ itemId }: { itemId: string }) {
	const handleDelete = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await deleteItem(itemId);
			toast.error("Item deleted!");
		} catch (error) {
			console.error("Error deleting product:", error);
		}
	};

	return (
		<form onSubmit={handleDelete}>
			<button>
				<CgClose />
			</button>
		</form>
	);
}
