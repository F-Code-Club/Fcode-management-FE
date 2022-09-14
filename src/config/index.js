const publicRuntimeConfig = {
    NODE_ENV: process.env.NODE_ENV || 'production',
    API_URL: process.env.REACT_APP_API_URL,
};

export const { NODE_ENV, API_URL } = publicRuntimeConfig;
export default publicRuntimeConfig;
