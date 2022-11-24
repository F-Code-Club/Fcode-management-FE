import { injectReducer } from '@/store';
import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    listResources: [],
};

export const name = 'resources';

export const slice = createSlice({
    name,
    initialState,
    reducers: {
        addResource: (state, action) => {
            state.listResources.push(action.payload);
        },
        deleteResource: (state, action) => {
            state.listResources = state.listResources.filter(
                (resource) => resource.id !== action.payload
            );
        },
    },
});

injectReducer(name, slice.reducer);

export const { actions } = slice;
