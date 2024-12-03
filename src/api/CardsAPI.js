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

// Удаление карточки по ID
export const deleteCard = async (cardId) => {
    const response = await axios.post(`${BASE_URL}/deleteCard`, { cardId });
    return response.data;
};
