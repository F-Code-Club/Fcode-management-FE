const publicRuntimeConfig = {
    NODE_ENV: process.env.NODE_ENV || 'production',
    API_URL: process.env.REACT_APP_API_URL,
    LOCAL_STORAGE_TOKEN: process.env.REACT_APP_TOKEN_NAME,
    TOKEN: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJuZ2hpYW50c2UxNjExODBAZnB0LmVkdS52biIsImV4cCI6MTY3MDUyNTIzMSwiaWF0IjoxNjcwNTIzNDMxfQ.y2HFOE8wDq00GcG7yJhyWq6N33ioLos5jv7ayZaauigKSV0BKm7PX08um_UQPwfOfui6St8fSi2oj5lsEU78Ow', // create fake token here
};

export const { NODE_ENV, API_URL, LOCAL_STORAGE_TOKEN, TOKEN } = publicRuntimeConfig;
export default publicRuntimeConfig;
