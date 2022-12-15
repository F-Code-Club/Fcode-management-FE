import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { selectUser } from './Auth/slice/selector';

const ManagerRoute = () => {
    const User = useSelector(selectUser);

    return User.role === 'MANAGER' || User.role === 'ADMIN' ? (
        <Outlet />
    ) : (
        <Navigate to="/auth" replace />
    );
};

export default ManagerRoute;
