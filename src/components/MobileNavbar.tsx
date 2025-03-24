"use client";
import { LINKS } from "@/lib/data";
import Link from "next/link";
import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";

export default function MobileNavbar() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<header className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
			<div
				onClick={() => setIsOpen((prev) => !prev)}
				className="flex flex-col gap-[4.5px] cursor-pointer"
			>
				<div
					className={`w-6 h-1 bg-slate-700 dark:bg-slate-300 rounded-sm 
            ${isOpen && "rotate-45"} origin-left ease-in-out duration-500`}
				/>
				<div
					className={`w-6 h-1 bg-slate-700 dark:bg-slate-300 rounded-sm 
            ${isOpen && "opacity-0"}
          `}
				/>
				<div
					className={`w-6 h-1 bg-slate-700 dark:bg-slate-300 rounded-sm 
            ${isOpen && "-rotate-45"} origin-left ease-in-out duration-500`}
				/>
			</div>

			<div
				className={`absolute left-0 top-[5.6rem] w-full h-screen bg-slate-100 dark:bg-slate-900 flex flex-col items-center gap-y-10 z-10 font-medium text-[20px] transition-transform duration-300 pt-9 px-3
					 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
			>
				{LINKS.map((link) => (
					<Link
						key={link.id}
						href={link.href}
						className="flex items-center gap-x-4"
					>
						{link.icon} {link.label}
					</Link>
				))}
				<Link
					href="/address"
					className="flex md:hidden items-center justify-center bg-gradient-green bg-gradient-green-hover font-semibold text-white 
					transition-all rounded-md py-[.7rem] w-full"
				>
					<FaLocationDot className="mr-2 animate-bounce" />
					Enter your address
				</Link>
			</div>
		</header>
	);
}
