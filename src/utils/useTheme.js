import { useThemeSwitcher } from 'react-css-theme-switcher';
import { useDispatch } from 'react-redux';

import { actions } from '@/theme/theme';

/**
 *
 * @param {boolean} isDarkMode true for dark or false for light
 */

const useTheme = () => {
    const dispatch = useDispatch();
    const { switcher, themes } = useThemeSwitcher();

    return (isDarkMode = true) => {
        dispatch(actions.changeMode(isDarkMode));
        switcher({ theme: isDarkMode ? themes.dark : themes.light });
    };
};

export default useTheme;
