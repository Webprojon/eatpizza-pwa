import { IoLocationOutline } from "react-icons/io5";
import { MdRestaurantMenu } from "react-icons/md";
import { RiMessage2Line } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";

export const LINKS = [
	{
		id: 1,
		href: "/",
		icon: <MdRestaurantMenu className="size-6" />,
		label: "Menu",
	},
	{
		id: 2,
		href: "/address",
		icon: <IoLocationOutline className="size-6" />,
		label: "Address",
	},
	{
		id: 3,
		href: "/feedback",
		icon: <RiMessage2Line className="size-6" />,
		label: "Feedback",
	},
	{
		id: 4,
		href: "/profile",
		icon: <FaRegUser className="size-6" />,
		label: "Profile",
	},
];
