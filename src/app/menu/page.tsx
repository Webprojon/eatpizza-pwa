import prisma from "@/lib/db";
import DesktopBasket from "@/components/Basket-Components/DesktopBasket";
import DeliveryDetails from "@/components/Basket-Components/DeliveryDetails";
import { basketDetails, totalPrice } from "@/actions/actions";
import ProductCards from "@/components/CardDetails/ProductCards";

export default async function Products() {
	const products = await prisma.product.findMany();
	const basketItems = await basketDetails();
	const orderedItems = await prisma.orderedItem.findMany();
	const sum = await totalPrice();

	return (
		<section className="relative max-w-[1250px] mx-auto my-8 flex flex-row justify-center lg:justify-between">
			<div className="px-2 sm:px-0 sm:mt-0">
				<ProductCards products={products} />
			</div>
			<DesktopBasket />
			<DeliveryDetails
				orderedItems={orderedItems}
				basketItems={basketItems}
				sum={sum}
			/>
		</section>
	);
}
