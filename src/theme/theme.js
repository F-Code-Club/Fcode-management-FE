import { createSelector, createSlice } from '@reduxjs/toolkit';

export const initialState = {
    isDarkMode: false,
};

export const name = 'theme';

export const slice = createSlice({
    name,
    initialState,
    reducers: {
        changeMode: (state, action) => {
            state.isDarkMode = action.payload;
        },
    },
});

export const themes = {
    dark: `${process.env.PUBLIC_URL}/antd/dark-theme.css`,
    light: `${process.env.PUBLIC_URL}/antd/light-theme.css`,
    colors: {
        primary: '#45CE7C',
        neutro5: '#D9D9D9',
    },
};

const selectDomain = (state) => state[name] || initialState;

export const selectIsDarkMode = createSelector([selectDomain], (state) => state.isDarkMode);

export const { actions } = slice;

export default slice;
