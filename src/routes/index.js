import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import BlogDetailComponent from './Blog/Detail/index';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import ResourcesSection from './Resources';

import LayoutComponent from '@/components/Layout/Layout.component';
import Blog from '@/routes/Blog';
import EditAccount from '@/routes/EditAccount';
import Home from '@/routes/Home';

// children: [
//     {
//         index: true,
//         element: <Home />,
//     },
// ],
const publicRoute = [
    {
        path: 'home',
        component: <Home />,
        exact: true,
        restrict: true,
    },
    {
        path: 'account/edit-account',
        component: <EditAccount />,
        exact: true,
        restrict: true,
    },
    {
        path: 'source',
        component: <ResourcesSection />,
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
    {
        path: '/blog',
        component: <Blog />,
        exact: true,
        restrict: true,
    },
    {
        path: '/blog/:key',
        component: <BlogDetailComponent />,
        exact: false,
        restrict: true,
    },
];

const RouterComponent = () => {
    return (
        <BrowserRouter>
            <LayoutComponent>
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
            </LayoutComponent>
        </BrowserRouter>
    );
};

export default RouterComponent;
