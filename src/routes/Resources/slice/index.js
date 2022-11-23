import { injectReducer } from '@/store';
import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    listAnnounce: [],
};

export const name = 'announcement';

export const slice = createSlice({
    name,
    initialState,
    reducers: {
        addAnnounce: (state, action) => {
            state.listAnnounce.push(action.payload);
        },
        deleteAnnounce: (state, action) => {
            state.listAnnounce = state.listAnnounce.filter((todo) => todo.id !== action.payload);
        },
    },
});

injectReducer(name, slice.reducer);

export const { actions } = slice;
