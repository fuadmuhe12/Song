import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RooTstate } from '../../lib/redux/store/store';
type PlayerProps = {
  seekTime: number;
  onEnded: () => void;
  onTimeUpdate: (event: React.FormEvent<HTMLAudioElement>) => void;
  onLoadedData: (event: React.FormEvent<HTMLAudioElement>) => void
}
const Player = ({ seekTime, onEnded, onTimeUpdate, onLoadedData }: PlayerProps) => {
  const { currentTrack, isPlaying, volume, repeat } = useSelector((state: RooTstate) => state.player);
  const ref = useRef<HTMLAudioElement>(null);
  if (ref.current) {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

  useEffect(() => {
    if (ref.current !== null) { ref.current.volume = volume };
  }, [volume]);
  // updates audio element only on seekTime change (and not on each rerender):
  useEffect(() => {
    if (ref.current !== null) {
      ref.current.currentTime = seekTime;
    }
  }, [seekTime]);

  return (
    <audio
      src={currentTrack?.audioUrl}
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  );
};

export default Player;
