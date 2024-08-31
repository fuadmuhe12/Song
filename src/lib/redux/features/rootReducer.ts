import songsReducer from "./songs/songSlice"
import playerReducer from "./player/playerSlice"
import { apiSlice } from "./songs/apiSlice"
import filterReducer from "./filter/filterSlice"
export const RootReducer = {
    songs: songsReducer,
    player: playerReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    filter: filterReducer
}