import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

import { selectUser } from './Auth/slice/selector';

const AdminRoute = () => {
    const User = useSelector(selectUser);

    return User.role === 'ADMIN' ? <Outlet /> : <Navigate to="/403" replace />;
};

export default AdminRoute;
