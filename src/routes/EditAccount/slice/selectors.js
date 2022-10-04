import { initialState, name } from '.';

import generateSelectors from '@/utils/generateSelectors';
import { createSelector } from '@reduxjs/toolkit';

const selectDomain = (state) => state[name] || initialState;

const selector = {
    ...generateSelectors(initialState, selectDomain),
    modal: {
        confirm: createSelector([selectDomain], (state) => state.modal.confirm),
        avatar: createSelector([selectDomain], (state) => state.modal.avatar),
    },
};

// export const selectSelectedGenderIndex = () =>
//     createSelector([selectDomain], (state) =>
//         state.genders.filter((gender) => gender.isSelected)
//     )[0] || 0;

export default selector;
