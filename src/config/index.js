const publicRuntimeConfig = {
    NODE_ENV: process.env.NODE_ENV || 'production',
    API_URL: process.env.REACT_APP_API_URL,
    LOCAL_STORAGE_TOKEN: process.env.REACT_APP_TOKEN_NAME,
    // create fake token here
    TOKEN: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJuZ2hpYW50c2UxNjExODBAZnB0LmVkdS52biIsImV4cCI6MTY3MDU1ODc0OCwiaWF0IjoxNjcwNTU2OTQ4fQ.XL-LYO7fHXQr1Hlmj3_0V0y5ZCTQkW6yJqdyAcNFvXuiLBRR8J3TaKZG4jt4AQq7okWeip6T8yZd6eHSwJ1Nhg',
};

export const { NODE_ENV, API_URL, LOCAL_STORAGE_TOKEN, TOKEN } = publicRuntimeConfig;
export default publicRuntimeConfig;
