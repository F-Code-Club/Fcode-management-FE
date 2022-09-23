import { injectReducer } from '@/store';
import testApi from '@/utils/apiComponents/testApi';
import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    // make action button to the right of header bar
    actionButtons: {
        type: 'hidden',
        // TODO: change this when finish testing
        isShow: true, // show or not.
        buttons: [
            // list of action for all button
            {
                name: 'Ẩn',
                type: '',
            },
            {
                name: 'Xoá',
                type: 'primary',
            },
        ],
    },
};

export const name = 'actionButtons';

export const slice = createSlice({
    name,
    initialState,
    reducers: {
        changeButtons: (state, action) => {
            state.actionButton = action.payload;
        },
        // TODO: using this to call button onClick handler
        handleHidden: (state, action) => {
            testApi.get(action.payload);
        },
        handleApprove: (state, action) => {
            testApi.get(action.payload);
        },
    },
});
injectReducer(name, slice.reducer);

export const { actions } = slice;

export default slice;