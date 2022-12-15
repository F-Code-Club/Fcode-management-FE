import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import AdminRoute from './AdminRoute';
import { ManageAnnouncement } from './Announcement';
import { ViewAnnouncement } from './Announcement/components/ViewAnnouncement';
import Auth from './Auth';
import BlogDetailComponent from './Blog/Detail/index';
import ManagerRoute from './ManagerRoute';
import MemberRoute from './MemberRoute';
import PublicRoute from './PublicRoute';
import TestRouteManager from './TestManagerRoute';
import TestRouteAdmin from './testRouteAdmin';

import LayoutComponent from '@/components/Layout/Layout.component';
import Blog from '@/routes/Blog';
import EditAccount from '@/routes/EditAccount';
import { Homepage } from '@/routes/Homepage';

const publicRoute = [
    { index: true, path: 'home', component: <Homepage />, exact: true, restrict: true },
    {
        index: false,
        path: 'account/edit-account',
        component: <EditAccount />,
        exact: true,
        restrict: true,
    },
    {
        index: false,
        path: 'manage-announcement',
        component: <ManageAnnouncement />,
        exact: true,
        restrict: true,
    },
    {
        index: false,
        path: 'manage-announcement/view-announcement/:id',
        component: <ViewAnnouncement />,
        exact: true,
        restrict: true,
    },
];
const adminRoute = [
    {
        index: true,
        path: 'routeAdmin',
        component: <TestRouteAdmin />,
        exact: false,
        restrict: true,
    },
];
const managerRoute = [
    {
        index: true,
        path: 'routeManager',
        component: <TestRouteManager />,
        exact: false,
        restrict: true,
    },
    { index: false, path: '/blog', component: <Blog />, exact: true, restrict: true },
];
const memberRoute = [
    { index: true, path: 'private', component: <Homepage />, exact: true, restrict: true },

    {
        index: false,
        path: '/blog/:key',
        component: <BlogDetailComponent />,
        exact: false,
        restrict: true,
    },
];

const RouterComponent = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Navigate to="home" />} />
                <Route exact element={<AdminRoute />}>
                    <Route exact element={<LayoutComponent />}>
                        {adminRoute.map((route) => (
                            <Route
                                index={route.index}
                                key={route.path}
                                path={route.path}
                                element={route.component}
                                exact={route.exact}
                                restrict={route.restrict}
                            />
                        ))}
                    </Route>
                </Route>

                <Route exact element={<ManagerRoute />}>
                    <Route exact element={<LayoutComponent />}>
                        {managerRoute.map((route) => (
                            <Route
                                index={route.index}
                                key={route.path}
                                path={route.path}
                                element={route.component}
                                exact={route.exact}
                                restrict={route.restrict}
                            />
                        ))}
                    </Route>
                </Route>

                <Route exact element={<MemberRoute />}>
                    <Route exact element={<LayoutComponent />}>
                        {memberRoute.map((route) => (
                            <Route
                                index={route.index}
                                key={route.path}
                                path={route.path}
                                element={route.component}
                                exact={route.exact}
                                restrict={route.restrict}
                            />
                        ))}
                    </Route>
                </Route>
                <Route exact path="/" element={<PublicRoute />}>
                    <Route exact element={<LayoutComponent />}>
                        {publicRoute.map((route) => (
                            <Route
                                index={route.index}
                                key={route.path}
                                path={route.path}
                                element={route.component}
                                exact={route.exact}
                                restrict={route.restrict}
                            />
                        ))}
                    </Route>
                </Route>
                <Route path="/auth" element={<Auth />} />
                <Route path="*" element={<p>404</p>} />
            </Routes>
        </BrowserRouter>
    );
};

export default RouterComponent;
