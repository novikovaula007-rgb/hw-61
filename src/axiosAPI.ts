import axios from 'axios';
const BASE_URL = 'https://restcountries.com/v2/';

const axiosAPI = axios.create({
    baseURL: BASE_URL
})

export default axiosAPI;