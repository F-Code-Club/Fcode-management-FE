import localStorageUtils from '../localStorageUtils';

import { toastError } from '@/components/ToastNotification';
import { get, post, put, remove } from '@/utils/ApiCaller';

let token = localStorageUtils.getToken();
// Create a components api for your calling here
// Make an object with the method you want, passing params then create endpoint and return the method you call as the example below
// When call an api, make sure you have await/async for the result
const articleApi = {
    createArticle: async (article) => {
        const endpoint = '/article';
        return await post(endpoint, article, {}, { authorization: token })
            .then((res) => {
                if (res.data.code !== 200) toastError(res.data.message);
                return res;
            })
            .catch((err) => toastError(err.message));
    },
    updateArticle: async (article) => {
        const endpoint = '/article';
        return await put(endpoint, article, {}, { authorization: token })
            .then((res) => {
                if (res.data.code !== 200) toastError(res.data.message);
                return res;
            })
            .catch((err) => {
                toastError(err.message);
                console.error(err);
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
    getActiveArticle: async () => {
        const endpoint = '/article/all';
        return await get(endpoint, {}, { authorization: token })
            .then((res) => {
                if (res.data.code !== 200) toastError(res.data.message);
                return res;
            })
            .catch((err) => toastError(err.message));
    },
    approveAllArticles: async () => {
        const endpoint = '/article/approve/all';
        return await put(endpoint, {}, {}, { authorization: token })
            .then((res) => {
                if (res.data.code !== 200) toastError(res.data.message);
                return res;
            })
            .catch((err) => toastError(err.message));
    },
    approveArticle: async (id) => {
        const endpoint = `/article/approve/${id}`;
        return await put(endpoint, {}, {}, { authorization: token })
            .then((res) => {
                if (res.data.code !== 200) toastError(res.data.message);
                return res;
            })
            .catch((err) => toastError(err.message));
    },
    deleteArticle: async (id) => {
        const endpoint = `/article/${id}`;
        return await remove(endpoint, {}, {}, { authorization: token })
            .then((res) => {
                if (res.data.code !== 200) toastError(res.data.message);
                console.log(res);
                return res;
            })
            .catch((err) => toastError(err.message));
    },
    getInactiveArticle: async () => {
        const endpoint = '/article/inactive';
        return await get(endpoint, {}, { authorization: token })
            .then((res) => {
                if (res.data.code !== 200) toastError(res.data.message);
                return res;
            })
            .catch((err) => toastError(err.message));
    },
    getProcessingArticle: async () => {
        const endpoint = '/article/processing';
        return await get(endpoint, {}, { authorization: token })
            .then((res) => {
                if (res.data.code !== 200) toastError(res.data.message);
                return res;
            })
            .catch((err) => toastError(err.message));
    },
    getArticleByAuthor: async () => {
        const endpoint = '/article/author';
        return await get(endpoint, {}, { authorization: token })
            .then((res) => {
                if (res.data.code !== 200) toastError(res.data.message);
                return res;
            })
            .catch((err) => toastError(err.message));
    },
};

export default articleApi;