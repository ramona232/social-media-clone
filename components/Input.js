import {
	PaperAirplaneIcon,
	PhotographIcon,
	XIcon,
} from "@heroicons/react/outline";
import React from "react";
import { useState } from "react";
import InputEmoji from "react-input-emoji";
import { useRef } from "react";
import {
	addDoc,
	collection,
	doc,
	serverTimestamp,
	updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { db, storage } from "../firebase";
import { useSession } from "next-auth/react";

export default function Input() {
	const { data: session } = useSession();
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);
	const [selectedFile, setSelectedFile] = useState(null);
	const filePickerRef = useRef(null);

	const sendPost = async (e) => {
		if (loading) return;
		setLoading(true);

		const docRef = await addDoc(collection(db, "posts"), {
			username: session.user.name,
			userImg: session.user.image,
			tag: session.user.tag,
			text: input,
			timestamp: serverTimestamp(),
		});

		const imageRef = ref(storage, `posts/${docRef.id}/image`);

		if (selectedFile) {
			await uploadString(imageRef, selectedFile, "data_url").then(async () => {
				const downloadURL = await getDownloadURL(imageRef);
				await updateDoc(doc(db, "posts", docRef.id), {
					image: downloadURL,
				});
			});
		}
		setLoading(false);
		setInput("");
		setSelectedFile(null);
	};

	const addImageToPost = (e) => {
		const reader = new FileReader();
		if (e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0]);
		}

		reader.onload = (readerEvent) => {
			setSelectedFile(readerEvent.target.result);
		};
	};

	return (
		<div
			className={`bgTheme p-2 textTheme flex flex-col rounded-sm md:flex items-center fixed bottom-0 left-0 right-0 z-50  drop-shadow-md
 ${loading && "opacity-60"}`}
		>
			{selectedFile && (
				<div className="relative">
					<div
						className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-3 right-1 cursor-pointer"
						onClick={() => setSelectedFile(null)}
					>
						<XIcon className="text-white h-5" />
					</div>
					<img
						src={selectedFile}
						alt=""
						className="rounded-xl max-h-40 object-contain py-2"
					/>
				</div>
			)}
			<div className="w-full flex items-center -ml-2">
				<InputEmoji
					value={input}
					onChange={setInput}
					cleanOnEnter
					placeholder="Scrie mesaj ..."
				/>
				<div
					className=" text-blue-700 hoverAnimation"
					onClick={() => filePickerRef.current.click()}
				>
					<PhotographIcon className="h-7 w-7" />
					<input type="file" ref={filePickerRef} hidden onChange={addImageToPost} />
				</div>{" "}
				<button
					className="bg-[#1d9bf0] text-white rounded-full ml-2 px-4 py-1 text-sm font-medium shadow-md hover:bg-[#1268a1] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
					type="submit"
					disabled={!input && !selectedFile}
					onClick={sendPost}
				>
					<PaperAirplaneIcon className="h-5 w-5" />
				</button>
			</div>
		</div>
	);
}
