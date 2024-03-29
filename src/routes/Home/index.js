/* eslint-disable no-unused-vars */
import { useEffect } from 'react';

import { Button, Typography, Switch } from 'antd';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { useSelector, useDispatch } from 'react-redux';

import logo from '../../assets/logo.svg';
import { actions } from './slice';
import { selectCounter, selectHello } from './slice/selectors';
import { Wrapper, Logo, Header, Link } from './style';

import { actions as setTheme, selectIsDarkMode } from '@/theme/theme';

const { Text } = Typography;

const Home = () => {
    const { switcher, themes } = useThemeSwitcher();

    const dispatch = useDispatch();

    const counter = useSelector(selectCounter);
    const hello = useSelector(selectHello);

    const isDarkMode = useSelector(selectIsDarkMode);

    useEffect(() => {
        setInterval(() => dispatch(actions.changeCounter(performance.now().toFixed(0))), 100);
    }, []);

    const toggleDarkMode = () => {
        switcher({ theme: isDarkMode ? themes.light : themes.dark });
        dispatch(setTheme.changeMode(!isDarkMode));
    };

    return (
        <Wrapper>
            <Header>
                <Logo src={logo} alt="logo" />
                <Text>
                    <Text code>{hello}</Text>
                </Text>
                <Text>
                    <Text code>{counter}</Text>
                </Text>
                <Text>
                    <Button>
                        <Link
                            href="https://trello.com/b/U0T1fGS2/f-code-management"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Trello
                        </Link>
                    </Button>
                </Text>
                <Text>
                    <Switch
                        checkedChildren="🔅"
                        unCheckedChildren="🌙"
                        checked={isDarkMode}
                        defaultChecked
                        onChange={toggleDarkMode}
                    />
                </Text>
            </Header>
        </Wrapper>
    );
};

export default Home;
