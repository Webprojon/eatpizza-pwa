"use client";
import { LINKS } from "@/lib/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavbarLinks() {
	const pathname = usePathname();

	return (
		<div className="hidden md:flex md:gap-x-6 lg:gap-x-12 text-[17px] font-medium">
			{LINKS.slice(0, -1).map((link) => (
				<Link
					key={link.id}
					href={link.href}
					className={`flex items-center gap-x-[8px] hover:text-slate-500 hover:dark:text-slate-400 ${pathname === link.href && "text-slate-500 dark:text-slate-400"} `}
				>
					{link.icon} {link.label}
				</Link>
			))}
		</div>
	);
}
