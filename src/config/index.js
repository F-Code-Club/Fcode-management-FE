const publicRuntimeConfig = {
    NODE_ENV: process.env.NODE_ENV || 'production',
    API_URL: process.env.REACT_APP_API_URL,
    LOCAL_STORAGE_TOKEN: process.env.REACT_APP_TOKEN_NAME,
};

export const { NODE_ENV, API_URL, LOCAL_STORAGE_TOKEN } = publicRuntimeConfig;
export default publicRuntimeConfig;
