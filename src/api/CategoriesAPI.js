import axios from 'axios';
import { BASE_URL } from './config';

// Получение списка всех категорий
export const getCategories = async () => {
    const response = await axios.get(`${BASE_URL}/admin/getCategories`);
    return response.data;
};

// Создание новой категории
export const createCategory = async (name, color) => {
    const response = await axios.post(`${BASE_URL}/admin/createCategory`, { name, color });
    return response.data;
};

// Удаление категории по ID
export const deleteCategory = async (categoryId) => {
    const response = await axios.post(`${BASE_URL}/admin/deleteCategory?category_id=${categoryId}`);
    return response.data;
};

// Получение данных категории по ID
export const getCategoryData = async (categoryId) => {
    const response = await axios.get(`${BASE_URL}/admin/getCategoryData?category_id=${categoryId}`);
    return response.data;
};

// Редактирование категории по ID
export const editCategory = async (categoryId, name, color) => {
    const response = await axios.post(`${BASE_URL}/admin/editCategory?category_id=${categoryId}`, { name, color });
    return response.data;
};

