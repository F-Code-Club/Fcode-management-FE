import axios from 'axios';

import { API_URL } from '@/config';
import { injectReducer } from '@/store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const initialState = {
    isLoading: false,
    isError: false,
    listResources: [
        // {
        //     title: 'fdsfewe',
        //     description: 'fdsfsdfewew',
        //     id: 1,
        //     imgs: ['https://th.bing.com/th/id/OIP.RljlkJZn2KZ32GryAnAP8AHaD4?pid=ImgDet&rs=1'],
        // },
    ],
};
export const SUBJECT_URL = API_URL + '/subject/all';

export const fetchAllSubject = createAsyncThunk('listResources/fetchAllSubject', async () => {
    const response = await axios.get(SUBJECT_URL);

    return response.data.data;
});

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
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllSubject.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllSubject.fulfilled, (state, action) => {
                state.isLoading = false;
                state.listResources.push(action.payload);
            })
            .addCase(fetchAllSubject.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

injectReducer(name, slice.reducer);

export const { actions } = slice;
