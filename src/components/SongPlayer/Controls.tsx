import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { BsArrowRepeat, BsFillPauseFill, BsFillPlayFill, BsShuffle } from 'react-icons/bs';
import { setRepeat, setShuffle } from '../../lib/redux/features/player/playerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RooTstate } from '../../lib/redux/store/store';

type ControlsProps = {
  handlePlayPause: () => void;
  handlePrevSong: () => void;
  handleNextSong: () => void;
};

const Controls = ({ handlePlayPause, handlePrevSong, handleNextSong }: ControlsProps) => {
  const { isPlaying, repeat, shuffle, songList } = useSelector((state: RooTstate) => state.player);
  const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-around md:w-36 lg:w-52 2xl:w-80">
      <BsArrowRepeat size={20} color={repeat ? 'red' : 'white'} onClick={() => dispatch(setRepeat())} className="hidden sm:block cursor-pointer" />
      {songList?.length && <MdSkipPrevious size={30} color="#FFF" className="cursor-pointer" onClick={handlePrevSong} />}
      {isPlaying ? (
        <BsFillPauseFill size={45} color="#FFF" onClick={handlePlayPause} className="cursor-pointer" />
      ) : (
        <BsFillPlayFill size={45} color="#FFF" onClick={handlePlayPause} className="cursor-pointer" />
      )}
      {songList?.length && <MdSkipNext size={30} color="#FFF" className="cursor-pointer" onClick={handleNextSong} />}
      <BsShuffle size={20} color={shuffle ? 'red' : 'white'} onClick={() => dispatch(setShuffle())} className="hidden sm:block cursor-pointer" />
    </div>
  )
};

export default Controls;
