import { Outlet, Navigate } from 'react-router-dom';

const PublicRoute = () => {
    const isAuth = false;
    if (process.env.NODE_ENV === 'development') {
        return <Outlet />;
    } else {
        return isAuth ? <Navigate to="/login" /> : <Outlet />;
    }
};

export default PublicRoute;
