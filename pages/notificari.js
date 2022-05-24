import { getProviders, getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Header from "../components/Header";
import Login from "../components/Login";
import MiniHeader from "../components/MiniHeader";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";

export default function Notificari({ providers }) {
	const { data: session } = useSession();
	if (!session) return <Login providers={providers} />;
	return (
		<div>
			<Head>
				<title>Pnl1</title>
				<link rel="icon" href="/img/simbol-blue.png" />
			</Head>

			<Header />

			<main className=" flex fixed top-[60px] left-0 right-0 justify-between  mx-auto max-w-[1440px] h-screen ">
				<Sidebar />
				<div className="h-full flex-grow  max-w-[700px] overflow-y-scroll scrollbar-thin mb-28">
					<MiniHeader text="Notificari" />
				</div>

				<Widgets />
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
