import NavbarLogo from "./NavbarLogo";
import ThemeIcons from "./ThemeIcons";
import TabletNavbar from "./TabletNavbar";
import MobileNavbar from "./MobileNavbar";
import userImg from "../../../public/general-imgs/manimg.webp";
import Image from "next/image";
import MobileBasket from "../Basket-Components/MobileBasket";
import SelectCategory from "./SelectCategory";
import NavbarLinks from "./NavbarLinks";
import { TbTruckDelivery } from "react-icons/tb";
import DeliveryCheckBtn from "../Basket-Components/DeliveryCheckBtn";
import { basketDetails } from "@/actions/actions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import logo from "../../../public/general-imgs/logo.png";

export default async function DesktopNavbar() {
	const basketItems = await basketDetails();
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	return (
		<>
			<header className="bg-slate-100 dark:bg-slate-900 sticky top-0 z-50 border-b border-gray-300 dark:border-gray-600 tracking-wider">
				<nav className="h-[9vh] sm:h-[11vh] max-w-[1250px] mx-auto flex items-center justify-between px-3 xl:px-0">
					<Link href={user ? "/profile" : "/"} className="sm:hidden">
						<Image
							src={user?.picture || logo}
							width={200}
							height={200}
							alt="user img"
							className={`w-9 h-9 rounded-full object-cover ${!user && "animate-spin-3s"}`}
						/>
					</Link>

					<NavbarLogo />
					<NavbarLinks />
					<div className="flex items-center gap-x-7">
						<MobileBasket />
						<SelectCategory />
						<ThemeIcons />

						<DeliveryCheckBtn
							basketItems={basketItems}
							className="hidden md:flex items-center justify-center bg-gradient-green bg-gradient-green-hover font-semibold text-white transition-all rounded-md py-[.5rem] px-3"
						>
							<TbTruckDelivery className="size-6 mr-2" />
							Check your cart
						</DeliveryCheckBtn>

						{user && (
							<Link href="/profile" className="hidden sm:block">
								<Image
									src={user?.picture || userImg}
									width={200}
									height={200}
									alt="user img"
									className="w-9 h-9 rounded-full object-cover"
								/>
							</Link>
						)}

						<TabletNavbar />
					</div>
				</nav>
			</header>
			<MobileNavbar />
		</>
	);
}
