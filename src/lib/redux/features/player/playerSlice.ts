import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PLAYER, playerSliceState, SongType } from "../type";

const initialState: playerSliceState = {
    isPlaying: false,
    volume: 0.5,
    currentTime: 0,
    duration: 0,
    currentTrack: null,
};

const playerSlice = createSlice({
    name: PLAYER,
    initialState,
    reducers: {
        play: (state) => {
            state.isPlaying = true;
        },
        pause: (state) => {
            state.isPlaying = false;
        },
        setVolume: (state, action: PayloadAction<number>) => {
            state.volume = action.payload;
        },
        setCurrentTime: (state, action: PayloadAction<number>) => {
            state.currentTime = action.payload;
        },
        setDuration: (state, action: PayloadAction<number>) => {
            state.duration = action.payload;
        },
        setCurrentTrack: (state, action: PayloadAction<SongType>) => {
            state.currentTrack = action.payload;
        },
        resetDefault: (state) => {
            state.isPlaying = false;
            state.volume = 0.5;
            state.currentTime = 0;
            state.duration = 0;
            state.currentTrack = null;
        }
    },
});

export const { play, pause, setVolume, setCurrentTime, setDuration, setCurrentTrack, resetDefault } = playerSlice.actions;
export default playerSlice.reducer;