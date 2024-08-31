import React from 'react';
import { BsFillVolumeUpFill, BsVolumeDownFill, BsFillVolumeMuteFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { setVolume, } from '../../lib/redux/features/player/playerSlice';
type VolumeBarProps = {
  value: number,
  min: string,
  max: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}
const VolumeBar = ({ value, min, max, onChange }: VolumeBarProps) => {
  const dispatch = useDispatch();


  return (
    <div className="hidden lg:flex flex-1 items-center justify-end">
      {value <= 1 && value > 0.5 && <BsFillVolumeUpFill size={25} color="#FFF" onClick={() => dispatch(setVolume(0))} />}
      {value <= 0.5 && value > 0 && <BsVolumeDownFill size={25} color="#FFF" onClick={() => dispatch(setVolume(0))} />}
      {value === 0 && <BsFillVolumeMuteFill size={25} color="#FFF" onClick={() => dispatch(setVolume(1))} />}
      <input
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onChange={onChange}
        className="2xl:w-40 lg:w-32 md:w-32 h-1 ml-2"
      />
    </div>
  )
};

export default VolumeBar;
