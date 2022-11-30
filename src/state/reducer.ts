import { createSlice } from "@reduxjs/toolkit";
import { QueryResult } from "../data/types";

export type AppState = {
    query: string
    result: QueryResult,
    sessionId: string
};

const initialState: AppState = {
    query: '',
    result: {} as QueryResult,
    sessionId: ''
}

const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setSessionId: (state, action) => {
            state.sessionId = action.payload;
        },
        storeQuery: (state, action) => {
            state.query = action.payload;
        },
        storeResult: (state, action) => {
            state.result = action.payload;
        }
    }
});

export const { setSessionId, storeQuery, storeResult } = appSlice.actions;
const appReducer = appSlice.reducer;
export default appReducer;