const publicRuntimeConfig = {
    NODE_ENV: process.env.NODE_ENV || 'production',
    API_URL: process.env.REACT_APP_API_URL,
    LOCAL_STORAGE_TOKEN: process.env.REACT_APP_TOKEN_NAME,
    // create fake token here
    TOKEN: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJuZ2hpYW50c2UxNjExODBAZnB0LmVkdS52biIsImV4cCI6MTY3MDU2MTMwNiwiaWF0IjoxNjcwNTU5NTA2fQ.YFMyWBDomnkClc8qapItNM5WzUDHzBoQCjxUz_5YKR4yZDzIfwkRRnWXRUsdimm0DUiKkOKElv-RjhW9eL5GPQ',
};

export const { NODE_ENV, API_URL, LOCAL_STORAGE_TOKEN, TOKEN } = publicRuntimeConfig;
export default publicRuntimeConfig;
