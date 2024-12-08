import axios from "axios";

export let BASE_URL = 'http://127.0.0.1:8000';

// Настраиваем интерсепторы для добавления токена
axios.interceptors.request.use((config) => {
    const adminToken = localStorage.getItem('adminToken');
    const hostToken = localStorage.getItem('hostToken');
    if (adminToken && config.url.includes('/admin/')) {
        config.headers.Authorization = `Bearer ${adminToken}`;
        console.log("В роли администратора");
        console.log(config.url);
    } else if (hostToken && config.url.includes('/host/')) {
        config.headers.Authorization = `Bearer ${hostToken}`;
        console.log("В роли ведущего");
        console.log(config.url);
    }
    return config;
});