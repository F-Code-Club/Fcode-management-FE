import { injectReducer } from '@/store';
import articleApi from '@/utils/apiComponents/articleApi';
import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    // make action button to the right of header bar
    actionButtons: {
        type: 'hidden',
        // TODO: change this when finish testing
        isShow: false, // show or not.
        buttons: [],
    },
};

export const name = 'actionButtons';

export const slice = createSlice({
    name,
    initialState,
    reducers: {
        changeButtons: (state, action) => {
            state.actionButtons = action.payload;
        },
        // TODO: using this to call button onClick handler
        handleHidden: (state, action) => {
            articleApi.approveArticle(action.payload);
        },
        handleApprove: (state, action) => {
            articleApi.approveArticle(action.payload);
        },
    },
});
injectReducer(name, slice.reducer);

export const { actions } = slice;

export default slice;
