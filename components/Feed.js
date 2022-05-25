
import Input from "./Input";
import Posts from "./Posts";

export default function Feed() {
	return (
		<div className=" pb-28  flex-grow max-w-[700px] mr-2 md:mr-6 overflow-y-scroll scrollbar-thin">
			<Input />
			<Posts />
		</div>
	);
}
