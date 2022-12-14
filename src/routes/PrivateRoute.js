import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

import { selectUser } from './Auth/slice/selector';

const PrivateRoute = () => {
    const User = useSelector(selectUser);

    return User.role === 'MEMBER' ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
