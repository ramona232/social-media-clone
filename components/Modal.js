import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import { useSession } from "next-auth/react";
import Form from "./Form";
import { XIcon } from "@heroicons/react/outline";
export default function Modal({ handleClose, type }) {
	const { data: session } = useSession();
	const dropIn = {
		hidden: {
			y: "-100vh",
			opacity: 0,
		},
		visible: {
			y: "0",
			opacity: 1,
			transition: {
				duration: 0.1,
				type: "spring",
				damping: 25,
				stiffness: 500,
			},
		},
		exit: {
			y: "100vh",
			opacity: 0,
		},
	};	
	return (
		<Backdrop onClick={handleClose}>
			{type === "dropIn" && (
				<motion.div
					onClick={(e) => e.stopPropagation()}
					className="rounded-sm flex flex-col justify-center bgTheme textTheme w-full max-w-lg mx-4 -mt-24 z-50 lg:mt-4 xl:mt-10"
					variants={dropIn}
					initial="hidden"
					animate="visible"
					exit="exit"
				>
					<div className="flex items-center justify-between border-b border-white/75 px-4 py-2.5">
						<h4 className="text-xl">Scrie mesaj</h4>
						<div onClick={handleClose}>
							<XIcon className="h-7 w-7  hoverAnimation" />
						</div>
					</div>

					<div className="p-4 space-y-2">
						<div className="flex items-center space-x-2 textTheme">
							<img src={session?.user?.image} className="h-11 w-11 rounded-full" />
							<h6>{session?.user?.name}</h6>
						</div>

						<Form />
					</div>
				</motion.div>
			)}

	
		</Backdrop>
	);
}
