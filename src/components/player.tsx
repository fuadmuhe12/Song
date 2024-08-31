import { useSelector } from "react-redux";
import { RooTstate } from "../lib/redux/store/store";

type PlayerProps = {
    audioUrl: string;
};

export default function Player({ audioUrl }: PlayerProps) {
    const stateAppp = useSelector((state: RooTstate) => state);
    return (
        <div className="w-screen p-2 filter fixed z-50 backdrop:bg-white bottom-1">
            <audio src={audioUrl} controls className="w-full bg-Bright" autoPlay={stateAppp.player.isPlaying}></audio>
        </div>
    )
}
