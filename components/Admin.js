import { ArrowLeftIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import React from "react";

export default function Admin() {
  	const router = useRouter();
	return (
		<div className="w-screen h-screen flex flex-col items-center justify-center spacey-4">
			<h1 className="text-5xl lg:text-8xl font-bold opacity-10">Doar Admin!</h1>
			<div
				className="flex items-center space-x-2 mt-4 hoverAnimation"
				onClick={() => router.push("/")}
			>
				<ArrowLeftIcon className="h-5 w-5 opacity-60" />
				<p className="text-xl font-semibold opacity-60">Acasa</p>
			</div>
		</div>
	);
}
