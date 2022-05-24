import { SearchIcon } from "@heroicons/react/solid";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
const spring = {
	type: "spring",
	stiffness: 700,
	damping: 30,
};
export default function Header() {
	const [mounted, setMounted] = useState(false);
	const { setTheme, resolvedTheme, theme } = useTheme();

	// After mounting, we have access to the theme
	useEffect(() => setMounted(true), []);

	return (
		<div className="flex items-center justify-between sticky top-0 left-0 z-50 bgTheme h-[60px] px-2 md:px-4 w-full shadow-md ">
			{mounted && (
				<>
					{resolvedTheme === "dark" ? (
						<img src="/img/logo-white.png" className="w-[100px]" />
					) : (
						<img src="/img/logo-blue.png" className="w-[100px]" />
					)}
				</>
			)}

			
			{/* <div className="flex items-center space-x-1 py-1 px-2 border-b border-gray-500 mx-6 xl:mx-20 w-full">
				<SearchIcon className="text-gray-500 w-5 h-5" />
				<input
					type="text"
					placeholder="Cauta . . ."
					className="bg-transparent text-sm placeholder:text-gray-500 focus:outline-none  w-full "
				/>
			</div> */}


			{/* Dark mode toggle */}
			{mounted && (
				<div
					className={`bg-gray-500 flex items-center  px-0.5 py-1 rounded-full h-6 w-12 cursor-pointer flex-shrink-0 relative ${
						resolvedTheme === "dark" ? "justify-end" : "justify-start"
					}`}
					onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
				>
					<span className="absolute left-0.5 ">🌞</span>
					<motion.div
						className="w-5 h-5 bg-white rounded-full z-40"
						layout
						transition={spring}
					/>

					<span className="absolute right-0.5">🌒</span>
				</div>
			)}
		</div>
	);
}
