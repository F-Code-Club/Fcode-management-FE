import { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import authApi from './apiComponents/authApi';
import localStorageUtils from './localStorageUtils';

import { setUser } from '@/routes/Auth/slice';

const useAuth = () => {
    const [userRole, setUserRole] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        // Get the JWT token from the cookie
        const token = localStorageUtils.getToken();

        // If there is no token, return
        if (!token) {
            return;
        }

        try {
            console.log('run');
            authApi.getUser(token).then((user) => {
                const { data } = user.data;
                const formatUser = {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    role: data.role,
                    id: data.id,
                };
                setUserRole(user.data.data.role);
                dispatch(setUser(formatUser));
            });
        } catch (err) {
            // If the token is invalid, return
            return;
        }
    }, []);
    return userRole;
};
export default useAuth;
