import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { selectUser } from './Auth/slice/selector';

import useAuth from '@/utils/useAuth';

const ManagerRoute = () => {
    const User = useSelector(selectUser);
    const auth = useAuth();
    if (auth === undefined) {
        return <Navigate to="/auth" replace />;
    } else if (auth === null) {
        return <span> loading manager</span>;
    }
    return auth === 'MANAGER' || auth === 'ADMIN' ? <Outlet /> : <Navigate to="/403" replace />;
};

export default ManagerRoute;
