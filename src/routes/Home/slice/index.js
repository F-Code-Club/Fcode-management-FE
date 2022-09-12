import { injectReducer } from 'store';

import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    counter: performance.now().toFixed(0),
    hello: 'Hello World',
};

export const name = 'home';

export const slice = createSlice({
    name,
    initialState,
    reducers: {
        changeCounter: (state, action) => {
            state.counter = action.payload;
        },
    },
});

injectReducer(name, slice.reducer);

export const { actions } = slice;
