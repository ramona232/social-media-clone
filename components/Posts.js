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
		<div className=" max-w-[500px]  mx-auto my-10">
			{posts.map((post) => (
				<SinglePost key={post.id} id={post.id} post={post.data()} />
			))}
		</div>
	);
}
