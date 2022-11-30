import { injectReducer } from '@/store';
import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    listResourceChild: [
        {
            title: 'sources 1',
            description:
                ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet facilisis',
            id: 1,
            imgs: ['https://th.bing.com/th/id/OIP.RljlkJZn2KZ32GryAnAP8AHaD4?pid=ImgDet&rs=1'],
            link: 'http://github.com/123456',
        },
        {
            title: 'sources 2',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet facilisis',
            id: 2,
            imgs: ['https://th.bing.com/th/id/OIP.RljlkJZn2KZ32GryAnAP8AHaD4?pid=ImgDet&rs=1'],
            link: 'http://github.com/123456',
        },
    ],
    listPanes: [{}],
};

export const name = 'resourceChildren';

export const slice = createSlice({
    name,
    initialState,
    reducers: {
        addResourceChild: (state, action) => {
            state.listResourceChild.push(action.payload);
        },
        deleteResourceChild: (state, action) => {
            state.listResourceChild = state.listResourceChild.filter(
                (resource) => resource.id !== action.payload
            );
        },
    },
});

injectReducer(name, slice.reducer);

export const { actions } = slice;
