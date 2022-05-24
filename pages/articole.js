import { getProviders, getSession, useSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import Header from "../components/Header";
import Login from "../components/Login";
import MiniHeader from "../components/MiniHeader";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import Articol from "../components/Articol";

export default function Articole({ providers }) {
	const { data: session } = useSession();
	const [articole, setArticole] = useState([]);

	useEffect(
		() =>
			onSnapshot(
				query(collection(db, "articole"), orderBy("timestamp", "desc")),
				(snapshot) => setArticole(snapshot.docs)
			),
		[db]
	);

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
					<MiniHeader text="Articole" />
					<div className="mb-24 mr-2 md:-ml-10 lg:mx-auto">
						{articole.map((articol) => (
							<Articol key={articol.id} id={articol.id} articol={articol.data()} />
						))}
					</div>
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
