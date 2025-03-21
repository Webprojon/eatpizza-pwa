"use client";
import { LINKS } from "@/lib/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function MobileNavbar() {
	const pathname = usePathname();

	return (
		<div className="h-[9vh] flex justify-center sm:hidden bg-slate-100 dark:bg-slate-900 fixed bottom-0 w-full z-50 border-t border-gray-300 dark:border-gray-600 tracking-wider">
			<nav className="flex items-center w-full max-w-[410px] justify-between px-3">
				{LINKS.map((link) => (
					<Link
						key={link.id}
						href={link.href}
						className={`h-full flex flex-col justify-center items-center gap-y-1 text-[12px]
								${pathname === link.href && "text-red-600 border-t-[.1rem] border-red-600"}
								`}
					>
						{link.icon} {link.label}
					</Link>
				))}
			</nav>
		</div>
	);
}
