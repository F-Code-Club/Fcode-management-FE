import { get } from '@/utils/ApiCaller';

// Create a components api for your calling here
// Make an object with the method you want, passing params then create endpoint and return the method you call as the example below
// When call an api, make sure you have await/async for the result
const accountApi = {
    get: async (token) => {
        const endpoint = '/resource/all ';
        return await get(
            endpoint,
            {},
            {
                Authorization: token,
            }
        ).catch((err) => console.log(err));
    },
};

export default accountApi;
