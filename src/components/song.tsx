import { useState } from "react";
import { formatDateToMonthYear } from "../lib/utils/formatData";
import { Button } from "@mui/material";
import { PlayIcon } from "./Icons";
import { SongType } from "../lib/redux/features/type";
import { useDispatch, useSelector } from "react-redux";
import { playPause, setCurrentTrack, setSongList } from "../lib/redux/features/player/playerSlice";
import { appDispatch, RooTstate } from "../lib/redux/store/store";
import { getSongs } from "../lib/redux/features/songs/songSlice";
import { notifyError, notifySuccess, ToastContainerDefault } from "./toast";
import { useDeleteSongMutation } from "../lib/redux/features/songs/apiSlice";
import { MdEditDocument } from "react-icons/md";
import { Link } from "react-router-dom";


export default function Song({
	artist,
	coverPhotoUrl,
	description,
	duration,
	title,
	updatedDate,
	audioUrl,
	category,
	createdDate,
	id
}: SongType) {
	const [showPlay, SetShowPlay] = useState(false);
	const newDate = formatDateToMonthYear(updatedDate);
	const HandleMouseEnter = () => {
		SetShowPlay(true);
	};
	const HandleMouseLeave = () => {
		SetShowPlay(false);
	};
	const [delSong, { isError: isDelSongError, error: delSongError, isSuccess: isDelSongSuccess }] = useDeleteSongMutation();

	const dispatch: appDispatch = useDispatch();

	const player = useSelector((state: RooTstate) => state.player);
	const songs = useSelector((state: RooTstate) => state.songs)
	return (
		<div
			className="gap-y-4 max-w-52 flex p-4 hover:bg-Bright rounded-md  flex-col relative"
			onMouseEnter={HandleMouseEnter}
			onMouseLeave={HandleMouseLeave}>
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
					<p>{newDate}</p>
					<p>&middot;</p>
					<p>{duration} Min</p>
				</div>

			</div>
			{player.isPlaying && player.currentTrack!.id === id && (<img src="https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f5eb96f2.gif" width={30} height={30} />)}
			<div className="absolute bottom-2 right-0 rounded-full">
				{showPlay && <div className="flex flex-col gap-2">
					<Button onClick={() => {
						dispatch(setSongList(songs.songs || []))
						dispatch(setCurrentTrack({
							artist,
							coverPhotoUrl,
							description,
							duration,
							title,
							updatedDate,
							audioUrl,
							category,
							createdDate,
							id
						}));
						dispatch(playPause(true));
					}}>
						<PlayIcon className="rounded-full" />
					</Button>
					<Button className="hover:bg-[#37d168]" onClick={async () => {
						await delSong(id);
						if (isDelSongError) {
							notifyError(delSongError as string);
						}
						if (isDelSongSuccess) {
							notifySuccess("Song deleted successfully");
						}
						dispatch(getSongs());

					}}>
						<img src="./icons/delete.png" alt="delete" width={30} height={30} />
					</Button>
					<Link to={`/updated-song/${id}`} >
						<Button >
							<MdEditDocument className="text-[#37d168] w-8 h-8" />
						</Button>
					</Link>

				</div>}
			</div>
			<ToastContainerDefault />
		</div>
	);
}
