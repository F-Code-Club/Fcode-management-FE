import { get, post } from '@/utils/ApiCaller';
import localStorageUtils from '@/utils/localStorageUtils';

const commentApi = {
    getLatest: async () => {
        const endpoint = `/comment/latest`;
        const token = localStorageUtils.getToken();
        return await get(endpoint, {}, { authorization: token });
    },
    create: async (commentData) => {
        const endpoint = '/comment';
        const token = localStorageUtils.getToken();
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

export default commentApi;
