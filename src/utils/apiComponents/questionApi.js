import { get, put } from './../ApiCaller';

import { TOKEN } from '@/config';

const questionApi = {
    getAllProcessing: async () => {
        const endpoint = '/question/processing';
        return await get(endpoint, {}, { authorization: TOKEN });
    },
    getAllActive: async () => {
        const endpoint = '/question/processing';
        return await get(endpoint, {}, { authorization: TOKEN });
    },
    getAllInactive: async () => {
        const endpoint = '/question/processing';
        return await get(endpoint, {}, { authorization: TOKEN });
    },
    report: async (id) => {
        const endpoint = `/question/disapprove/${id}`;
        return await put(endpoint, {}, {}, { authorization: TOKEN });
    },
    approve: async (id) => {
        const endpoint = `/question/approve/${id}`;
        return await put(endpoint, {}, {}, { authorization: TOKEN });
    },
};

export default questionApi;