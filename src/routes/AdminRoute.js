import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

import { selectUser } from './Auth/slice/selector';

import useAuth from '@/utils/useAuth';

const AdminRoute = () => {
    const auth = useAuth();
    if (auth === undefined) {
        return <Navigate to="/auth" replace />;
    } else if (auth === null) {
        return <span> loading admin</span>;
    }

    return auth === 'ADMIN' ? <Outlet /> : <Navigate to="/403" replace />;
};

export default AdminRoute;
