import { createSlice } from "@reduxjs/toolkit";
import { QueryResult } from "../data/types";

export type AppState = {
    query: string
    result: QueryResult,
    sessionId: string,
    userName: string,
    isHost: boolean,
    participants: [{ id: string, name: string, typing: false }] | []
    notify: boolean,
};

const initialState: AppState = {
    query: '',
    result: {} as QueryResult,
    sessionId: '',
    userName: '',
    isHost: false,
    participants: [],
    notify: false
}

const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setUserData: (state, action) => {
            state.isHost = action.payload.isHost;
            state.sessionId = action.payload.id;
            state.userName = action.payload.userName;
        },
        setHostStatus: (state, action) => {
            state.isHost = action.payload;
        },
        setSessionId: (state, action) => {
            state.sessionId = action.payload;
        },
        setParticipants: (state, action) => {
            state.participants = action.payload;
        },
        storeQuery: (state, action) => {
            state.query = action.payload;
        },
        storeResult: (state, action) => {
            state.result = action.payload;
        },
        setNotify: (state, action) => {
            state.notify = action.payload;
        }
    }
});

export const { setSessionId, storeQuery,
    storeResult, setHostStatus,
    setUserData, setParticipants, setNotify } = appSlice.actions;
const appReducer = appSlice.reducer;
export default appReducer;