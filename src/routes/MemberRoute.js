import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

import { selectUser } from './Auth/slice/selector';

const MemberRoute = () => {
    const User = useSelector(selectUser);

    return User.role === 'MEMBER' || User.role === 'MANAGER' || User.role === 'ADMIN' ? (
        <Outlet />
    ) : (
        <Navigate to="/" replace />
    );
};

export default MemberRoute;
