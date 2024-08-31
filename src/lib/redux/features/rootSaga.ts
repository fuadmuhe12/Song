import { fork, all } from "redux-saga/effects";
import { watchGetSongsSaga } from "./songs/saga";
import { watchDeleteSongSaga } from "./songs/saga";

function* rootSaga() {
    yield all([
        fork(watchGetSongsSaga),
        fork(watchDeleteSongSaga)

    ]);
}

export default rootSaga;