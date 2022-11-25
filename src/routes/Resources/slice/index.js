import { injectReducer } from '@/store';
import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    listResources: [
        {
            title: 'fdsfewe',
            description: 'fdsfsdfewew',
            id: 1,
            imgs: ['https://th.bing.com/th/id/OIP.RljlkJZn2KZ32GryAnAP8AHaD4?pid=ImgDet&rs=1'],
        },
    ],
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
