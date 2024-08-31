import { SongType } from "../../lib/redux/features/type";

type TrackProps = {
  isPlaying: boolean;
  isActive: boolean;
  activeSong: SongType | null;
};

const Track = ({ isPlaying, isActive, activeSong }: TrackProps) => (
  <div className="flex-1 flex items-center justify-start">
    <div className={`${isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''} hidden sm:block h-16 w-16 mr-4`}>
      <img src={activeSong?.coverPhotoUrl} alt="cover art" className="rounded-full" />
    </div>
    <div className="w-[50%]">
      <p className="truncate text-white font-bold text-lg">
        {activeSong?.title ? activeSong?.title : 'No active Song'}
      </p>
      <p className="truncate text-gray-300">
        {activeSong?.artist ? activeSong?.artist : 'No active Song'}
      </p>
    </div>
  </div>
);

export default Track;
