import axios from 'axios';
import {BASE_URL} from "./config";

// Получение списка игры для админа
export const adminGetGames = async () => {
    const response = await axios.get(`${BASE_URL}/admin/getGames`);
    return response.data;
};

export const createGame = async (name, sets, categories, hashtags) => {
    const response = await axios.post(`${BASE_URL}/admin/new-game`, { name, sets, categories, hashtags });
    return response.data;
}

// Получение информации об игре для админа
export const getGameInfo = async (id) => {
    const response = await axios.get(`${BASE_URL}/admin/getgameInfo/${id}`);
    return response.data;
};

// Изменение игры админом
export const editGame = async (id, name, sets, categories, hashtags) => {
    const response = await axios.post(`${BASE_URL}/admin/editGame/${id}`, {name, sets, categories, hashtags});
    return response.data;
};

// Удаление игры админом
export const deleteGame = async (id) => {
    const response = await axios.post(`${BASE_URL}/admin/deleteGameByID?game_id=${id}`);
    return response.data;
}

// Получение списка игры для ведущего
export const hostGetGames = async () => {
    const response = await axios.get(`${BASE_URL}/host/getGames`);
    return response.data;
};

// Получение категорий в игре для ведущего
export const hostGetCategoriesByGameID = async (id) => {
    const response = await axios.post(`${BASE_URL}/host/getCategoriesByGameID?game_id=${id}`);
    return response.data;
}

// Старт игры ведущим
export const startGame = async (game_id) => {
    const response = await axios.post(`${BASE_URL}/host/start-game/${game_id}`);
    return response.data;
}

// Завершение игры ведущим
export const finishGame = async (game_id) => {
    const response = await axios.post(`${BASE_URL}/host/finish-game/${game_id}`);
    return response.data;
}

// Взятие карточки в игре
export const drawCard = async (game_id, category_id) => {
    const response = await axios.post(`${BASE_URL}/game/draw-card/${game_id}?category_id=${category_id}`);
    return response.data;
}