import { useEffect, useState } from "react";
import { formatDateToMonthYear } from "../lib/utils/formatData";
import { Button } from "@mui/material";
import { PlayIcon } from "./Icons";
import { useDispatch, useSelector } from "react-redux";
import { playPause, setCurrentTrack, setSongList } from "../lib/redux/features/player/playerSlice";
import { appDispatch, RooTstate } from "../lib/redux/store/store";
import { getSongs } from "../lib/redux/features/songs/songSlice";
import { notifyError, notifySuccess, ToastContainerDefault } from "./toast";
import { useDeleteSongMutation } from "../lib/redux/features/songs/apiSlice";
import { MdEditDocument, MdPause } from "react-icons/md";
import { Link } from "react-router-dom";
import { SongType } from "../lib/redux/features/type";


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
	const [showPlay, setShowPlay] = useState(false);
	const newDate = formatDateToMonthYear(updatedDate);
	const handleMouseEnter = () => {
		setShowPlay(true);
	};
	const handleMouseLeave = () => {
		setShowPlay(false);
	};
	const [delSong, { isError: isDelSongError, error: delSongError, isSuccess: isDelSongSuccess }] = useDeleteSongMutation();
	const dispatch: appDispatch = useDispatch();
	const player = useSelector((state: RooTstate) => state.player);
	const songs = useSelector((state: RooTstate) => state.songs);
	useEffect(() => {
		if (isDelSongSuccess) {
			notifySuccess("Song deleted successfully");
		} else {
			notifyError(delSongError as string);
		};

	}, [delSongError, isDelSongError, isDelSongSuccess]);

	return (
		<div
			className="max-w-52 p-4 bg-[#1E1E1E] hover:bg-[#272727] rounded-lg shadow-lg flex flex-col gap-y-4 relative"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div className="relative">
				<img
					src={coverPhotoUrl}
					alt="cover image"
					width={175}
					height={175}
					className="rounded-md object-cover"
				/>
				{player.isPlaying && player.currentTrack!.id === id && (
					<img
						src="https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f5eb96f2.gif"
						width={30}
						height={30}
						className="absolute top-2 right-2"
					/>
				)}
			</div>

			<div className="flex flex-col gap-y-2">
				<h1 className="font-bold text-white text-lg">{title}</h1>
				<p className="text-[#A7A7A7] text-sm">{artist}</p>
				<p className="text-[#A7A7A7] text-xs">{description}</p>
				<div className="flex gap-x-2 text-[#89999B] font-light text-sm mt-2">
					<p>{newDate}</p>
					<p>&middot;</p>
					<p>{duration} Min</p>
				</div>
			</div>

			{showPlay && (
				<div className="absolute bottom-1 left-2 right-2 flex justify-between items-center bg-[#333] p-2 pr-5 rounded-lg">
					<Button sx={{
						'&:hover': {
							backgroundColor: 'rgba(55, 209, 104, 0.1)',
							'& .MuiSvgIcon-root': {
								color: '#2aa155',
							},
						},
					}} onClick={() => {
						dispatch(setSongList(songs.songs || []));
						dispatch(playPause(player.currentTrack?.id == id ? !player.isPlaying : true));
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

					}}>
						{player.isPlaying && player.currentTrack?.id == id ? <div className="w-6 h-6 bg-[#37d168] rounded-full flex justify-center items-center">
							<MdPause className="text-black w-4 h-4" />
						</div> : <PlayIcon className="text-[#37d168] w-7 h-7" />}
					</Button>
					<Link to={`/update-song/${id}`} >
						<Button sx={{
							'&:hover': {
								backgroundColor: 'rgba(55, 209, 104, 0.1)',
								'& .MuiSvgIcon-root': {
									color: '#2aa155',
								},
							},
						}} >
							<MdEditDocument className="text-[#37d168] w-6 h-6" />
						</Button>
					</Link>
					<Button sx={{
						'&:hover': {
							backgroundColor: 'rgba(55, 209, 104, 0.1)',
							'& .MuiSvgIcon-root': {
								color: '#2aa155',
							},
						},
					}} onClick={async () => {
						await delSong(id);
						if (isDelSongError) {
							notifyError(delSongError as string);
						}
						if (isDelSongSuccess) {
							notifySuccess("Song deleted successfully");
						}
						dispatch(getSongs({ categoryID: null, search: undefined }));
					}}>
						<img src="./icons/delete.png" alt="delete" width={24} height={24} />
					</Button>
				</div>
			)}
			<ToastContainerDefault />
		</div>
	);
}
