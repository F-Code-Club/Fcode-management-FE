// Create a components api for your calling here
// Make an object with the method you want, passing params then create endpoint and return the method you call as the example below
// When call an api, make sure you have await/async for the result
const testApi = {
    get: async (params) => {
        // eslint-disable-next-line no-console
        console.log(params);
    },
};

export default testApi;
