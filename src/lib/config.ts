export const isDev = import.meta.env.DEV;
export const API_BASE_URL = isDev
    ? 'http://localhost:4000/api'
    : 'https://api.clueless.zagoli.com/api';
