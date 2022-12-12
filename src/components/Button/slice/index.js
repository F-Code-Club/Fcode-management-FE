import { handler } from './../helper/ApiHandler';

import { getAllBlogs } from '@/routes/Blog/slice';
import { injectReducer } from '@/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const initialState = {
    // make action button to the right of header bar
    actionButtons: {
        type: 'inactive',
        // TODO: change this when finish testing
        isShow: false, // show or not.
        buttons: [],
    },
};

export const name = 'actionButtons';
const approveArticle = createAsyncThunk(
    `${name}/approve`,
    async (action, articleId, successContent, thunkApi) => {
        // call approveArticle with handle exception
        console.log(successContent);
        console.log(articleId);
        thunkApi.dispatch(getAllBlogs());
        return await handler(
            'approveArticle',
            action.payload.articleId,
            action.payload.successContent
        ).then((res) => res.data);
    }
);
const disapproveArticle = createAsyncThunk(
    `${name}/disapprove`,
    async (action, articleId, successContent, thunkApi) => {
        // call approveArticle with handle exception
        console.log(successContent);
        console.log(articleId);
        thunkApi.dispatch(getAllBlogs());
        return await handler(
            'disapproveArticle',
            action.payload.articleId,
            action.payload.successContent
        ).then((res) => res.data);
    }
);
const deleteArticle = createAsyncThunk(
    `${name}/disapprove`,
    async (action, articleId, successContent, thunkApi) => {
        // call approveArticle with handle exception
        console.log(successContent);
        console.log(articleId);
        thunkApi.dispatch(getAllBlogs());
        return await handler(
            'deleteArticle',
            action.payload.articleId,
            action.payload.successContent
        ).then((res) => res.data);
    }
);
export const handleClick = createAsyncThunk(`${name}/blogsHandle`, async (props, thunkApi) => {
    const { action, articleId, successContent } = props;
    // call approveArticle with handle exception
    thunkApi.dispatch(getAllBlogs());
    console.log('Button thunk:  ' + articleId);
    await handler(action, articleId, successContent);
});
export const slice = createSlice({
    name,
    initialState,
    reducers: {
        changeButtons: (state, action) => {
            state.actionButtons = action.payload;
        },
        approve: (state, action) => {
            // call approveArticle with handle exception
            handler('approveArticle', action.payload.articleId, action.payload.successContent);
        },
        delete: (state, action) => {
            // call deleteArticle with handle exception
            handler('deleteArticle', action.payload.articleId, action.payload.successContent);
        },
        disApprove: (state, action) => {
            // call disapproveArticle with handle exception
            handler('disapproveArticle', action.payload.articleId, action.payload.successContent);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(handleClick.fulfilled, () => {
            console.log('handle click');
        });
    },
});
injectReducer(name, slice.reducer);

export const { actions } = slice;
export const buttonActions = {
    approveArticle,
    disapproveArticle,
    deleteArticle,
    handleClick,
};
export default slice;
