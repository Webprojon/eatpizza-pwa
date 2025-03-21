"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/db";
import { Basket, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";

/////////////////////////////////////////////////////////////////////
export async function addItem(productId: string, productPrice: number) {
	// Authentication check
	const { isAuthenticated } = getKindeServerSession();
	if (!(await isAuthenticated())) {
		redirect("/api/auth/login");
	}

	try {
		const product = await prisma.product.findUnique({
			where: {
				id: productId.toString(),
			},
		});

		if (!product) {
			throw new Error("Product not found");
		}

		const newItem = await prisma.basket.create({
			data: {
				itemCount: 1,
				productId: product.id,
				itemImg: product.itemImg,
				itemName: product.itemName,
				itemCategory: product.itemCategory,
				itemDescription: product.itemDescription,
				itemPrice: productPrice || product.itemPrice,
			},
		});

		if (!newItem) {
			throw new Error("Failed to create new item in the basket.");
		}

		revalidatePath("/");
	} catch (error) {
		console.log(error);
	}
}

/////////////////////////////////////////////////////////////////////
export async function submitOrders(
	basketItems: Basket[],
	formData: {
		userName: string;
		userPhoneNumber: string;
		userStreet: string;
		userFlatNumber: string;
		userFloorNumber: string;
	},
) {
	const {
		userName,
		userPhoneNumber,
		userStreet,
		userFlatNumber,
		userFloorNumber,
	} = formData;

	try {
		const orderData = basketItems.map((item) => ({
			id: randomUUID(),
			orderId: randomUUID(),
			orderName: item.itemName,
			orderCategory: item.itemCategory,
			orderImg: item.itemImg,
			orderCount: item.itemCount,
			orderPrice: item.itemPrice,
			ordertotalPrice: item.itemCount * item.itemPrice,

			username: userName,
			phoneNumber: userPhoneNumber,
			street: userStreet,
			flat: userFlatNumber,
			floor: userFloorNumber,
			createdAt: new Date(),
			updatedAt: new Date(),
		}));

		await prisma.orderedItem.createMany({
			data: orderData,
		});

		await prisma.basket.deleteMany();

		revalidatePath("/");
	} catch (error) {
		console.log(error);
	}
}

/////////////////////////////////////////////////////////////////////
export async function basketDetails() {
	const basketItems = await prisma.basket.findMany();
	return basketItems;
}

/////////////////////////////////////////////////////////////////////
export async function incrementItem(index: string) {
	try {
		const counter = await prisma.basket.update({
			where: {
				id: index,
			},
			data: {
				itemCount: {
					increment: 1,
				},
			},
		});

		if (!counter) {
			throw new Error("not counted");
		}

		revalidatePath("/");
	} catch (error) {
		console.log(error);
	}
}

/////////////////////////////////////////////////////////////////////
export async function decrementItem(index: string) {
	try {
		const counter = await prisma.basket.update({
			where: {
				id: index,
			},
			data: {
				itemCount: {
					decrement: 1,
				},
			},
		});

		if (!counter) {
			throw new Error("not counted");
		}

		revalidatePath("/");
	} catch (error) {
		console.log(error);
	}
}

/////////////////////////////////////////////////////////////////////
export async function totalPrice() {
	try {
		const total = await prisma.basket.aggregate({
			_sum: {
				itemPrice: true,
			},
		});

		return total._sum.itemPrice || 0;
	} catch (err) {
		console.error("Error calculating total price:", err);
		throw new Error("Unable to calculate total price");
	}
}

/////////////////////////////////////////////////////////////////////
export async function deleteItem(productId: string) {
	try {
		const deleteOneItem = await prisma.basket.delete({
			where: {
				id: productId,
			},
		});

		if (!deleteOneItem) {
			throw new Error("Product not found");
		}

		revalidatePath("/");

		return deleteOneItem;
	} catch (error) {
		console.error("Error deleting item:", error);
		throw error;
	}
}

/////////////////////////////////////////////////////////////////////
export async function clearItems() {
	try {
		const deleteOneItem = await prisma.basket.deleteMany();

		if (!deleteOneItem) {
			throw new Error("Product not found");
		}

		revalidatePath("/");

		return deleteOneItem;
	} catch (error) {
		console.error("Error deleting item:", error);
		throw error;
	}
}

/////////////////////////////////////////////////////////////////////
export async function submitFeedback(formData: FormData) {
	// Authentication check
	const { isAuthenticated } = getKindeServerSession();
	if (!(await isAuthenticated())) {
		redirect("/api/auth/login");
	}

	const userName = formData.get("username") as string;
	const userFeedback = formData.get("userfeedback") as string;

	try {
		await prisma.feedback.create({
			data: {
				userName: userName,
				userFeedback: userFeedback,
			},
		});
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			console.error("Prisma error code:", error.code);
		}
	}

	revalidatePath("/feedback");
}
