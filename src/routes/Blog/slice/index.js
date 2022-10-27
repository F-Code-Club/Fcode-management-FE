import { injectReducer } from '@/store';
import { createSlice } from '@reduxjs/toolkit';

const name = 'blog';

const initialState = {
    currentBlog: {
        key: 0,
        post_title: 'Tên bài viết ABC',
        author: 'Nguyễn Văn A',
        created_at: '01/01/2022',
        tags: ['Design', 'UI/UX'],
    },
};

const slice = createSlice({
    name,
    initialState,
    reducers: {
        changeBlog: (state, action) => {
            state.currentBlog = action.payload;
        },
    },
});

injectReducer(name, slice.reducer);

export const { changeBlog } = slice.actions;

export default slice;
