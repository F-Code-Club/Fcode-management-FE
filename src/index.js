import React from 'react';

import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { themes } from 'theme/theme';

import './index.css';
import reportWebVitals from './reportWebVitals';
import RouterComponent from './routes';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeSwitcherProvider themeMap={themes} defaultTheme="light">
                <RouterComponent />
            </ThemeSwitcherProvider>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
