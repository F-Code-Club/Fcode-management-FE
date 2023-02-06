import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Error403Page from './403Page';
import Error404Page from './404Page';
import EditAccountByAdmin from './Accounts/EditAccount/index';
import AccountsManager from './Accounts/index';
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
import { HomepageMemeber } from './HomePageForMember';
import ManagerRoute from './ManagerRoute';
import Recruitment from './MemberRecuritment';
import MemberRoute from './MemberRoute';
import { NotifiCationMember } from './Notification';
import { ViewNotification } from './Notification/ViewNotification';
import PublicRoute from './PublicRoute';
import QuestionManagement from './Question/index';
import ResourcesSection from './Resources';
import ViewResource from './Resources/viewResources';
import TestRouteManager from './TestManagerRoute';
import UserEvent from './UserEvent';

// import TestRouteAdmin from './testRouteAdmin';
import LayoutComponent from '@/components/Layout/Layout.component';
import EditAccount from '@/routes/EditAccount';
import { Homepage } from '@/routes/Homepage';
import localStorageUtils from '@/utils/localStorageUtils';

const publicRoute = [
    { index: true, path: 'home', component: <Homepage />, exact: true, restrict: true },
    {
        path: 'account/edit-account-by-admin/:id',
        component: <EditAccountByAdmin />,
        exact: true,
        restrict: true,
    },
    {
        path: 'notifications',
        component: <NotifiCationMember />,
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
        path: 'manage-announcement/:id',
        component: <ViewAnnouncement />,
        exact: true,
        restrict: true,
    },
    {
        path: 'account',
        component: <AccountsManager />,
        index: false,
        exact: true,
        restrict: true,
    },
    {
        path: 'manage-resource/:id',
        component: <ViewResource />,
        exact: true,
        restrict: true,
    },
    {
        path: 'event',
        component: <Event />,
        index: false,
        restrict: true,
    },
    {
        index: true,
        path: 'recruitmembers',
        component: <Recruitment />,
        exact: true,
        restrict: true,
    },
];
const adminRoute = [
    { index: true, path: 'home', component: <Homepage />, exact: true, restrict: true },
    { index: false, path: '/blog', component: <Blog />, exact: true, restrict: true },
    {
        index: true,
        path: 'comment',
        component: <QuestionManagement />,
        exact: true,
        restrict: true,
    },
    {
        path: '/personal-blog',
        component: <PersonalBlog />,
        exact: true,
        restrict: true,
    },
    {
        path: '/personal-blog/:id',
        component: <PersonalDetailBlog />,
        exact: false,
        restrict: true,
    },
    {
        path: '/personal-blog/create',
        component: <BlogForm />,
        exact: true,
        restrict: true,
    },
    {
        path: '/personal-blog/edit/:id',
        component: <BlogForm />,
        exact: false,
        restrict: true,
    },
    {
        path: '/personal-blog/preview',
        component: <PersonalDetailBlog />,
        exact: true,
        restrict: true,
    },
    {
        path: '/personal-blog/preview/:id',
        component: <PersonalDetailBlog />,
        exact: false,
        restrict: true,
    },
];

const managerRoute = [
    { index: true, path: 'home', component: <Homepage />, exact: true, restrict: true },
    {
        index: true,
        path: 'routeManager',
        component: <TestRouteManager />,
        exact: false,
        restrict: true,
    },

    { index: false, path: '/blog', component: <Blog />, exact: true, restrict: true },
    // Personal Blog
    {
        path: '/personal-blog',
        component: <PersonalBlog />,
        exact: true,
        restrict: true,
    },
    {
        path: '/personal-blog/:id',
        component: <PersonalDetailBlog />,
        exact: false,
        restrict: true,
    },
    {
        path: '/personal-blog/create',
        component: <BlogForm />,
        exact: true,
        restrict: true,
    },
    {
        path: '/personal-blog/edit/:id',
        component: <BlogForm />,
        exact: false,
        restrict: true,
    },
    {
        path: '/personal-blog/preview',
        component: <PersonalDetailBlog />,
        exact: true,
        restrict: true,
    },
    {
        path: '/personal-blog/preview/:id',
        component: <PersonalDetailBlog />,
        exact: false,
        restrict: true,
    },
];
const memberRoute = [
    { index: true, path: 'home', component: <Homepage />, exact: true, restrict: true },
    {
        path: 'manage-resource/:id',
        component: <ViewResource />,
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
        path: 'notifications/:id',
        component: <ViewNotification />,
        exact: true,
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
    {
        path: '/personal-blog/:id',
        component: <PersonalDetailBlog />,
        exact: false,
        restrict: true,
    },
    {
        path: '/personal-blog/create',
        component: <BlogForm />,
        exact: true,
        restrict: true,
    },
    {
        path: '/personal-blog/edit/:id',
        component: <BlogForm />,
        exact: false,
        restrict: true,
    },
    {
        path: '/personal-blog/preview',
        component: <PersonalDetailBlog />,
        exact: true,
        restrict: true,
    },
    {
        path: '/personal-blog/preview/:id',
        component: <PersonalDetailBlog />,
        exact: false,
        restrict: true,
    },
    // {
    //     path: '/event',
    //     component: <UserEvent />,
    //     exact: false,
    //     restrict: true,
    // },
];

const RouterComponent = () => {
    const jwt = localStorageUtils.getJWTUser();
    // useAutoLogout(jwt);
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Navigate to="home" />} />
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
                <Route path="/auth" element={<Auth />} />
                <Route path="/403" element={<Error403Page />} />
                <Route path="*" element={<Error404Page />} />
            </Routes>
        </BrowserRouter>
    );
};

export default RouterComponent;
