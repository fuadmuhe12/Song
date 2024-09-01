import React from 'react';
import { BsFillVolumeUpFill, BsVolumeDownFill, BsFillVolumeMuteFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { setVolume } from '../../lib/redux/features/player/playerSlice';

type VolumeBarProps = {
  value: number;
  min: string;
  max: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const VolumeBar = ({ value, min, max, onChange }: VolumeBarProps) => {
  const dispatch = useDispatch();

  return (
    <div className="hidden lg:flex flex-1 items-center justify-end space-x-3">
      {value > 0.5 && (
        <BsFillVolumeUpFill
          size={25}
          color="#FFF"
          className="cursor-pointer transition-transform transform hover:scale-110"
          onClick={() => dispatch(setVolume(0))}
        />
      )}
      {value > 0 && value <= 0.5 && (
        <BsVolumeDownFill
          size={25}
          color="#FFF"
          className="cursor-pointer transition-transform transform hover:scale-110"
          onClick={() => dispatch(setVolume(0))}
        />
      )}
      {value === 0 && (
        <BsFillVolumeMuteFill
          size={25}
          color="#FFF"
          className="cursor-pointer transition-transform transform hover:scale-110"
          onClick={() => dispatch(setVolume(1))}
        />
      )}
      <input
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onChange={onChange}
        className="2xl:w-40 lg:w-32 h-1 ml-2 appearance-none bg-gray-400 rounded-full overflow-hidden"
      />
      <style>{`
        input[type='range']::-webkit-slider-runnable-track {
          background: linear-gradient(to right, #1db954 ${value * 100}%, #535353 ${value * 100}%);
        }
        input[type='range']::-moz-range-track {
          background: linear-gradient(to right, #1db954 ${value * 100}%, #535353 ${value * 100}%);
        }
        input[type='range']::-ms-fill-lower {
          background: #1db954;
        }
        input[type='range']::-ms-fill-upper {
          background: #535353;
        }
      `}</style>
    </div>
  );
};

export default VolumeBar;
