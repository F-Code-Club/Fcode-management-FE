import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

// eslint-disable-next-line import/no-unresolved
import AppSidebar from 'components/Sidebar/Sidebar.component';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import Home from 'routes/Home';

const publicRoute = [
    {
        path: 'home',
        component: <AppSidebar />,
        exact: true,
        restrict: true,
    },
    {
        path: 'home2',
        component: <Home />,
        exact: true,
        restrict: true,
    },
];

const privateRoute = [
    {
        path: 'private',
        component: <Home />,
        exact: true,
        restrict: true,
    },
];

const RouterComponent = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Navigate to="/home" />} />
                <Route exact path="/" element={<PrivateRoute />}>
                    {privateRoute.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={route.component}
                            exact={route.exact}
                            restrict={route.restrict}
                        />
                    ))}
                </Route>
                <Route exact path="/" element={<PublicRoute />}>
                    {publicRoute.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={route.component}
                            exact={route.exact}
                            restrict={route.restrict}
                        />
                    ))}
                </Route>
                <Route path="*" element={<p>404</p>} />
            </Routes>
        </BrowserRouter>
    );
};

export default RouterComponent;
