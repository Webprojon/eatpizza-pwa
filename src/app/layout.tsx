import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import DesktopNavbar from "@/components/Navbar-Components/DesktopNavbar";
import ThemeContextProvider from "@/context/theme-context";
import GlobalContextProvider from "@/context/global-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Eat Pizza",
	description:
		"Discover the best pizza recipes and toppings with Eat Pizza! From classic margheritas to gourmet creations, satisfy your pizza cravings anytime, anywhere.",
	keywords: [
		"pizza eat",
		"eat pizza",
		"pizza recipes",
		"homemade pizza",
		"pizza toppings",
		"pizza app",
		"cooking app",
	],
	generator: "Next.js",
	manifest: "/manifest.json",
	icons: [
		{ rel: "apple-touch-icon", url: "icons/EatPizza-512.png" },
		{ rel: "icon", url: "icons/EatPizza-512.png" },
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<meta name="theme-color" content="#ffffff" />
				<link rel="manifest" href="/manifest.json" />
				<link rel="icon" href="icons/EatPizza-512.png" />
				<link rel="apple-touch-icon" href="icons/EatPizza-512.png" />
			</head>
			<body
				className={`${inter.className} bg-gray-50 dark:bg-gray-900 dark:text-slate-300 text-slate-700 select-none`}
			>
				<div className="animate-spin-25s fixed top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#4d2d2d]"></div>
				<div className="animate-spin-25s fixed top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#494579]"></div>
				<ThemeContextProvider>
					<GlobalContextProvider>
						<DesktopNavbar />
						{children}
						<Toaster position="top-center" />
					</GlobalContextProvider>
				</ThemeContextProvider>
			</body>
		</html>
	);
}
