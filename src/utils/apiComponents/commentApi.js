import { TOKEN } from '@/config';
import { get, post } from '@/utils/ApiCaller';

const commentApi = {
    getLatest: async (questionId) => {
        const endpoint = `/comment/question/latest/${questionId}`;
        return await get(endpoint, {}, { authorization: TOKEN });
    },
    create: async (commentData) => {
        const endpoint = '/comment';
        return await post(
            endpoint,
            {
                ...commentData,
            },
            {},
            { authorization: TOKEN }
        );
    },
};

export default commentApi;
