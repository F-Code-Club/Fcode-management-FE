import { get, post } from '@/utils/ApiCaller';
import localStorageUtils from '@/utils/localStorageUtils';

const attendApi = {
    getAttendByEventId: async (eventId) => {
        const endpoint = `/attendance/eventId/${eventId}`;
        const token = localStorageUtils.getToken();

        return await get(endpoint, {}, { authorization: token })
            .then((res) => {
                return res.data.data;
            })
            .catch((err) => console.log(err));
    },
    create: async (commentData) => {
        const token = localStorageUtils.getToken();
        const endpoint = '/comment';
        return await post(
            endpoint,
            {
                ...commentData,
            },
            {},
            { authorization: token }
        );
    },
};

export default attendApi;
