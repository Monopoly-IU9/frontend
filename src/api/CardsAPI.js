import axios from 'axios';
import { BASE_URL } from './config';

// Получение списка карточек по ID категории
export const getCardsByCategoryID = async (categoryId) => {
    const response = await axios.post(`${BASE_URL}/getCardsByCategoryID`, { categoryId });
    return response.data;
};

// Добавление карточки в категорию
export const addCardToCategoryID = async (categoryId, description, tags) => {
    const response = await axios.post(`${BASE_URL}/addCardToCategoryID`, { categoryId, description, tags });
    return response.data;
};

// Удаление карточки по ID
export const deleteCard = async (cardId) => {
    const response = await axios.post(`${BASE_URL}/deleteCard`, { cardId });
    return response.data;
};
