import { initialState, name } from '.';

import { createSelector } from '@reduxjs/toolkit';

const selectDomain = (state) => state[name] || initialState;

export const selectCounter = createSelector([selectDomain], (state) => state.counter);
export const selectHello = createSelector([selectDomain], (state) => state.hello);
