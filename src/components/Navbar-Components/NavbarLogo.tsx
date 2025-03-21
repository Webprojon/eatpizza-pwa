import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../../public/general-imgs/logo.png";

export default function NavbarLogo() {
	return (
		<Link href="/" className="hidden sm:flex items-center cursor-pointer">
			<Image
				alt="logo"
				src={logo}
				quality="95"
				priority={true}
				className="animate-spin-3s w-[2.3rem] h-[2.3rem] mr-3"
			/>
			<span className="font-semibold">Eat Pizza</span>
		</Link>
	);
}
