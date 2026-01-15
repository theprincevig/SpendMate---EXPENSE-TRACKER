import axios from 'axios';
import { BASE_URL } from '../utils/apiPaths';

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    withCredentials: true,
    headers: { "Content-Type": "application/json", }
});