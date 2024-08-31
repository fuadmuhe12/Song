import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PLAYER, playerSliceState, SongType } from "../type";
const initialState: playerSliceState = {
    isPlaying: false, // to show if the song is playing or not
    volume: 0.3,
    songList: [],
    currentTime: 0,
    duration: 0,
    currentTrack: null,
    isActive: false, // to show the player bar at the bottom of the screen even if it's not playing 
    repeat: false,
    shuffle: false,
};
const playerSlice = createSlice({
    name: PLAYER,
    initialState,
    reducers: {
        playPause(state, action: PayloadAction<boolean>) {
            state.isPlaying = action.payload;
            if (action.payload) {
                state.isActive = true;
            }
        },
        setVolume(state, action: PayloadAction<number>) {
            state.volume = action.payload;
        },
        setCurrentTime(state, action: PayloadAction<number>) {
            state.currentTime = action.payload;
        },
        setDuration(state, action: PayloadAction<number>) {
            state.duration = action.payload;
        },
        setCurrentTrack(state, action: PayloadAction<SongType>) {
            state.currentTrack = action.payload;
        },
        setActive(state, action: PayloadAction<boolean>) {
            state.isActive = action.payload;
            if (!action.payload) {
                state.isPlaying = false;
                state.volume = 0.3;
                state.currentTime = 0;
                state.duration = 0;
                state.currentTrack = null;
                state.isActive = false;
            }
        },
        setRepeat(state) {
            state.repeat = !state.repeat;
        },
        setShuffle(state) {
            state.shuffle = !state.shuffle;
        },
        resetSemi(state) {
            state.isPlaying = false;
            state.volume = 0.3;
            state.currentTime = 0;
            state.duration = 0;
            state.currentTrack = null;
            state.isActive = false;
        },
        resetAbsolute(state) {
            state.isPlaying = false;
            state.volume = 0.3;
            state.currentTime = 0;
            state.duration = 0;
            state.currentTrack = null;
            state.isActive = false;
            state.songList = [];
        },
        setSongList(state, action: PayloadAction<SongType[]>) {
            state.songList = action.payload;
        },
        nextSong(state) {

            if (!state.currentTrack) {
                if (state.songList.length > 0) {
                    state.currentTrack = state.songList[0];
                    state.isActive = true
                    state.isPlaying = true
                }
                else {
                    state.isPlaying = false;
                    state.volume = 0.3;
                    state.currentTime = 0;
                    state.duration = 0;
                    state.currentTrack = null;
                    state.isActive = false;
                }

            }
            else {
                if (state.shuffle) {
                    const randomIndex = Math.floor(Math.random() * state.songList.length);
                    state.currentTrack = state.songList[randomIndex];
                }

                else {
                    const currentIndex = state.songList.findIndex((song) => song.id === state.currentTrack?.id);
                    if (currentIndex === state.songList.length - 1) {

                        state.currentTrack = state.songList[0];
                    }
                    else {
                        state.currentTrack = state.songList[currentIndex + 1];
                    }
                }
            }
        },
        prevSong(state) {
            if (!state.currentTrack) {
                if (state.songList.length > 0) {
                    state.currentTrack = state.songList[0];
                    setActive(true);
                    playPause(true);
                }
                else {
                    resetSemi();
                }
            }
            else {
                if (state.shuffle) {
                    const randomIndex = Math.floor(Math.random() * state.songList.length);
                    state.currentTrack = state.songList[randomIndex];
                }
                else {
                    const currentIndex = state.songList.findIndex((song) => song.id === state.currentTrack?.id);
                    if (currentIndex === 0) {
                        state.currentTrack = state.songList[state.songList.length - 1];
                    }
                    else {
                        state.currentTrack = state.songList[currentIndex - 1];
                    }
                }
            }
        }
    }
});



export const { playPause, setVolume, setCurrentTime, setDuration, setCurrentTrack, setActive, setRepeat, setShuffle, nextSong, resetAbsolute, resetSemi, prevSong, setSongList } = playerSlice.actions;
export default playerSlice.reducer;