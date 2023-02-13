import { get } from '../ApiCaller';
import localStorageUtils from '../localStorageUtils';

const memberApi = {
    // subject api
    getMemberByStudentId: async (id) => {
        const token = localStorageUtils.getItem('token');
        const endpoint = `/member/studentId/${id}`;
        return await get(endpoint, {}, { authorization: token })
            .then((res) => {
                if (res.data.code !== 200) console.log(res.data.message);
                return res;
            })
            .catch((err) => console.log(err.message));
    },
    getMemberByMemberId: async (id) => {
        const token = localStorageUtils.getItem('token');
        const endpoint = `/member/memberId/${id}`;
        return await get(endpoint, {}, { authorization: token })
            .then((res) => {
                if (res.data.code !== 200) console.log(res.data.message);
                return res;
            })
            .catch((err) => console.log(err.message));
    },
};
export default memberApi;
