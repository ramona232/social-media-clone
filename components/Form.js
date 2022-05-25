import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { db, storage } from "../firebase";
import {
	addDoc,
	collection,
	doc,
	updateDoc,
	serverTimestamp,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { useRef, useState } from "react";
import InputEmoji from "react-input-emoji";
import { PhotographIcon, XIcon } from "@heroicons/react/outline";

export default function Form() {
	const { data: session } = useSession();
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);
	const [selectedFile, setSelectedFile] = useState(null);
	const filePickerRef = useRef(null);
	const [modalOpen, setModalOpen] = useRecoilState(modalState);

	const uploadPost = async (e) => {
		e.preventDefault();
		if (loading) return;
		setLoading(true);

		const docRef = await addDoc(collection(db, "posts"), {
			username: session.user.name,
			userImg: session.user.image,
			email: session.user.email,
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
		setModalOpen(false);
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
		<form className="flex flex-col relative space-y-2 text-black/80 dark:text-white/75 overflow-y-scroll scrollbar-thin">
			<div className="divide-y divide-gray-700 w-full">
				<div className={`${selectedFile && "pb-7"} ${input && "space-y-2.5"}`}>
					<InputEmoji
						value={input}
						onChange={setInput}
						cleanOnEnter
						placeholder="Scrie mesaj ..."
					/>

					{selectedFile && (
						<div className="relative">
							<div
								className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
								onClick={() => setSelectedFile(null)}
							>
								<XIcon className="text-white h-5" />
							</div>
							<img
								src={selectedFile}
								alt=""
								className="rounded-sm max-h-40 md:max-h-80 object-contain"
							/>
						</div>
					)}
				</div>
			</div>
			{!loading && (
				<div className="flex items-center py-2">
					<div
						className=" flex items-center w-full hoverAnimation"
						onClick={() => filePickerRef.current.click()}
					>
						<PhotographIcon className="h-6 text-blue-500 hoverAnimation mr-2" />
						<input
							type="file"
							className="bg-transparent focus:outline-none"
							placeholder=""
							ref={filePickerRef}
							hidden
							onChange={addImageToPost}
						/>
						<p className="textTheme  text-[15px]">Imagine</p>
					</div>

					<button
						className="hoverAnimation font-medium text-[15px] bg-blue-400 hover:bg-blue-500 disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default text-white rounded-full px-2 py-0.5"
						type="submit"
						onClick={uploadPost}
						disabled={!input.trim()}
					>
						Trimite
					</button>
				</div>
			)}
		</form>
	);
}
