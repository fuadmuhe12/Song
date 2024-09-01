import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IoIosRemoveCircle } from "react-icons/io";

import { nextSong, prevSong, playPause, setVolume, setDuration, resetSemi } from '../../lib/redux/features/player/playerSlice';
import Controls from './Controls';
import Player from './Player';
import Seekbar from './Seekbar';
import Track from './Track';
import VolumeBar from './VolumeBar';
import { RooTstate } from '../../lib/redux/store/store';

const SongPlayer = () => {
  const { currentTrack, duration, isActive, isPlaying, volume } = useSelector((state: RooTstate) => state.player);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const dispatch = useDispatch();

  const handlePlayPause = () => {
    if (!isActive) return;

    if (isPlaying) {
      dispatch(playPause(false));
    } else {
      dispatch(playPause(true));
    }
  };

  const handleNextSong = () => {
    dispatch(playPause(false));
    dispatch(nextSong());
    dispatch(playPause(true));
  };

  const handlePrevSong = () => {
    dispatch(playPause(false));
    dispatch(prevSong());
    dispatch(playPause(true));
  };

  return (
    <div className="sm:px-12 fixed bottom-0 w-full flex py-4 z-50 items-center justify-between backdrop-blur-lg bg-black/60 shadow-lg border-t border-gray-700 rounded-t-xl">
      <div className="absolute top-3 right-3 z-50">
        <button
          onClick={() => dispatch(resetSemi())}
          className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full shadow-lg transition-all duration-200 ease-in-out transform hover:scale-110 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <IoIosRemoveCircle className="w-5 h-5 font-extrabold" />
        </button>
      </div>



      <Track isPlaying={isPlaying} isActive={isActive} activeSong={currentTrack} />

      <div className="flex-1 flex flex-col items-center justify-center relative">
        <Controls
          handlePlayPause={handlePlayPause}
          handlePrevSong={handlePrevSong}
          handleNextSong={handleNextSong}
        />
        <Seekbar
          value={appTime}
          min="0"
          max={duration}
          setSeekTime={setSeekTime}
          appTime={appTime}
        />
        <Player
          seekTime={seekTime}
          onEnded={handleNextSong}
          onTimeUpdate={(event: React.FormEvent<HTMLAudioElement>) => {
            const target = event.target as HTMLAudioElement;
            setAppTime(target.currentTime);
          }}
          onLoadedData={(event: React.FormEvent<HTMLAudioElement>) => {
            const target = event.target as HTMLAudioElement;
            dispatch(setDuration(target.duration));
          }}
        />
      </div>

      <VolumeBar
        value={volume}
        min="0"
        max="1"
        onChange={(event) => {
          const target = event.target as HTMLInputElement;
          dispatch(setVolume(parseFloat(target.value)));
        }}
      />
    </div>
  );
};

export default SongPlayer;
