import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

import { selectUser } from './Auth/slice/selector';

import Loading from '@/components/antdLoading';
import useAuth from '@/utils/useAuth';

const MemberRoute = () => {
    const User = useSelector(selectUser);
    const { userRole, isLoading } = useAuth();

    if (userRole === undefined) {
        return <Navigate to="/auth" replace />;
    } else if (userRole === null) {
        return <Outlet />;
    }
    return userRole === 'MEMBER' || userRole === 'MANAGER' || userRole === 'ADMIN' ? (
        <Outlet />
    ) : (
        <Navigate to="/403" replace />
    );
};
//|| auth === 'MANAGER' || auth === 'ADMIN'
export default MemberRoute;
