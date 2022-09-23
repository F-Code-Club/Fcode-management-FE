import { injectReducer } from '@/store';
import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    titleHeader: 'Trang chủ',
};

export const name = 'title';

export const slice = createSlice({
    name,
    initialState,
    reducers: {
        changeTitle: (state, action) => {
            state.titleHeader = action.payload;
        },
    },
});
injectReducer(name, slice.reducer);

export const { actions } = slice;

export default slice;
