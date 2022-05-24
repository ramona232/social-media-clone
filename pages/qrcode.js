import { getProviders, getSession, useSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import Login from "../components/Login";
import MiniHeader from "../components/MiniHeader";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import axios from "axios";
import SVG from "react-inlinesvg";

export default function Qrcode({ providers }) {
	const [input, setInput] = useState(null);
	const [response, setResponse] = useState(null);
	const { data: session } = useSession();
	if (!session) return <Login providers={providers} />;

	const getQrcode = async () => {
		try {
			const res = await axios.get("api/qrcode/", {
				params: { input },
			});
			setResponse(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	// Standard snippet to download the QR Code svg
	const downloadQrcode = () => {
		const url = window.URL.createObjectURL(new Blob([response]));
		const urlObject = document.createElement("a");
		urlObject.href = url;
		urlObject.setAttribute("download", "file.svg");
		document.body.appendChild(urlObject);
		urlObject.click();
	};

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
					<MiniHeader text="Generator Qr Code " />
					<div className="flex flex-col relative items-center min-h-screen ">
						<h2 className="text-active text-2xl mt-6">Genereaza Code QR</h2>
						<input
							type="text"
							placeholder="Link, text, sau numar ..."
							className="mt-4 text-sm w-1/2 p-4 bg-white outline-none shadow-md rounded-sm placeholder:text-gray-500 text-gray-500"
							onChange={(e) => setInput(e.target.value)}
						></input>
						<button
							className="mt-6 py-1 px-6 bg-blue-500 hoverAnimation rounded-sm text-white font-medium inline-flex shadow-md"
							onClick={() => getQrcode()}
						>
							Genereaza
						</button>

						{response && (
							<div className="mt-10">
								<SVG src={response} />
								<button
									className="w-full bg-blue-500 mt-4 text-base p-1 rounded-sm shadow-md hoverAnimation text-white"
									onClick={() => downloadQrcode()}
								>
									Descarca
								</button>
							</div>
						)}
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
