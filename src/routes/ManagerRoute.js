import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { selectUser } from './Auth/slice/selector';

import Loading from '@/components/antdLoading';
import useAuth from '@/utils/useAuth';

const ManagerRoute = () => {
    const User = useSelector(selectUser);
    const { userRole, isLoading } = useAuth();
    console.log('run 2', userRole);
    if (userRole === undefined) {
        return <Navigate to="/auth" replace />;
    } else if (userRole === null) {
        return <Outlet />;
    }
    return userRole === 'MANAGER' || userRole === 'ADMIN' || userRole === null ? (
        <Outlet />
    ) : (
        <Navigate to="/403" replace />
    );
};

export default ManagerRoute;
