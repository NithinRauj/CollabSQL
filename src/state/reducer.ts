import { createSlice } from "@reduxjs/toolkit";
import { QueryResult } from "../data/types";

export type AppState = {
    query: string
    result: QueryResult
};

const initialState: AppState = {
    query: "",
    result: {} as QueryResult
}

const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        storeQuery: (state, action) => {
            state.query = action.payload;
        },
        storeResult: (state, action) => {
            state.result = action.payload;
        }
    }
});

export const { storeQuery, storeResult } = appSlice.actions;
const appReducer = appSlice.reducer;
export default appReducer;