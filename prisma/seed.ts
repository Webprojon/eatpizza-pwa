import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

const initialProducts: Prisma.ProductCreateInput[] = [
	{
		itemCategory: "pizza",
		itemImg: "/images/pizza1.webp",
		itemName: "Super Pizza",
		itemDescription:
			"Colorful and tempting veggie option: tomato sauce, mozzarella, mushrooms, tomatoes, red onions, green peppers and sweetcorn.",
		itemPrice: 29.99,
	},
	{
		itemCategory: "pizza",
		itemImg: "/images/pizza2.webp",
		itemName: "Margherita",
		itemDescription:
			"A classy choice: tomato sauce + wonderfully stretchy and gooey mozzarella cheese.",
		itemPrice: 29.99,
	},
	{
		itemCategory: "pizza",
		itemImg: "/images/pizza3.webp",
		itemName: "Pepperoni",
		itemDescription:
			"A treat for fans of spicy flavors: tomato sauce, mozzarella, pepperoni and jalapeño pepper.",
		itemPrice: 29.99,
	},
	{
		itemCategory: "pizza",
		itemImg: "/images/pizza4.webp",
		itemName: "Garden Party",
		itemDescription:
			"Colorful and tempting veggie option: tomato sauce, mozzarella, mushrooms, tomatoes, red onions, green peppers and sweetcorn.",
		itemPrice: 29.99,
	},

	{
		itemCategory: "pizza",
		itemImg: "/images/pizza5.webp",
		itemName: "Home Spring",
		itemDescription:
			"Traditional flavor with a hint of nostalgia: tomato sauce, mozzarella, Mediterranean cheese, grilled chicken, ham, tomatoes, green peppers, and white onions.",
		itemPrice: 29.99,
	},
	{
		itemCategory: "pizza",
		itemImg: "/images/pizza6.webp",
		itemName: "Margherita",
		itemDescription:
			"A classy choice: tomato sauce + wonderfully stretchy and gooey mozzarella cheese.",
		itemPrice: 29.99,
	},
	{
		itemCategory: "sauce",
		itemImg: "/images/sauce1.webp",
		itemName: "Ketchup",
		itemDescription: "Ketchup sauce heinz",
		itemPrice: 2.99,
	},
	{
		itemCategory: "sauce",
		itemImg: "/images/sauce2.webp",
		itemName: "Garlic",
		itemDescription: "Garlic sauce heinz",
		itemPrice: 2.99,
	},
	{
		itemCategory: "sauce",
		itemImg: "/images/sauce3.webp",
		itemName: "Ketchup",
		itemDescription: "Ketchup sauce heinz",
		itemPrice: 2.99,
	},
	{
		itemCategory: "drink",
		itemImg: "/images/drink1.webp",
		itemName: "Coca Cola",
		itemDescription: "Drink and fly",
		itemPrice: 9.99,
	},
	{
		itemCategory: "drink",
		itemImg: "/images/drink2.webp",
		itemName: "Fanta",
		itemDescription: "Drink and fly",
		itemPrice: 9.99,
	},
	{
		itemCategory: "drink",
		itemImg: "/images/drink3.webp",
		itemName: "Pepsi",
		itemDescription: "Drink and fly",
		itemPrice: 9.99,
	},
	{
		itemCategory: "drink",
		itemImg: "/images/drink4.webp",
		itemName: "Sprite",
		itemDescription: "Drink and fly",
		itemPrice: 9.99,
	},
	{
		itemCategory: "drink",
		itemImg: "/images/drink5.webp",
		itemName: "Orange Juice",
		itemDescription: "Drink and fly",
		itemPrice: 9.99,
	},
	{
		itemCategory: "drink",
		itemImg: "/images/drink6.webp",
		itemName: "Lipton Ice Tea",
		itemDescription: "Drink and fly",
		itemPrice: 9.99,
	},
	{
		itemCategory: "cream",
		itemImg: "/images/cream1.webp",
		itemName: "B&J Netflix Chilld",
		itemDescription: "Eat for dream come true",
		itemPrice: 18.98,
	},
	{
		itemCategory: "cream",
		itemImg: "/images/cream2.webp",
		itemName: "B&J Chocolate",
		itemDescription: "Eat for dream come true",
		itemPrice: 18.98,
	},
	{
		itemCategory: "cream",
		itemImg: "/images/cream3.webp",
		itemName: "B&J Love A Fair",
		itemDescription: "Eat for dream come true",
		itemPrice: 18.98,
	},
];

async function main() {
	for (const product of initialProducts) {
		const newProduct = await prisma.product.create({
			data: product,
		});
		console.log(`Created product with ID: ${newProduct.id}`);
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
