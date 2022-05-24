import React from "react";

export default function MiniHeader({text}) {
	return (
		<div className="bgTheme flex h-[30px] max-w-[500px] items-center justify-center mt-1 shadow-md mr-2  lg:mx-auto">
      <h1 className="font-medium mt-0.5 textTheme">{text}</h1>
		</div>
	);
}
