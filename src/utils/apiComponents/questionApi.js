import { get } from './../ApiCaller';

import { TOKEN } from '@/config';

const questionApi = {
    getAll: async () => {
        const endpoint = '/question/questions';
        return await get(endpoint, {}, { authorization: TOKEN });
    },
};

export default questionApi;
