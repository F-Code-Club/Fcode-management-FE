// import { useEffect, useCallback } from 'react';

// import { redirect, Navigate } from 'react-router-dom';

// import localStorageUtils from './localStorageUtils';

// export function useAutoLogout(jwt) {
//     const token = localStorage.getItem('token');
//     const checkTokenExpiration = useCallback(() => {
//         if (token) {
//             const decoded = localStorageUtils.getJWTUser();
//             if (decoded.exp < Date.now() / 1000) {
//                 localStorage.removeItem('token');
//                 console.log('Token expired');
//                 window.location.push('/auth');
//                 // return redirect('/auth');
//             }
//         }
//     }, [token]);

//     useEffect(() => {
//         const intervalId = setInterval(checkTokenExpiration, 5000);
//         return () => clearInterval(intervalId);
//     }, [checkTokenExpiration]);
// }
