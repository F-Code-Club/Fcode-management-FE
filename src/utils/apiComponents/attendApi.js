import { get, post } from '@/utils/ApiCaller';
import localStorageUtils from '@/utils/localStorageUtils';

const token = localStorageUtils.getToken();

const attendApi = {
    getAttendByEventId: async (eventId) => {
        const endpoint = `/attendance/eventId/${eventId}`;

        return await get(endpoint, {}, { authorization: token }).then((res) => res.data.data);
    },
    create: async (commentData) => {
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
