import axios from 'axios';

const api = process.env.NEXT_PUBLIC_API || 'https://nextshopapi.chill-hub.ir';
axios.defaults.baseURL = api;
export default axios;
