import { useState, useEffect, useCallback } from 'react';

import { useDispatch } from 'react-redux';
import { redirect } from 'react-router-dom';

import authApi from './apiComponents/authApi';
import localStorageUtils from './localStorageUtils';

import { setUser } from '@/routes/Auth/slice';

const useAuth = () => {
    const [userRole, setUserRole] = useState(null);
    const dispatch = useDispatch();
    const token = localStorageUtils.getToken();
    const checkTokenExpiration = useCallback(() => {
        if (token) {
            const decoded = localStorageUtils.getJWTUser();
            if (decoded.exp < Date.now() / 1000) {
                console.log('run 2');
                localStorage.removeItem('token');
                alert('Token expired');
                setUserRole(undefined);
            }
        }
    }, [token]);
    useEffect(() => {
        const intervalId = setInterval(checkTokenExpiration, 5000);
        return () => clearInterval(intervalId);
    }, [checkTokenExpiration]);
    useEffect(() => {
        // Get the JWT token from the cookie
        const token = localStorageUtils.getToken();

        // If there is no token, return
        if (!token) {
            setUserRole(undefined);
            return;
        }
        try {
            authApi.getUser(token).then((user) => {
                console.log(user);
                const { data } = user.data;
                const formatUser = {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    role: data.role,
                    id: data.id,
                };
                if (!user.data?.data?.role) {
                    setUserRole(undefined);
                } else {
                    setUserRole(user.data?.data?.role);
                    dispatch(setUser(formatUser));
                }
            });
        } catch (err) {
            // If the token is invalid, return

            return;
        }
    }, [token]);

    return userRole;
};
export default useAuth;
