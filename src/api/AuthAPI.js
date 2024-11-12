import axios from 'axios';
import {BASE_URL} from "./config";

export const loginAdmin = (username, password) =>
    axios.post(`${BASE_URL}/auth/admin-login`, { username, password });

export const loginHost = (username, password) =>
    axios.post(`${BASE_URL}/auth/host-login`, { username, password });
