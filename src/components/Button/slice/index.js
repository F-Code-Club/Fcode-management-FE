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
    },
});
injectReducer(name, slice.reducer);

export const { actions } = slice;
export const buttonActions = {
    handleClick,
};
export default slice;
