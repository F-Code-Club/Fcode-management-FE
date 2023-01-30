import { useState, useEffect, useCallback } from 'react';

import { useDispatch } from 'react-redux';
import { redirect } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';

import authApi from './apiComponents/authApi';
import localStorageUtils from './localStorageUtils';

import { toastError } from '@/components/ToastNotification';
import { API_URL } from '@/config';
import { setUser } from '@/routes/Auth/slice';

const useAuth = () => {
    let stompClient = null;
    const [userRole, setUserRole] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const token = localStorageUtils.getToken();
    const checkTokenExpiration = useCallback(() => {
        if (token) {
            const decoded = localStorageUtils.getJWTUser();
            if (decoded.exp < Date.now() / 1000) {
                localStorage.removeItem('token');
                setUserRole(undefined);
                console.log('run useAuth');
                toastError('Phiên đăng nhập đã hết hạn! Vui lòng đăng nhập lại');
            }
        }
    }, [token]);

    const onError = (err) => {
        console.log('error: ', err);
    };
    function connect(token) {
        var socket = new SockJS(`${API_URL}/websocket`);
        stompClient = over(socket);

        stompClient.connect({ token: token }, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe(`/topic/messages`, function (message) {
                console.log(JSON.parse(message.body));
            });
            stompClient.subscribe(`/user/queue/private-messages`, function (message) {
                console.log(JSON.parse(message.body));
            });
        });
    }
    useEffect(() => {
        // Get the JWT token from the cookie
        const token = localStorageUtils.getToken();

        // If there is no token, return
        if (!token) {
            setUserRole(undefined);
            return;
        }

        try {
            setIsLoading(true);
            authApi.getUser(token).then((user) => {
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
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 1000);
                }
            });
            // connectGlobal();
            // connect(token);
        } catch (err) {
            // If the token is invalid, return

            return;
        }
        const intervalId = setInterval(checkTokenExpiration, 5000);
        return () => clearInterval(intervalId);
    }, [token, checkTokenExpiration]);

    return { isLoading, userRole };
};
export default useAuth;
