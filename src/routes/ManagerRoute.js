import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { selectUser } from './Auth/slice/selector';

import Loading from '@/components/antdLoading';
import useAuth from '@/utils/useAuth';

const ManagerRoute = () => {
    const User = useSelector(selectUser);
    const { userRole, isLoading } = useAuth();
    console.log('run 1', userRole);
    if (userRole === undefined) {
        return <Navigate to="/auth" replace />;
    } else if (isLoading) {
        return <Loading />;
    }
    return userRole === 'MANAGER' || userRole === 'ADMIN' ? (
        <Outlet />
    ) : (
        <Navigate to="/403" replace />
    );
};

export default ManagerRoute;
