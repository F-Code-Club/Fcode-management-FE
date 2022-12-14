import { get } from '../ApiCaller';
import localStorageUtils from '../localStorageUtils';

const token = localStorageUtils.getItem('token');
const authApi = {
    // subject api
    getLoginMember: async () => {
        const endpoint = '/login/member';
        return await get(endpoint, {}, {})
            .then((res) => {
                if (res.data.code !== 200) console.log(res.data.message);
                return res;
            })
            .catch((err) => console.log(err.message));
    },
    //need role manager or admin to call
    getAllMembers: async () => {
        console.log(token);
        const endpoint = '/member/all';
        return await get(endpoint, {}, { authorization: token })
            .then((res) => {
                if (res.data.code !== 200) console.log(res.data.message);
                return res;
            })
            .catch((err) => console.log(err.message));
    },
};
export default authApi;
