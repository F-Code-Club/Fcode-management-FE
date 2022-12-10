const publicRuntimeConfig = {
    NODE_ENV: process.env.NODE_ENV || 'production',
    API_URL: process.env.REACT_APP_API_URL,
    LOCAL_STORAGE_TOKEN: process.env.REACT_APP_TOKEN_NAME,
    // create fake token here
    TOKEN: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJuZ2hpYW50c2UxNjExODBAZnB0LmVkdS52biIsImV4cCI6MTY3MDY4Mzc0NywiaWF0IjoxNjcwNjgxOTQ3fQ.48tDXBB5KtzNnvDT5-Fgba8Z4Gi7MbAvkIsjm7IZrwm5AtbZDdyYAUzI2dCRuupXevh6D3DMVUcxYOYQL9pycA',
};

export const { NODE_ENV, API_URL, LOCAL_STORAGE_TOKEN, TOKEN } = publicRuntimeConfig;
export default publicRuntimeConfig;
