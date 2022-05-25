
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { modalTypeState } from "../atoms/modalAtom";

export default function Input() {
	const { data: session } = useSession();
	const [modalOpen, setModalOpen] = useRecoilState(modalState);
	const [modalType, setModalType] = useRecoilState(modalTypeState);
	return (
		<div className="bgTheme rounded-sm p-3 space-y-3 dark:border-none shadow-md w-full mt-5">
			<div className="flex items-center space-x-2 ">
				<img src={session?.user?.image} className="h-10 w-10 rounded-full" />
				<motion.button
					whileHover={{ scale: 1.01 }}
					whileTap={{ scale: 0.99 }}
					className="rounded-full border border-gray-400 py-2.5 px-3 opacity-80 hover:opacity-60 font-medium w-full text-left cursor-pointer"
					onClick={() => {
						setModalOpen(true);
						setModalType("dropIn");
					}}
				>
					Scrie mesaj ...
				</motion.button>
			</div>
		</div>
	);
}
