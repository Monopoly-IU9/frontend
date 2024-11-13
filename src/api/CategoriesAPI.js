import axios from 'axios';
import { BASE_URL } from './config';

// Получение списка всех категорий
export const getCategories = async () => {
    const response = await axios.get(`${BASE_URL}/getCategories`);
    return response.data;
};

// Создание новой категории
export const createCategory = async (name, color) => {
    const response = await axios.post(`${BASE_URL}/createCategory`, { name, color });
    return response.data;
};

// Удаление категории по ID
export const deleteCategory = async (categoryId) => {
    const response = await axios.post(`${BASE_URL}/deleteCategory`, { categoryId });
    return response.data;
};