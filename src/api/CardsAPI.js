import axios from 'axios';
import { BASE_URL } from './config';

// Получение списка карточек по ID категории
export const getCardsByCategoryID = async (categoryId) => {
    const response = await axios.post(`${BASE_URL}/getCardsByCategoryID`, { categoryId });
    return response.data;
};

// Добавление карточки в категорию
export const addCard = async (category_id, description, hashtags) => {
    const response = await axios.post(`${BASE_URL}/admin/addCardByCategoryID`, { category_id, description, hashtags });
    return response.data;
};

// Добавление карточки в категорию
export const editCard = async (id, description, hashtags) => {
    const response = await axios.post(`${BASE_URL}/admin/editCardByID`, { id, description, hashtags });
    return response.data;
};

// Удаление карточки по ID
export const deleteCard = async (card_id) => {
    const response = await axios.post(`${BASE_URL}/admin/deleteCard?card_id=${ card_id }`);
    return response.data;
};
