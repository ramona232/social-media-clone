import { DotsHorizontalIcon, TrashIcon } from '@heroicons/react/outline';
import { deleteDoc, doc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React from 'react'
import Moment from 'react-moment';
import { db } from '../firebase';

export default function Articol({ articol,id }) {
  	const { data: session } = useSession();
  return (
			<div className='max-w-[500px] md:mx-auto mt-2 mb-4 textTheme'>
				<div className="flex items-center p-2 border-b border-gray-500">
					<img src={articol?.userImg} className="h-9 w-9 rounded-full" />
					<div className="flex-1 items-center p-2 ">
						<p className="text-[15px] font-bold">{articol?.username}</p>
						<span className="text-[13px]">
							<Moment fromNow>{articol?.timestamp?.toDate()}</Moment>
						</span>
					</div>
					{session.user.name === articol?.username ? (
						<div
							className="cursor-pointer text-[#6e767d] hover:text-red-600 transition duration-200 ease-out"
							onClick={(e) => {
								e.stopPropagation();
								deleteDoc(doc(db, "articole", id));
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
				<div className="space-y-4 p-2 mt-2">
					<h1 className=" font-bold">{articol?.title}</h1>
					<p className='text-[15px]'>{articol?.text}</p>
				</div>
			</div>
		);
}
