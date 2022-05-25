
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	onSnapshot,
	orderBy,
	query,
	serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import InputEmoji from "react-input-emoji";
import { PaperAirplaneIcon, TrashIcon } from "@heroicons/react/outline";
import Moment from "react-moment";
import Comment from "./Comment";

export default function SinglePost({ post, id }) {
	const { data: session } = useSession();
	const [comments, setComments] = useState([]);
	const [comment, setComment] = useState('');

	useEffect(
		() =>
			onSnapshot(
				query(
					collection(db, "posts", id, "comments"),
					orderBy("timestamp", "desc")
				),
				(snapshot) => setComments(snapshot.docs)
			),
		[db]
	);

	const sendComment = async (e) => {
		e.preventDefault();	
		await addDoc(collection(db, "posts", id, "comments"), {
			comment: comment,
			username: session.user.name,
			userImg: session.user.image,
			timestamp: serverTimestamp(),
		});
		setComment('');
	};

	return (
		<div className="bgTheme textTheme my-7 shadow-md rounded-sm ">
			<div className="flex items-center p-2 border-b border-gray-500">
				<img src={post?.userImg} className="h-10 w-10 rounded-full" />
				<div className="flex-1 items-center p-2 ">
					<div className="">
						<p className=" font-bold">{post?.username}</p>
						<span className="hover:underline text-sm sm:text-[15px]">
							<Moment fromNow>{post?.timestamp?.toDate()}</Moment>
						</span>
					</div>
				</div>
				{session.user.name === post?.username ? (
					<div
						className="cursor-pointer hover:text-red-600 transition duration-200 ease-out"
						onClick={(e) => {
							e.stopPropagation();
							deleteDoc(doc(db, "posts", id));
						}}
					>
						<TrashIcon className="h-5 mr-2" />
					</div>
				) : (
					<div></div>
				)}
			</div>
			<div className="border-b border-gray-500">
				{/* text */}
				<p className="p-4">{post?.text}</p>
				{/* img */}
				<img src={post?.image} className="max-h-40 object-contain w-full " />
			</div>

			{/* comments */}
			{comments.length > 0 && (
				<div>
					{comments.map((comment) => (
						<Comment key={comment.id} id={comment.id} comment={comment.data()} />
					))}
				</div>
			)}

			{/* imputBox */}
			<form className="flex items-center py-4 pr-4 bgTheme">
				<InputEmoji
					value={comment}
					onChange={setComment}
					cleanOnEnter
					placeholder="Raspunde ..."
				/>
				<button
					type="submit"
					onClick={sendComment}
					disabled={!comment.trim()}
					className="text-white bg-blue-500 py-1 px-2 rounded-full hoverAnimation
					disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
				>
					<PaperAirplaneIcon className="h-4 w-4 text-white" />
				</button>
			</form>
		</div>
	);
}
