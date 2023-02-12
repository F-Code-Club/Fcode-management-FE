import localStorageUtils from '../localStorageUtils';
import { get, put } from './../ApiCaller';

const questionApi = {
    getAllProcessing: async () => {
        const endpoint = '/question/processing';
        const token = localStorageUtils.getToken();
        return await get(endpoint, {}, { authorization: token });
    },
    getAllActive: async () => {
        const endpoint = '/question/processing';
        const token = localStorageUtils.getToken();
        return await get(endpoint, {}, { authorization: token });
    },
    getAllInactive: async () => {
        const endpoint = '/question/processing';
        const token = localStorageUtils.getToken();
        return await get(endpoint, {}, { authorization: token });
    },
    report: async (id) => {
        const endpoint = `/question/disapprove/${id}`;
        const token = localStorageUtils.getToken();
        return await put(endpoint, {}, {}, { authorization: token });
    },
    approve: async (id) => {
        const endpoint = `/question/approve/${id}`;
        const token = localStorageUtils.getToken();
        return await put(endpoint, {}, {}, { authorization: token });
    },
};

export default questionApi;
