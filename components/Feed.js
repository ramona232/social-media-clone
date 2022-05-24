
import Posts from "./Posts";

export default function Feed() {
	return (
		<div className="h-full flex-grow  max-w-[700px] overflow-y-scroll scrollbar-thin">
			<Posts />
		</div>
	);
}
