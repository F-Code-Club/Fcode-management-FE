import { useState, useEffect } from 'react';

import localStorageUtils from './localStorageUtils';

//this custom state can get an item from local storage persistently. When a key change, the value in local storage will also change.
const usePersistedState = (key, defaultValue = '') => {
    const [state, setState] = useState(() => localStorageUtils.getItem(key, defaultValue));

    useEffect(() => {
        localStorageUtils.setItem(key, defaultValue);
    }, [state, key]);
    return [state, setState];
};
export default usePersistedState;
