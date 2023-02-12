import { name, initialState } from './externalSlice';

import { createSelector } from '@reduxjs/toolkit';

const selectedDomain = (state) => state[name] || initialState;

export const selectAttends = createSelector([selectedDomain], (state) => state);
