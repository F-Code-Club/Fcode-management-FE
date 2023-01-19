import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

import { selectUser } from './Auth/slice/selector';

import Loading from '@/components/antdLoading';
import authApi from '@/utils/apiComponents/authApi';
import localStorageUtils from '@/utils/localStorageUtils';
import useAuth from '@/utils/useAuth';

const PublicRoute = () => {
    const token = localStorageUtils.getToken();
    const { userRole, isLoading } = useAuth();
    console.log('run 1', userRole);
    if (userRole === undefined) {
        return <Navigate to="/auth" replace />;
    } else if (isLoading) {
        return <Loading />;
    }

    return userRole !== '' ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default PublicRoute;
