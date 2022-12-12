import axios from 'axios';

import { API_URL } from '@/config';
import { injectReducer } from '@/store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const initialState = {
    isLoading: false,
    isError: false,
    listResourceChild: [
        // {
        //     title: 'sources 1',
        //     description:
        //         ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet facilisis',
        //     id: 1,
        //     imgs: ['https://th.bing.com/th/id/OIP.RljlkJZn2KZ32GryAnAP8AHaD4?pid=ImgDet&rs=1'],
        //     link: 'http://github.com/123456',
        // },
        // {
        //     title: 'sources 2',
        //     description:
        //         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet facilisis',
        //     id: 2,
        //     imgs: ['https://th.bing.com/th/id/OIP.RljlkJZn2KZ32GryAnAP8AHaD4?pid=ImgDet&rs=1'],
        //     link: 'http://github.com/123456',
        // },
    ],
};
export const RESOURCE_SUBJECT_URL = API_URL + '/resource/subject';

export const name = 'resourceChildren';
export const fetchResourceBySubjectId = createAsyncThunk(
    'resourceChildren/fetchResourceBySubjectId',
    async (id) => {
        console.log(id);
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
