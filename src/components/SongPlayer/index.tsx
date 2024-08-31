import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { nextSong, prevSong, playPause, setVolume, setDuration } from '../../lib/redux/features/player/playerSlice';
import Controls from './Controls';
import Player from './Player';
import Seekbar from './Seekbar';
import Track from './Track';;
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
    <div className=" sm:px-12 -ml-1 fixed bottom-0 w-full flex py-1 z-50 items-center justify-between backdrop-blur-md bg-[#545353]">
      <Track isPlaying={isPlaying} isActive={isActive} activeSong={currentTrack} />
      <div className="flex-1 flex flex-col items-center justify-center">
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
            setAppTime(target.currentTime)
          }}
          onLoadedData={(event: React.FormEvent<HTMLAudioElement>) => {
            const target = event.target as HTMLAudioElement;
            dispatch(setDuration(target.duration))
          }}
        />
      </div>
      <VolumeBar value={volume} min="0" max="1" onChange={(event) => {
        const target = event.target as HTMLInputElement;
        dispatch(setVolume(parseFloat(target.value)))
      }} />
    </div>
  );
};

export default SongPlayer;
