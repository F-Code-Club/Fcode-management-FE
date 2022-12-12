import { name, initialState } from './';

import { createSelector } from '@reduxjs/toolkit';

const selectedDomain = (state) => state[name] || initialState;

export const selectCurrentBlog = createSelector([selectedDomain], (state) => state);
