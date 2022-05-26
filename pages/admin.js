import { getProviders, getSession, useSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
import Header from "../components/Header";
import Login from "../components/Login";
import MiniHeader from "../components/MiniHeader";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import SuperAdmin from "../components/SuperAdmin";

export default function Admin({ providers }) {
	const { data: session } = useSession();
	const [articol, setArticol] = useState("");
	const [title, setTitle] = useState("");
	const [text, setText] = useState("");
	const [titlu, setTitlu] = useState("");
	const [date, setDate] = useState("");
	const [locatia, setLocatia] = useState("");
	const [descriere, setDescriere] = useState("");
	const [eveniment, setEveniment] = useState("");

	const sendArticol = async (e) => {
		e.preventDefault();
		await addDoc(collection(db, "articole"), {
			title: title,
			text: text,
			username: session.user.name,
			userImg: session.user.image,
			timestamp: serverTimestamp(),
		});
		setTitle("");
		setText("");
		setArticol("");
	};
	const sendEveniment = async (e) => {
		e.preventDefault();
		await addDoc(collection(db, "evenimente"), {
			titlu: titlu,
			date: date,
			locatia: locatia,
			descriere: descriere,
			username: session.user.name,
			userImg: session.user.image,
			timestamp: serverTimestamp(),
		});
		setTitlu("");
		setDate("");
		setLocatia("");
		setDescriere("");
		setEveniment("");
	};

	if (!session) return <Login providers={providers} />;

	if (
		session.user.email !== "pnlsector1@gmail.com" &&
		session.user.tag !== "ramonarotaru" &&
		session.user.tag !== "lucabadila"
	)
		return <SuperAdmin />;
	
	return (
		<div>
			<Head>
				<title>Pnl1</title>
				<link rel="icon" href="/img/simbol-blue.png" />
			</Head>

			<Header />

			<main className=" flex fixed top-[60px] left-0 right-0 justify-between  mx-auto max-w-[1440px] h-screen">
				<Sidebar />
				<div className="flex-grow  max-w-[700px] overflow-y-scroll scrollbar-thin pb-28">
					<MiniHeader text="Admin" />
					<h1 className="textTheme font-bold max-w-[500px] text-center lg:mx-auto my-8">
						Scrie un articol
					</h1>
					<form className="flex flex-col max-w-[500px] space-y-2 px-2 py-4 bgTheme mt-4 shadow-md mr-2 lg:mx-auto">
						<input
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							type="text"
							placeholder="Titlu articol ..."
							className="p-2 outline-none bg-transparent textTheme border-b border-gray-500 overflow-y-scroll scrollbar-thin w-full"
						/>
						<input
							value={text}
							onChange={(e) => setText(e.target.value)}
							type="text"
							placeholder="Descriere ..."
							className="p-2 outline-none bg-transparent textTheme border-b border-gray-500 overflow-y-scroll scrollbar-thin"
						/>
						<button
							onClick={sendArticol}
							className="bg-blue-500 py-1 mt-1 hoverAnimation text-white"
						>
							Creeaza
						</button>
					</form>
					<h1 className="textTheme font-bold max-w-[500px] text-center lg:mx-auto my-8">
						Creeaza un eveniment
					</h1>
					<form className="flex flex-col max-w-[500px] space-y-2 px-2 py-4 bgTheme mt-4 shadow-md mr-2 lg:mx-auto mb-28">
						<input
							value={titlu}
							onChange={(e) => setTitlu(e.target.value)}
							type="text"
							placeholder="Titlu eveniment..."
							className="p-2 outline-none bg-transparent textTheme border-b border-gray-500"
						/>
						<input
							value={date}
							onChange={(e) => setDate(e.target.value)}
							type="date"
							placeholder="Data eveniment ..."
							className="p-2 outline-none bg-transparent textTheme border-b border-gray-500 w-full"
						/>
						<input
							value={locatia}
							onChange={(e) => setLocatia(e.target.value)}
							type="text"
							placeholder="Locatia eveniment ..."
							className="p-2 outline-none bg-transparent textTheme border-b border-gray-500"
						/>
						<input
							value={descriere}
							onChange={(e) => setDescriere(e.target.value)}
							type="text"
							placeholder="Descriere eveniment ..."
							className="p-2 outline-none bg-transparent textTheme border-b border-gray-500"
						/>
						<button
							onClick={sendEveniment}
							className="bg-blue-500 py-1 mt-1 hoverAnimation text-white"
						>
							Creeaza
						</button>
					</form>
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
