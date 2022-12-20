import { get } from '../ApiCaller';
import localStorageUtils from '../localStorageUtils';

const token = localStorageUtils.getItem('token');
const memberApi = {
    // subject api
    getMemberByStudentId: async (id) => {
        const endpoint = `/member/studentId/${id}`;
        return await get(endpoint, {}, { authorization: token })
            .then((res) => {
                if (res.data.code !== 200) console.log(res.data.message);
                return res;
            })
            .catch((err) => console.log(err.message));
    },
};
export default memberApi;