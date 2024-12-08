import axios from 'axios';
import { BASE_URL } from './config';

export const loginAdmin = (login, password) =>
    axios.post(`${BASE_URL}/admin/login`, { login, password });

export const loginHost = (login, password) =>
    axios.post(`${BASE_URL}/host/login`, { login, password });

export const checkAdminAuth = () =>
    axios.post(`${BASE_URL}/admin/checkAuth`);

export const checkHostAuth = () =>
    axios.post(`${BASE_URL}/host/checkAuth`);

export const hostLogout = (token) =>
    axios.get(`${BASE_URL}/host/logout?token=${token}`);

