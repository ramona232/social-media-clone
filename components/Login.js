import Head from "next/head";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function Login({ providers }) {
	return (
		<div className="w-screen h-screen flex flex-col items-center justify-center bg-[#2B3C73]">
			<Head>
				<title>Login</title>
				<link rel="icon" href="/img/simbol-blue.png" />
			</Head>

			<h1 className="text-white text-6xl">Bun venit!</h1>
			<div className="relative w-[250px] h-[200px]">
				<Image
					src="/img/logo-white.png"
					layout="fill"
					priority="true"
					objectFit="contain"
				/>
			</div>

				{Object.values(providers).map((provider) => (
					<div key={provider.name}>
						<button
							onClick={() => signIn(provider.id, { callbackUrl: "/" })}
							className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium text-white rounded-md shadow-2xl group"
						>
							<span
								className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-cyan-400 via-blue-700 to-blue-900 group-hover:opacity-100"
							></span>
							{/* <!-- Top glass gradient --> */}
							<span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-20 h-1/3"></span>
							{/* <!-- Bottom gradient --> */}
							<span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-20"></span>
							{/* <!-- Left gradient --> */}
							<span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-10"></span>
							{/* <!-- Right gradient --> */}
							<span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-10"></span>
							<span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-5"></span>
							<span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-64 group-hover:h-56 opacity-5"></span>
							<span className="relative">Conecteaza-te cu {provider.name}</span>
						</button>
					</div>
				))}
			</div>
	);
}
