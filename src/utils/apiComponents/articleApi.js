import localStorageUtils from '../localStorageUtils';

import { toastError } from '@/components/ToastNotification';
import { get, post, put, remove } from '@/utils/ApiCaller';

// todo delete token from config when deploy
// let token = localStorageUtils.getToken();
// Create a components api for your calling here
// Make an object with the method you want, passing params then create endpoint and return the method you call as the example below
// When call an api, make sure you have await/async for the result
const articleApi = {
    createArticle: async (article, token) => {
        const endpoint = '/article';
        return await post(endpoint, article, {}, { authorization: token })
            .then((res) => {
                if (res.data.code !== 200) toastError(res.data.message);
                return res;
            })
            .catch((err) => toastError(err.message));
    },
    updateArticle: async (article, token) => {
        const endpoint = '/article';
        return await put(endpoint, article, {}, { authorization: token })
            .then((res) => {
                if (res.data.code !== 200) toastError(res.data.message);
                return res;
            })
            .catch((err) => {
                toastError(err.message);
            });
    },
    getArticleById: async (id) => {
        const endpoint = `/article/${id}`;
        return await get(endpoint)
            .then((res) => {
                if (res.data.code !== 200) toastError(res.data.message);
                return res;
            })
            .catch((err) => toastError(err.message));
    },
    getActiveArticle: async (token) => {
        const endpoint = '/article/all';
        return await get(endpoint, {}, { authorization: token });
    },
    approveAllArticles: async (token) => {
        const endpoint = '/article/approve/all';
        return await put(endpoint, {}, {}, { authorization: token })
            .then((res) => {
                if (res.data.code !== 200) toastError(res.data.message);
                return res;
            })
            .catch((err) => toastError(err.message));
    },
    approveArticle: async (id, token) => {
        const endpoint = `/article/approve/${id}`;
        return await put(endpoint, {}, {}, { authorization: token });
    },
    disapproveArticle: async (id, token) => {
        const endpoint = `/article/disapprove/${id}`;
        return await put(endpoint, {}, {}, { authorization: token });
    },
    deleteArticle: async (id, token) => {
        const endpoint = `/article/${id}`;
        return await remove(endpoint, {}, {}, { authorization: token });
    },
    getInactiveArticle: async (token) => {
        const endpoint = '/article/inactive';
        return await get(endpoint, {}, { authorization: token });
    },
    getProcessingArticle: async (token) => {
        const endpoint = '/article/processing';
        return await get(endpoint, {}, { authorization: token });
    },
    getArticleByAuthor: async (token, userId) => {
        const endpoint = `/article/author/${userId}`;
        return await get(endpoint, {}, { authorization: token });
    },
};

export default articleApi;
