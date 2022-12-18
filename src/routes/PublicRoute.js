import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

import { selectUser } from './Auth/slice/selector';

import localStorageUtils from '@/utils/localStorageUtils';

const PublicRoute = () => {
    const User = useSelector(selectUser);
    const token = localStorageUtils.getToken();

    return User.role !== '' || token ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default PublicRoute;
