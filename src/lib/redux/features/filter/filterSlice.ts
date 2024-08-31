import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FILTER, FilterStateType } from "../type";

const initialState: FilterStateType = {
    search: undefined,
    categoryID: undefined
}

const filterSlice = createSlice({
    name: FILTER,
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<FilterStateType>) => {
            state.search = action.payload.search;
            state.categoryID = action.payload.categoryID;
        }
    }
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer