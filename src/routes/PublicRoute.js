import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

import { selectUser } from './Auth/slice/selector';

const PublicRoute = () => {
    const User = useSelector(selectUser);

    return User ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default PublicRoute;
