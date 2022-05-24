import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import  { useEffect, useState } from "react";
import { db } from "../firebase";
import SinglePost from "./SinglePost";


export default function Posts() {
		const [posts, setPosts] = useState([]);
	  useEffect(
				() =>
					onSnapshot(
						query(collection(db, "posts"), orderBy("timestamp", "desc")),
						(snapshot) => {
							setPosts(snapshot.docs);
						}
					),
				[db]
			);
	return (
		<div className="pt-2 pb-36 md:pt-4 pr-2 md:pr-4 max-w-[500px] lg:px-0 mx-auto">
			{posts.map((post) => (
				<SinglePost key={post.id} id={post.id} post={post.data()} />
			))}
		</div>
	);
}
