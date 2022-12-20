import { get } from '../ApiCaller';
import localStorageUtils from '../localStorageUtils';

import { toastError } from '@/components/ToastNotification';

const token = localStorageUtils.getItem('token');
const authApi = {
    // subject api
    getLoginMember: async () => {
        const endpoint = '/login/member';
        return await get(endpoint, {}, {})
            .then((res) => {
                if (res.data.code !== 200) toastError(res.data.message);
                return res;
            })
            .catch((err) => toastError(err.message));
    },
    //need role manager or admin to call
    getAllMembers: async () => {
        const endpoint = '/member/all';
        return await get(endpoint, {}, { authorization: token })
            .then((res) => {
                if (res.data.code !== 200) toastError(res.data.message);
                return res;
            })
            .catch((err) => toastError(err.message));
    },
    getUser: async (token) => {
        const endpoint = '/member/own';
        return await get(endpoint, {}, { authorization: token })
            .then((res) => {
                if (res.data.code !== 200) toastError(res.data.message);
                return res;
            })
            .catch((err) => toastError(err.message));
    },
};
export default authApi;
