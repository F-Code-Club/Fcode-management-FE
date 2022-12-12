import { toastError } from './../../../components/ToastNotification/index';
import articleApi from './../../../utils/apiComponents/articleApi';

import { injectReducer } from '@/store';
// import articleApi from '@/utils/apiComponents/articleApi';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const name = 'blog';

export const initialState = {
    currentBlog: {},
    active: [],
    processing: [],
    inactive: [],
};
// TODO: make a thunk to call async function

export const getAllBlogs = createAsyncThunk('blog/getAllBlogs', async () => {
    // TODO get one by one artivle
    const active = await articleApi
        .getActiveArticle()
        .then((res) => res.data.data)
        .catch((err) => {
            // eslint-disable-next-line no-console
            console.log(err);
            toastError('Lấy danh sách bài viết thất bại');
        });
    const processing = await articleApi
        .getProcessingArticle()
        .then((res) => res.data.data)
        .catch((err) => {
            // eslint-disable-next-line no-console
            console.log(err);
            toastError('Lấy danh sách bài viết thất bại');
        });
    const inactive = await articleApi
        .getInactiveArticle()
        .then((res) => res.data.data)
        .catch((err) => {
            // eslint-disable-next-line no-console
            console.log(err);
            toastError('Lấy danh sách bài viết thất bại');
        });
    return { active, processing, inactive };
});
const slice = createSlice({
    name,
    initialState,
    reducers: {
        changeBlog: (state, action) => {
            state.currentBlog = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllBlogs.fulfilled, (state, action) => {
            state.active = action.payload.active.sort((a, b) => (a.id > b.id ? 1 : -1));
            state.processing = action.payload.processing.sort((a, b) => (a.id > b.id ? 1 : -1));
            state.inactive = action.payload.inactive.sort((a, b) => (a.id > b.id ? 1 : -1));
        });
    },
});

injectReducer(name, slice.reducer);

export const { changeBlog, changeActiveBlogs, changeInactiveBlogs, changeProcessingBlogs } =
    slice.actions;

export default slice;
