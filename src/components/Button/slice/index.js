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

export const handleClick = createAsyncThunk(`${name}/blogsHandle`, async (props, thunkApi) => {
    const { action, articleId, successContent } = props;
    // call approveArticle with handle exception
    await handler(action, articleId, successContent).then(() => {
        thunkApi.dispatch(getAllBlogs());
    });
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
});
injectReducer(name, slice.reducer);

export const { actions } = slice;
export const buttonActions = {
    handleClick,
};
export default slice;
