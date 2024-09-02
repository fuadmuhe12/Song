import { useDispatch, useSelector } from "react-redux";
import Song from "../components/song";
import { } from "../constant/demo";
import { RooTstate } from "../lib/redux/store/store";
import { useEffect } from "react";
import { getSongs } from "../lib/redux/features/songs/songSlice";

export interface songData {
  _id: number;
  title: string;
  artist: string;
  description: string;
  coverPhotoUrl: string;
  audioUrl: string;
  category: string;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
}
export default function Home() {
  const songs = useSelector((state: RooTstate) => state.songs);

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getSongs({ categoryID: null, search: "" }));


  }, [])
  if (songs.songs.length === 0 && !songs.isLoading) {
    return <p className=" text-center fixed top-1/2 text-white left-1/2">No song is available</p>
  }
  return (
    <div className="grid grid-cols-auto-fill gap-3 justify-items-center pb-24">
      {songs.songs.map((song, ind) => {
        return (
          <Song key={ind} {...song} />
        )
      })}
    </div>
  )
}