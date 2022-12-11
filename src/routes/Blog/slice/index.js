import { injectReducer } from '@/store';
import { createSlice } from '@reduxjs/toolkit';

export const name = 'blog';

export const initialState = {
    currentBlog: {},
    active: [],
    processing: [],
    inactive: [],
};
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
});

injectReducer(name, slice.reducer);

export const { changeBlog, changeActiveBlogs, changeInactiveBlogs, changeProcessingBlogs } =
    slice.actions;

export default slice;
