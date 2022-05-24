
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
import { DotsHorizontalIcon, PaperAirplaneIcon, TrashIcon } from "@heroicons/react/outline";
import Comment from "./Comment";
import Moment from "react-moment";

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
		setComment('')
	};

	return (
		<div className="bgTheme textTheme shadow-md rounded-sm mt-2 mb-8 ">
			<div className="flex items-center p-2 ">
				<img src={post?.userImg} className="h-9 w-9 rounded-full" />
				<div className="flex-1 items-center p-2 ">
						<p className="text-[15px] font-bold">{post?.username}</p>
						<p className="text-blue-500 text-[13px]">@{post?.tag}</p>
						<span className="hover:underline text-[13px]">
						<Moment fromNow>{post?.timestamp?.toDate()}</Moment>
					</span>
				</div>
				{session.user.name === post?.username ? (
					<div
						className="cursor-pointer text-[#6e767d] hover:text-red-600 transition duration-200 ease-out"
						onClick={(e) => {
							e.stopPropagation();
							deleteDoc(doc(db, "posts", id));
						}}
					>
						<TrashIcon className="h-4 " />
					</div>
				) : (
					<div className="text-[#6e767d]">
						<DotsHorizontalIcon className="h-4" />
					</div>
				)}
			</div>
			<div className="">
				{/* text */}
				<p className="px-3 pb-4 text-[15px] font-medium">{post?.text}</p>
				{/* img */}
				<img src={post?.image} className="max-h-40 object-contain w-full" />
			</div>
			{/* imputBox */}
			<form className="flex items-center py-4 pr-2 border-y border-gray-500 drop-shadow-md ">
				<InputEmoji
					value={comment}
					onChange={setComment}
					cleanOnEnter
					placeholder="Raspunde ..."
				/>
				<button
					type="submit"
					onClick={sendComment}
					className="bg-[#1d9bf0] text-white rounded-full py-1 px-2 text-sm font-medium shadow-md rotate-180 hover:bg-[#1268a1] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
					disabled={!comment.trim()}
				>
					<PaperAirplaneIcon className="h-5 w-5" />
				</button>
			</form>
			{/* comments */}
			{comments.length > 0 && (
				<div className="h-[120px] overflow-y-scroll scrollbar-thin">
					{comments.map((comment) => (
						<Comment key={comment.id} id={comment.id} comment={comment.data()} />
					))}
				</div>
			)}


		</div>
	);
}
