import { NewspaperIcon } from "@heroicons/react/outline";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../firebase";
import Articol from "./Articol";

export default function Widgets() {
	const [articole, setArticole] = useState([]);
	useEffect(
		() =>
			onSnapshot(
				query(collection(db, "articole"), orderBy("timestamp", "desc")),
				(snapshot) => setArticole(snapshot.docs)
			),
		[db]
	);
	return (
		<div className=" hidden sticky lg:flex flex-col items-start textTheme w-[300px] pt-4 px-4">
			<h1 className="text-[17px] font-bold w-full sticky flex items-center justify-center ">
				<NewspaperIcon className="h-5 w-5 textTheme mr-2"/> Articole noi
			</h1>

			<div className=" overflow-y-scroll scrollbar-thin mb-24">
				{articole.map((articol) => (
					<Articol key={articol.id} id={articol.id} articol={articol.data()} />
				))}
			</div>
		</div>
	);
}
