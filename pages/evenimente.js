import { getProviders, getSession, useSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
import Header from "../components/Header";
import Login from "../components/Login";
import MiniHeader from "../components/MiniHeader";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import { useEffect } from "react";
import Eveniment from "../components/Eveniment";

export default function Evenimente({ providers }) {
	const { data: session } = useSession();
		const [evenimente, setEvenimente] = useState([]);
	if (!session) return <Login providers={providers} />;
		useEffect(
			() =>
				onSnapshot(
					query(collection(db, "evenimente"), orderBy("timestamp", "desc")),
					(snapshot) => setEvenimente(snapshot.docs)
				),
			[db]
		);
	return (
		<div>
			<Head>
				<title>Pnl1</title>
				<link rel="icon" href="/img/simbol-blue.png" />
			</Head>

			<Header />

			<main className=" flex fixed top-[60px] left-0 right-0 justify-between  mx-auto max-w-[1440px] h-screen">
				<Sidebar />
				<div className="h-full flex-grow  max-w-[700px] overflow-y-scroll scrollbar-thin">
					<MiniHeader text="Evenimente" />
					<div className="mb-24 mr-2 md:-ml-10 lg:mx-auto">
						{evenimente.map((eveniment) => (
							<Eveniment key={eveniment.id} id={eveniment.id} eveniment={eveniment.data()} />
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
