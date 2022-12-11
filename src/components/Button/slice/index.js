import { toastSuccess, toastError } from './../../ToastNotification/index';

import { injectReducer } from '@/store';
import articleApi from '@/utils/apiComponents/articleApi';
import { createSlice } from '@reduxjs/toolkit';

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

export const slice = createSlice({
    name,
    initialState,
    reducers: {
        changeButtons: (state, action) => {
            state.actionButtons = action.payload;
        },
        approve: (state, action) => {
            articleApi
                .approveArticle(action.payload)
                .then(() => {
                    toastSuccess(action.payload.successContent);
                })
                .catch((err) => {
                    console.log(err);
                    toastError('Duyệt bài viết thất bại');
                });
        },
        delete: (state, action) => {
            try {
                articleApi.deleteArticle(action.payload.articleId);
                toastSuccess(action.payload.successContent);
            } catch (err) {
                console.log(err);
                toastError('Xoá bài viết thất bại');
            }
        },
        disApprove: (state, action) => {
            articleApi.disapproveArticle(action.payload).then(() => {
                toastSuccess(action.payload.successContent);
            });
        },
    },
});
injectReducer(name, slice.reducer);

export const { actions } = slice;

export default slice;
