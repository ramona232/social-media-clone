import { DotsHorizontalIcon, TrashIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import React from 'react'
import Moment from 'react-moment';
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export default function Eveniment({eveniment,id}) {
    	const { data: session } = useSession();
					return (
						<div className="max-w-[500px] md:mx-auto m-4 textTheme">
							<div className="flex items-center p-2 border-b border-gray-500">
								<img src={eveniment?.userImg} className="h-9 w-9 rounded-full" />
								<div className="flex-1 items-center p-2 ">
									<p className="text-[15px] font-bold">{eveniment?.username}</p>
									<span className="text-[13px]">
										<Moment fromNow>{eveniment?.timestamp?.toDate()}</Moment>
									</span>
								</div>
								{session.user.name === eveniment?.username ? (
									<div
										className="cursor-pointer text-[#6e767d] hover:text-red-600 transition duration-200 ease-out"
										onClick={(e) => {
											e.stopPropagation();
											deleteDoc(doc(db, "evenimente", id));
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
							<div className="space-y-4 p-4 mt-2">
								<h1 className=" font-bold">{eveniment?.titlu}</h1>
								<p className="text-[15px] text-red-600 font-medium">
									Data:{""} {eveniment?.date}
								</p>
								<p className="text-[15px] text-green-600 font-medium">
									Locatia:{""} {eveniment?.locatia}
								</p>
								<p className="text-[15px]">{eveniment?.descriere}</p>
							</div>
						</div>
					);
}
