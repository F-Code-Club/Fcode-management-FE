import localStorageUtils from '../localStorageUtils';

import { get, post, put, remove } from '@/utils/ApiCaller';

// todo delete token from config when deploy
let token = localStorageUtils.getToken();
// Create a components api for your calling here
// Make an object with the method you want, passing params then create endpoint and return the method you call as the example below
// When call an api, make sure you have await/async for the result
const articleApi = {
    createArticle: async (article) => {
        const endpoint = '/article';
        return await post(endpoint, article, {}, { authorization: token }).catch((err) =>
            console.log(err)
        );
    },
    updateArticle: async (article) => {
        const endpoint = '/article';
        return await put(endpoint, article).catch((err) => console.log(err));
    },
    getArticleById: async (id) => {
        const endpoint = `/article/${id}`;
        return await get(endpoint).catch((err) => console.log(err));
    },
    getActiveArticle: async () => {
        const endpoint = '/article/all';
        return await get(endpoint, {}, { authorization: token }).catch((err) => console.log(err));
    },
    approveAllArticles: async () => {
        const endpoint = '/article/approve/all';
        return await put(endpoint, {}, {}, { authorization: token }).catch((err) =>
            console.log(err)
        );
    },
    approveArticle: async (id) => {
        const endpoint = `/article/approve/${id}`;
        return await put(endpoint, {}, {}, { authorization: token }).catch((err) =>
            console.log(err)
        );
    },
    disapproveArticle: async (id) => {
        const endpoint = `/article/disapprove/${id}`;
        return await put(endpoint, {}, {}, { authorization: token }).catch((err) => {
            throw new Error(err);
        });
    },
    deleteArticle: async (id) => {
        const endpoint = `/article/${id}`;
        return await remove(endpoint, {}, {}, { authorization: token }).catch((err) =>
            console.log(err)
        );
    },
    getInactiveArticle: async () => {
        const endpoint = '/article/inactive';
        return await get(endpoint, {}, { authorization: token }).catch((err) => console.log(err));
    },
    getProcessingArticle: async () => {
        const endpoint = '/article/processing';
        return await get(endpoint, {}, { authorization: token }).catch((err) => console.log(err));
    },
};

export default articleApi;
