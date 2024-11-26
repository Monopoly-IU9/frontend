import axios from 'axios';
import { BASE_URL } from './config';

// Создание нового ведущего
export const createHost = (login, password) => {
    return axios.post(`${BASE_URL}/admin/createHost`, { login, password });
};

// Получение списка всех ведущих
export const getHosts = () => {
    return axios.get(`${BASE_URL}/admin/getHosts`);
};

// Редактирование данных ведущего
export const editHost = (id, login, password) => {
    return axios.post(`${BASE_URL}/admin/editHost`, { id, login, password });
};

// Удаление ведущего по ID
export const deleteHost = (id) => {
    return axios.post(`${BASE_URL}/admin/deleteHostByID?host_id=${id}`);
};
