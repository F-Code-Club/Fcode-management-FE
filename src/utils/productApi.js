import { get } from './ApiCaller';

const productApi = {
    getAllAccount: (token) => {
        const url = '/member/all';
        return get(url, {}, { authorization: token });
    },
    getAccountById: (id, token) => {
        const url = `/member/memberId/${id}`;
        return get(url, {}, { authorization: token });
    },
};

export default productApi;
