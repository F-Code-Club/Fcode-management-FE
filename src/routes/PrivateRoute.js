import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
    const isAuth = false;
    if (process.env.NODE_ENV === 'development') {
        return <Outlet />;
    } else {
        return isAuth ? <Outlet /> : <Navigate to="/login" />;
    }
};

export default PrivateRoute;
