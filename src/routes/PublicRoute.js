import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

import { selectUser } from './Auth/slice/selector';

import authApi from '@/utils/apiComponents/authApi';
import localStorageUtils from '@/utils/localStorageUtils';
import useAuth from '@/utils/useAuth';

const PublicRoute = () => {
    const token = localStorageUtils.getToken();
    const auth = useAuth();
    if (auth === null) {
        return <span> loading</span>;
    }

    return auth !== '' || token ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default PublicRoute;
