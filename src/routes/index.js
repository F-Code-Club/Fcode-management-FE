import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Error403Page from './403Page';
import Error404Page from './404Page';
import AdminRoute from './AdminRoute';
import { ManageAnnouncement } from './Announcement';
import { ViewAnnouncement } from './Announcement/components/ViewAnnouncement';
import Auth from './Auth';
import Blog from './Blog';
import BlogDetailComponent from './Blog/Detail';
import PersonalBlog from './Blog/Personal';
import PersonalDetailBlog from './Blog/Personal/Detail/index';
import BlogForm from './Blog/Personal/Form';
import Event from './Event/Index';
import ManagerRoute from './ManagerRoute';
import Recruitment from './MemberRecuritment';
import MemberRoute from './MemberRoute';
import PublicRoute from './PublicRoute';
import QuestionManagement from './Question/index';
import ResourcesSection from './Resources';
import ViewResource from './Resources/viewResources';
import TestRouteManager from './TestManagerRoute';

// import TestRouteAdmin from './testRouteAdmin';
import LayoutComponent from '@/components/Layout/Layout.component';
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
        path: 'manage-resource',
        component: <ResourcesSection />,
        exact: true,
        restrict: true,
    },
    {
        path: 'manage-resource',
        component: <ResourcesSection />,
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
    {
        index: false,
        path: 'manage-resource/:id',
        component: <ViewResource />,
        exact: true,
        restrict: true,
    },
];
const adminRoute = [
    {
        index: true,
        path: 'comment',
        component: <QuestionManagement />,
        exact: true,
        restrict: true,
    },
];

const managerRoute = [
    {
        path: 'private',
        component: <Homepage />,
        exact: true,
        restrict: true,
    },
    {
        path: 'recruitmembers',
        component: <Recruitment />,
        exact: true,
        restrict: true,
    },
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
        path: 'event',
        component: <Event />,
        index: false,
        restrict: true,
    },
    {
        path: '/blog/:id',
        component: <BlogDetailComponent />,
        exact: false,
        restrict: true,
    },
    // Personal Blog
    {
        path: '/personal-blog',
        component: <PersonalBlog />,
        exact: true,
        restrict: true,
    },
    // {
    //     path: '/blog/:key',
    //     component: <BlogDetailComponent />,
    //     exact: false,
    //     restrict: true,
    // },
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
                <Route path="/403" element={<Error403Page />} />

                <Route path="*" element={<Error404Page />} />
            </Routes>
        </BrowserRouter>
    );
};

export default RouterComponent;
