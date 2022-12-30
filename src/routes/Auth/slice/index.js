import { injectReducer } from '@/store';
import { createSlice } from '@reduxjs/toolkit';

export const name = 'auth';

export const initialState = {
    user: {
        firstName: '',
        lastName: '',
        role: '',
        id: '',
    },
};

const slice = createSlice({
    name,
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user.firstName = action.payload.firstName;
            state.user.lastName = action.payload.lastName;
            state.user.role = action.payload.role;
            state.user.id = action.payload.id;
        },
    },
});

injectReducer(name, slice.reducer);

export const { setUser } = slice.actions;

export default slice;
