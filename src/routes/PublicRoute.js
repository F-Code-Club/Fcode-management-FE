import { Outlet, Navigate } from 'react-router-dom';

import useAuth from '@/utils/useAuth';

const PublicRoute = () => {
    const { userRole, isLoading } = useAuth();
    console.log('run 0', userRole);
    if (userRole === undefined) {
        return <Navigate to="/auth" replace />;
    } else if (userRole === null) {
        return <Outlet />;
    }

    return userRole !== '' ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default PublicRoute;
