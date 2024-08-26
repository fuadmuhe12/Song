import { useState } from "react";
import { formatDateToMonthYear } from "../lib/utils/formatData";
import { songData } from "../pages/home";
import { Button } from "@mui/material";
import { PlayIcon } from "./Icons";

export default function Song({
	artist,
	coverPhotoUrl,
	description,
	duration,
	title,
	updatedAt,
}: songData) {
	const [showPlay, SetShowPlay] = useState(false);
	const updatedDate = formatDateToMonthYear(updatedAt);
	const HandleMouseEnter = () => {
		SetShowPlay(true);
	};
	const HandleMouseLeave = () => {
		SetShowPlay(false);
	};
	return (
		<div
			className="gap-y-4 max-w-52 flex p-4 hover:bg-Bright rounded-md  flex-col relative"
			onMouseEnter={HandleMouseEnter}
			onMouseLeave={HandleMouseLeave}
		>
			<div>
				<img
					src={coverPhotoUrl}
					alt="cover image"
					width={175}
					height={175}
					className="rounded-md"
				/>
				<span className="text-[#25626a]">{artist}</span>
			</div>
			<div className="flex flex-col gap-y-2">
				<div>
					<h1 className="font-bold text-white">{title}</h1>
					<p className="text-[#A7A7A7]">{description}</p>
				</div>
				<div className="flex gap-x-2 text-[#89999B] font-light text-sm">
					<p>{updatedDate}</p>
					<p>&middot;</p>
					<p>{duration} Min</p>
				</div>
			</div>
			<div className="absolute bottom-2 right-0 rounded-full">
				{showPlay && (
					<Button>
						<PlayIcon className="rounded-full" />
					</Button>
				)}
			</div>
		</div>
	);
}
