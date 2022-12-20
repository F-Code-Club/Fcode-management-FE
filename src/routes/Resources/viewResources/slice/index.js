import axios from 'axios';

import { API_URL } from '@/config';
import { injectReducer } from '@/store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const initialState = {
    isLoading: false,
    isError: false,
    listResourceChild: [],
};
export const RESOURCE_SUBJECT_URL = API_URL + '/resource/subject';

export const name = 'resourceChildren';
export const fetchResourceBySubjectId = createAsyncThunk(
    'resourceChildren/fetchResourceBySubjectId',
    async (id) => {
        const response = await axios.get(`${RESOURCE_SUBJECT_URL}/${id}`);
        return response.data.data;
    }
);

export const slice = createSlice({
    name,
    initialState,
    reducers: {
        addResourceChild: (state, action) => {
            state.listResourceChild.push(action.payload);
        },
        deleteResourceChild: (state, action) => {
            state.listResourceChild = state.listResourceChild.filter(
                (resource) => resource.id !== action.payload
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchResourceBySubjectId.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchResourceBySubjectId.fulfilled, (state, action) => {
                state.isLoading = false;
                state.listResourceChild.push(action.payload);
            })
            .addCase(fetchResourceBySubjectId.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

injectReducer(name, slice.reducer);

export const { actions } = slice;
