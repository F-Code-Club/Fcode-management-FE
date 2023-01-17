import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

import { selectUser } from './Auth/slice/selector';

import useAuth from '@/utils/useAuth';

const MemberRoute = () => {
    const User = useSelector(selectUser);
    const auth = useAuth();
    if (auth === null) {
        return <span> loading</span>;
    }

    return auth == 'MEMBER' || auth === 'MANAGER' || auth === 'ADMIN' ? (
        <Outlet />
    ) : (
        <Navigate to="/403" replace />
    );
};
//|| auth === 'MANAGER' || auth === 'ADMIN'
export default MemberRoute;
