import { NavLink, Outlet } from "react-router-dom";
import SearchFeature from "../components/search";
import { AddIcon, HomeIcon } from "../components/Icons";
import { useEffect, useState } from "react";
import { RooTstate } from "../lib/redux/store/store";
import { useSelector } from "react-redux";
import Loader from "../components/loader";
import SongPlayer from "../components/SongPlayer";

export default function RootLayout() {
	const [height, setheight] = useState(0);
	const player = useSelector((state: RooTstate) => state.player);

	useEffect(() => {

		const calculatedheight = (window.innerHeight - 20).toFixed(0);
		setheight(parseInt(calculatedheight));
	}, []);

	return (
		<div className="wrapper flex  mx-auto min-h-screen gap-2 px-1 py-2">
			{player.isActive && <SongPlayer />}
			<Loader />

			<div className="SideBar basis-[100px] md:basis-[200px] lg:basis-[300px] flex flex-col gap-y-2" style={{ height: height }}>
				<div className="Logo flex justify-center items-center  bg-Middle h-[65px] md:h-[80px] rounded-lg shrink-0">
					<img src="./icons/logo.png" alt="logo" className="w-10 md:w-12 lg:w-16" />
					<span className="hidden lg:block text-white lg:text-3xl font-semibold">
						Songs
					</span>
				</div>
				<nav className="px-4 flex flex-col gap-y-4 py-4 items-center lg:items-start bg-Middle rounded-lg h-full">
					<NavLink to="/">
						<div className="text-TextDark flex gap-x-2 hover:text-white">
							<HomeIcon className="text-gray-400" />
							<span className="hidden lg:block">Home</span>
						</div>
					</NavLink>
					<NavLink to="/add-Song">
						<div className="text-TextDark flex gap-x-2 hover:text-white">
							<AddIcon className="text-gray-400" />
							<span className="hidden lg:block">Add Song</span>
						</div>
					</NavLink>
				</nav>
			</div>
			<div
				className={`RightSide w-full flex flex-col gap-2  `}
				style={{ maxHeight: height }}
			>
				<div className="HeaderNav items-center bg-Middle  w-full h-[65px] md:h-[80px]  rounded-lg flex i pl-[20px] md:pl[50px] flex-shrink-0">
					<div className="w-full">
						<SearchFeature />
					</div>
				</div>
				<div className="w-full flex flex-col items-center overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700  scrollbar-track-black py-2.5 lg:py-10 px-2.5 md:px-4">
					<div className="contentSpace  max-w-[1440px]  rounded-lg   ">
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
}
