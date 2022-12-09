import { TOKEN } from '@/config';
import { get } from '@/utils/ApiCaller';

const commentApi = {
    getComments: async () => {
        const endpoint = '/comment/';
        return await get(endpoint, {}, { authorization: TOKEN });
    },
};

export default commentApi;
