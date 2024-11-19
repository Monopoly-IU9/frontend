import axios from 'axios';
import { BASE_URL } from './config';

// Настраиваем интерсепторы для добавления токена
axios.interceptors.request.use((config) => {
    const adminToken = localStorage.getItem('adminToken');
    const hostToken = localStorage.getItem('hostToken');
    if (adminToken && config.url.includes('/admin')) {
        config.headers.Authorization = `Bearer ${adminToken}`;
        console.log("В роли администратора");
        console.log(config.url);
    } else if (hostToken && config.url.includes('/host')) {
        config.headers.Authorization = `Bearer ${hostToken}`;
        console.log("В роли ведущего");
        console.log(config.url);
    }
    return config;
});

export const loginAdmin = (login, password) =>
    axios.post(`${BASE_URL}/admin/login`, { login, password });

export const loginHost = (login, password) =>
    axios.post(`${BASE_URL}/host/login`, { login, password });

export const checkAdminAuth = () =>
    axios.post(`${BASE_URL}/admin/checkAuth`);

export const checkHostAuth = () =>
    axios.post(`${BASE_URL}/host/checkAuth`);
