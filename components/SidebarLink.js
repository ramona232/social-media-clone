import { useRouter } from "next/router";

function SidebarLink({ Icon, text, active }) {
	const router = useRouter();
	return (
		<div
			className={`textTheme flex text-lg  space-x-1 hoverAnimation justify-start hoverAnimation ${
				active && "font-bold"
			}`}
			onClick={() => active && router.push("/")}
		>
			<Icon className="h-6" />
			<span className="hidden md:flex text-[15px]">{text}</span>
		</div>
	);
}

export default SidebarLink;
