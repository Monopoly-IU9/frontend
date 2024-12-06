import axios from 'axios';
import { BASE_URL } from './config';

// Получение списка наборов по ID категории
export const getSetsByCategoryID = async (categoryId) => {
    const response = await axios.post(`${BASE_URL}/getSetsByCategoryID`, { categoryId });
    return response.data;
};

// Получение информации о наборе по ID
export const getSetInfo = async (set_id) => {
    const response = await axios.post(`${BASE_URL}/admin/getSetInfo?set_id=${set_id}`);
    return response.data;
};

// Добавление нового набора
export const addSet = async (name, category_id, cards) => {
    const response = await axios.post(`${BASE_URL}/admin/addSetByCategoryID`, { name, category_id, cards });
    return response.data;
};

// Редактирование набора
export const editSet = async (set_id, name, cards) => {
    const response = await axios.post(`${BASE_URL}/admin/editSetByID?set_id=${set_id}`, { name, cards });
    return response.data;
};

// Удаление набора по ID
export const deleteSet = async (set_id) => {
    const response = await axios.post(`${BASE_URL}/admin/deleteSetByID?set_id=${set_id}`);
    return response.data;
};
