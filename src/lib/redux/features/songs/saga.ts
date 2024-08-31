import { AxiosResponse } from "axios";
import { call, put, takeLatest, takeEvery } from "redux-saga/effects";
import { getSongsSuccess, getSongsFail, getSongs, deleteSongFail, deleteSongSuccess, deleteSongRed } from "../songs/songSlice";
import { MultipleAPIResponse } from "../type";
import axios from "axios";
import { API_BASE_URL } from "../../../constants";
import { PayloadAction } from "@reduxjs/toolkit";

// #region Sagas
export function* GetSongsSaga() {
    try {
        const response: MultipleAPIResponse = yield call(fetchSongs);
        if (!response.isSuccess) {
            yield put(getSongsFail(response.error || "Failed to fetch songs"));
        }
        else {
            yield put(getSongsSuccess(response.data!));
        }
    } catch (error) {
        yield put(getSongsFail(error as string || "Failed to fetch songs"));
    }
}

export function* DeleteSongSaga({ payload: id }: PayloadAction<number>) {
    try {
        const response: MultipleAPIResponse = yield call(deleteSongApi, id);
        if (!response.isSuccess) {
            yield put((deleteSongFail(response.error || "Failed to delete song")));
        }
        else {
            yield put(deleteSongSuccess());
        }
    } catch {
        yield put(deleteSongFail("Failed to delete song"));
    }
}
// #endregion




// #region API Calls
const fetchSongs = async () => {
    const response: AxiosResponse<MultipleAPIResponse> = await axios.get(`${API_BASE_URL}song`);
    return response.data;
}
const deleteSongApi = async (id: number) => {
    const response: AxiosResponse<MultipleAPIResponse> = await axios.delete(`${API_BASE_URL}song/${id}`);
    return response.data;
}
// #endregion



// #region Watchers
export function* watchGetSongsSaga() {
    yield takeLatest(getSongs.type, GetSongsSaga);
}


export function* watchDeleteSongSaga() {
    yield takeEvery(deleteSongRed.type, DeleteSongSaga);
}
// #endregion