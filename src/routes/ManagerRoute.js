import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { selectUser } from './Auth/slice/selector';

const ManagerRoute = async () => {
    const User = useSelector(selectUser);

    return User === 'MANAGER' ? <Outlet /> : <Navigate to="/" replace />;
};

export default ManagerRoute;
