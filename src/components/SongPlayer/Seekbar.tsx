import { Button, Slider, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { MdFastForward } from "react-icons/md";
import { MdFastRewind } from "react-icons/md";

type SeekbarProps = {
  value: number;
  min: string;
  max: number;
  setSeekTime: (time: number) => void;
  appTime: number;
};

const CustomSlider = styled(Slider)({
  color: '#1db954',
  height: 4,
  '& .MuiSlider-thumb': {
    width: 12,
    height: 12,
    '&:hover, &.Mui-focusVisible': {
      boxShadow: '0px 0px 0px 8px rgba(30, 215, 96, 0.16)',
    },
    '&.Mui-active': {
      boxShadow: '0px 0px 0px 14px rgba(30, 215, 96, 0.16)',
    },
  },
  '& .MuiSlider-rail': {
    opacity: 0.28,
  },

  '@media (max-width: 699px)': {
    width: 100,
  },
  '@media (min-width: 700px) and (max-width: 1199px)': {
    width: 400,
  },
  '@media (min-width: 1200px)': {
    width: '600px',
  },
});


const Seekbar = ({ value, min, max, setSeekTime, appTime }: SeekbarProps) => {
  const getTime = (time: number) => `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;

  return (
    <div className="flex flex-row items-center w-full px-4">
      <div className="hidden lg:block">
        <Button type="button" onClick={() => setSeekTime(appTime - 5)} className=" text-white">
          <MdFastRewind className="text-white w-9 h-9 pr-3" />
        </Button>
      </div>
      <Typography variant="body2" className="text-white">
        {value === 0 ? '0:00' : getTime(value)}
      </Typography>
      <CustomSlider
        value={value}
        min={parseFloat(min)}
        max={max}
        onChange={(_, newValue) => setSeekTime(newValue as number)}
        className="mx-4"
        aria-labelledby="seek-slider"
      />
      <Typography variant="body2" className="text-white">
        {max === 0 ? '0:00' : getTime(max)}
      </Typography>
      <div className="hidden lg:block">
        <Button type="button" onClick={() => setSeekTime(appTime + 5)} className=" text-white">
          <MdFastForward className="text-white  w-9 h-9 pl-3" />
        </Button>
      </div>
    </div>
  );
};

export default Seekbar;
