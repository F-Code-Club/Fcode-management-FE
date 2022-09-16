import { initialState, name } from '.';

import generateSelectors from '@/utils/generateSelectors';

const selectDomain = (state) => state[name] || initialState;

const selector = generateSelectors(initialState, selectDomain);

// export const selectSelectedGenderIndex = () =>
//     createSelector([selectDomain], (state) =>
//         state.genders.filter((gender) => gender.isSelected)
//     )[0] || 0;

export default selector;
