import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SONGS, SongSliceState, SongType } from "../type";
const initialState: SongSliceState = {
    songs: [],
    isLoading: false,
    error: null
}
const songSlice = createSlice({
    name: SONGS,
    initialState,
    reducers: {
        getSongs: (state) => {
            state.isLoading = true;
            state.error = null
        },
        getSongsSuccess: (state, action: PayloadAction<SongType[]>) => {
            state.isLoading = false;
            state.songs = action.payload;
            state.error = null;
        },
        getSongsFail: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        deleteSongRed: (state, { payload: id }: PayloadAction<number>) => {
            state.error = null;
            state.isLoading = true;
            state.songs = state.songs.filter((song) => song.id !== id);
        },
        deleteSongFail: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        deleteSongSuccess: (state) => {
            state.error = null;
            state.isLoading = false;
        }
    }

});

export const { getSongs, getSongsFail, getSongsSuccess, deleteSongRed, deleteSongFail, deleteSongSuccess } = songSlice.actions;
export default songSlice.reducer
