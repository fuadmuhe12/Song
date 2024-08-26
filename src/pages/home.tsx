import Song from "../components/song";
import { DemoSongData } from "../constant/demo";

export interface songData {
  _id: number;
  title: string;
  artist: string;
  description: string;
  coverPhotoUrl: string;
  audioUrl: string;
  category: string;
  duration: number;
  createdAt: string;
  updatedAt: string;
}



export default function Home() {
  return (
    <div className="grid grid-cols-auto-fill gap-1">
      {DemoSongData.map((song, ind) => {
        return (
          <Song {...song} key={ind} />
        )
      })}

    </div>
  )
}