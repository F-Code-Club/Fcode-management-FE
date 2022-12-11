import { approveButton } from './../../../components/Button/slice/index';

import { injectReducer } from '@/store';
// import articleApi from '@/utils/apiComponents/articleApi';
import { createSlice } from '@reduxjs/toolkit';

export const name = 'blog';

export const initialState = {
    currentBlog: {},
    active: [],
    processing: [],
    inactive: [],
};
// TODO: make a thunk to call async function

const slice = createSlice({
    name,
    initialState,
    reducers: {
        changeBlog: (state, action) => {
            state.currentBlog = action.payload;
        },
        changeActiveBlogs: (state, action) => {
            state.active = action.payload;
        },
        changeProcessingBlogs: (state, action) => {
            state.processing = action.payload;
        },
        changeInactiveBlogs: (state, action) => {
            state.inactive = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(approveButton.fulfilled, (state, action) => {
            console.log(state.blog);
            console.log(action);
        });
    },
});

injectReducer(name, slice.reducer);

export const { changeBlog, changeActiveBlogs, changeInactiveBlogs, changeProcessingBlogs } =
    slice.actions;

export default slice;
