"use client";
import { useTheme } from "@/context/theme-context";
import React from "react";
import { HiOutlineSun } from "react-icons/hi";
import { FaMoon } from "react-icons/fa";

export default function ThemeIcons() {
	const { theme, toggleTheme } = useTheme();

	return (
		<div
			onClick={toggleTheme}
			className="cursor-pointer border p-[.4rem] md:p-[.5rem] rounded-md border-gray-300 dark:border-slate-600 text-slate-700 dark:text-slate-300"
		>
			{theme === "light" ? (
				<HiOutlineSun className="size-5 sm:size-6" />
			) : (
				<FaMoon className="size-5 sm:size-6" />
			)}
		</div>
	);
}
