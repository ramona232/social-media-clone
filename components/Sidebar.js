import {
	BellIcon,
	CalendarIcon,
	HomeIcon,
	LockClosedIcon,
	LogoutIcon,
	NewspaperIcon,
	QrcodeIcon,
	UserGroupIcon,
} from "@heroicons/react/outline";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import SidebarLink from "./SidebarLink";

export default function Sidebar() {
	const { data: session } = useSession();
	const router = useRouter();
	return (
		<div className="sticky flex flex-col lg:w-[300px] items-start px-2 md:px-4 pt-4">
			<div className="flex md:space-x-2 md:border-b border-gray-500 pb-2 mt-6">
				<img
					src={session.user.image}
					className="hoverAnimation h-7 w-7 md:h-10 md:w-10 rounded-full "
				/>
				<div className="hidden md:flex flex-col">
					<h1 className="textTheme font-bold text-[17px] hoverAnimation  ">
						{session.user.name}
					</h1>
					<p className="text-blue-500 hoverAnimation text-[15px]">
						@{session.user.tag}
					</p>
				</div>
			</div>

			<div className="mt-5 space-y-8 lg:space-y-6 flex flex-col md:pl-2">
				<SidebarLink text="Acasa" Icon={HomeIcon} active /> 

				{/* <div className="relative" onClick={() => router.push("/notificari")}>
					<span className="absolute -top-1 left-3 ">
						<ExclamationCircleIcon className="h-4 w-4 text-red-600" />
					</span>
					<SidebarLink text="Notificari" Icon={BellIcon} />
				</div> */}

				{/* <div onClick={() => router.push("/grupuri")}>
					<SidebarLink text="Grupuri" Icon={UserGroupIcon} />
				</div> */}

				<div onClick={() => router.push("/articole")}>
					<SidebarLink text="Articole" Icon={NewspaperIcon} />
				</div>

				<div onClick={() => router.push("/evenimente")}>
					<SidebarLink text="Evenimente" Icon={CalendarIcon} />
				</div>

				<div onClick={() => router.push("/qrcode")}>
					<SidebarLink text="Qr Code" Icon={QrcodeIcon} />
				</div>

				<div onClick={() => router.push("/admin")}>
					<SidebarLink text="Admin" Icon={LockClosedIcon} />
				</div>

				<div onClick={signOut}>
					<SidebarLink text="Deconectare" Icon={LogoutIcon} />
				</div>
			</div>
		</div>
	);
}
