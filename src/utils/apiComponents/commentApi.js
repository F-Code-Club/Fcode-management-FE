import { get, post } from '@/utils/ApiCaller';
import localStorageUtils from '@/utils/localStorageUtils';

const token = localStorageUtils.getToken();

const commentApi = {
    getLatest: async () => {
        const endpoint = `/comment/latest`;
        return await get(endpoint, {}, { authorization: token });
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

export default commentApi;
