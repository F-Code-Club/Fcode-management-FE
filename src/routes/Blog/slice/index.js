import { toastError } from './../../../components/ToastNotification/index';

import { injectReducer } from '@/store';
import { handler } from '@/utils/apiComponents/ApiHandler';
import { searchString } from '@/utils/stringHelper';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const name = 'blog';

export const initialState = {
    currentBlog: {},
    active: [],
    processing: [],
    inactive: [],
    author: [],
    searchedActive: [],
    searchedProcessing: [],
    searchedInactive: [],
};
export const filterBlogs = createAsyncThunk('blog/filterBlogs', async (keyword, thunkApi) => {
    // search blog by keyword
    const active = thunkApi
        .getState()
        .blog.active?.filter((item) => searchString(item.title, keyword));
    const processing = thunkApi
        .getState()
        .blog.processing?.filter((item) => searchString(item.title, keyword));
    const inactive = thunkApi
        .getState()
        .blog.inactive?.filter((item) => searchString(item.title, keyword));
    return { active, processing, inactive };
});
export const getAllBlogs = createAsyncThunk('blog/getAllBlogs', async (token, thunkApi) => {
    const active = await handler('getActiveArticle', token);
    const processing = await handler('getProcessingArticle', token);
    const inactive = await handler('getInactiveArticle', token);
    const author = await handler('getArticleByAuthor', token);
    if (active == null || processing == null || inactive == null || author == null) {
        return thunkApi.rejectWithValue('Phiên đăng nhập hết hạn');
    }
    if (active instanceof Error || processing instanceof Error || inactive instanceof Error) {
        return thunkApi.rejectWithValue(processing);
    }
    return { active, processing, inactive, author };
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
        builder
            .addCase(getAllBlogs.fulfilled, (state, action) => {
                state.active = action.payload.active?.sort((a, b) => (a.id < b.id ? 1 : -1));
                state.processing = action.payload.processing?.sort((a, b) =>
                    a.id < b.id ? 1 : -1
                );
                state.inactive = action.payload.inactive?.sort((a, b) => (a.id < b.id ? 1 : -1));
                state.author = action.payload?.author?.sort((a, b) => (a.id > b.id ? 1 : -1));
                state.searchedActive = state.active;
                state.searchedProcessing = state.processing;
                state.searchedInactive = state.inactive;
            })
            .addCase(filterBlogs.fulfilled, (state, action) => {
                state.searchedActive = action.payload.active?.sort((a, b) =>
                    a.id > b.id ? 1 : -1
                );
                state.searchedProcessing = action.payload.processing?.sort((a, b) =>
                    a.id > b.id ? 1 : -1
                );
                state.searchedInactive = action.payload.inactive?.sort((a, b) =>
                    a.id > b.id ? 1 : -1
                );
            })
            .addCase(getAllBlogs.rejected, (state, action) => {
                // eslint-disable-next-line no-console

                toastError('Lấy danh sách bài viết thất bại');
            });
    },
});

injectReducer(name, slice.reducer);

export const { changeBlog } = slice.actions;

export default slice;
