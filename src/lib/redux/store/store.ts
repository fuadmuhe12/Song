import CreateSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import { RootReducer } from '../features/rootReducer';
import rootSaga from '../features/rootSaga';
import { apiSlice } from '../features/songs/apiSlice';


const sagaMiddleware = CreateSagaMiddleware();
export const store = configureStore({
    reducer: RootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware).concat(apiSlice.middleware)
})

sagaMiddleware.run(rootSaga);
export type RooTstate = ReturnType<typeof store.getState>
export type appDispatch = typeof store.dispatch