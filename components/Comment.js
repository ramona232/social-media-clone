import { DotsHorizontalIcon, TrashIcon } from "@heroicons/react/outline";
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Moment from "react-moment";
import { useEffect } from "react";
import { db } from "../firebase";
import { useState } from "react";

function Comment({comment}) {

	return (
		<div className="p-3 flex">
			<img src={comment?.userImg} alt="" className="h-6 w-6 rounded-full mr-2" />
			<div className="flex flex-col space-y-1 w-full">
				<div className="flex justify-between">
					<div className="text-gray-600 dark:text-gray-300">
						<div className="inline-block group">
							<h4 className="font-bold text-sm inline-block ">{comment?.username}</h4>
						</div>{" "}
						·{" "}
						<span className="text-xs">
							<Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
						</span>
						<p className=" w-full overflow-scroll scrollbar-thin text-sm">
							{comment?.comment}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Comment;
