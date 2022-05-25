import Head from "next/head";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import { getProviders, getSession, useSession } from "next-auth/react";
import Login from "../components/Login";
import Modal from "../components/Modal";
import { useRecoilState } from "recoil";
import { modalState, modalTypeState } from "../atoms/modalAtom";
import { AnimatePresence } from "framer-motion";

export default function Home({ providers }) {
	const { data: session } = useSession();
	const [modalOpen, setModalOpen] = useRecoilState(modalState);
	const [modalType, setModalType] = useRecoilState(modalTypeState);
	if (!session) return <Login providers={providers} />;
	return (
		<div>
			<Head>
				<title>Pnl1</title>
				<link rel="icon" href="/img/simbol-blue.png" />
			</Head>

			<Header />

			<main className=" flex fixed top-[60px] left-0 right-0 justify-between  mx-auto max-w-[1440px] h-screen">
				<Sidebar />
				<Feed />
				<Widgets />
				<AnimatePresence>
					{modalOpen && (
						<Modal handleClose={() => setModalOpen(false)} type={modalType} />
					)}
				</AnimatePresence>
			</main>
		</div>
	);
}

export async function getServerSideProps(context) {
	const providers = await getProviders();
	const session = await getSession(context);

	return {
		props: {
			providers,
			session,
		},
	};
}
