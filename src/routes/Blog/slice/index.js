import { toastError } from './../../../components/ToastNotification/index';
import articleApi from './../../../utils/apiComponents/articleApi';

import { injectReducer } from '@/store';
import { searchString } from '@/utils/stringHelper';
// import articleApi from '@/utils/apiComponents/articleApi';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const name = 'blog';

export const initialState = {
    currentBlog: {},
    active: [],
    processing: [],
    inactive: [],
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
export const getAllBlogs = createAsyncThunk('blog/getAllBlogs', async () => {
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
        builder
            .addCase(getAllBlogs.fulfilled, (state, action) => {
                state.active = action.payload.active?.sort((a, b) => (a.id > b.id ? 1 : -1));
                state.processing = action.payload.processing?.sort((a, b) =>
                    a.id > b.id ? 1 : -1
                );
                state.inactive = action.payload.inactive?.sort((a, b) => (a.id > b.id ? 1 : -1));
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
            });
    },
});

injectReducer(name, slice.reducer);

export const { changeBlog } = slice.actions;

export default slice;
