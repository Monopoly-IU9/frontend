import axios from 'axios';

const BASE_URL = '/api';

export const loginAdmin = (username, password) =>
    axios.post(`${BASE_URL}/auth/admin-login`, { username, password });

export const loginHost = (username, password) =>
    axios.post(`${BASE_URL}/auth/host-login`, { username, password });
