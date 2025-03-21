"use client";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { animFromBottomToTop } from "@/lib/motion-anim";
import StaticMap from "./StaticMap";
import { FormEvent } from "react";

export default function Address() {
	const router = useRouter();

	const handleInputClasses = (width: string) => {
		return `${width} border border-gray-300 outline-green-500 p-3 rounded-md tracking-wider text-gray-600
		 placeholder:text-gray-600 dark:outline-none dark:bg-slate-800 dark:text-gray-300 dark:placeholder:text-gray-300`;
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		setTimeout(() => {
			toast.success("Your address is saved 😊 !");
		}, 1000);

		setTimeout(() => {
			router.push("/");
		}, 1800);
	};

	return (
		<motion.div
			initial="initial"
			animate="animate"
			variants={animFromBottomToTop}
			className="max-w-[1250px] mx-auto h-[calc(100vh-11vh)] md:p-7 lg:rounded-md"
		>
			<div className="md:flex justify-between gap-x-6 p-3 md:p-0">
				<StaticMap />

				<form className="flex flex-col gap-y-6 mt-4 md:mt-0">
					<span className="leading-none font-semibold">Enter your address</span>
					<input
						required
						type="text"
						name="useraddress"
						autoComplete="off"
						placeholder="Address"
						className={handleInputClasses(
							"w-full dark:bg-transparent bg-transparent border border-gray-400 dark:border-gray-400",
						)}
					/>
					<div className="flex gap-x-6">
						<input
							required
							type="number"
							name="userflat"
							placeholder="Flat"
							autoComplete="off"
							className={handleInputClasses(
								"w-[50%] dark:bg-transparent bg-transparent border border-gray-400 dark:border-gray-400",
							)}
						/>
						<input
							required
							type="number"
							name="userfloor"
							autoComplete="off"
							placeholder="Floor"
							className={handleInputClasses(
								"w-[50%] dark:bg-transparent bg-transparent border border-gray-400 dark:border-gray-400",
							)}
						/>
					</div>
					<button
						onClick={handleSubmit}
						className="rounded-md bg-gradient-green bg-gradient-green-hover text-white p-3 font-semibold tracking-wider"
					>
						Submit Address
					</button>
				</form>
			</div>
		</motion.div>
	);
}
