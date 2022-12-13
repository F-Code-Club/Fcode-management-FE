import { get } from './ApiCaller';

const productApi = {
    getAllAccount: (token) => {
        const url = '/member/all';
        return get(url, {}, { authorization: token });
    },
};

export default productApi;
