import axios from 'axios';
import {BASE_URL} from "./config";

// Получение списка игры для админа
export const adminGetGames = async () => {
    const response = await axios.get(`${BASE_URL}/admin/getGames`);
    return response.data;
};

// Получение информации об игре для админа
export const getGameInfo = async (id) => {
    const response = await axios.get(`${BASE_URL}/admin/getgameInfo/${id}`);
    return response.data;
};

// Изменение игры админом
export const editGame = async (id, name, sets, categories) => {
    const response = await axios.post(`${BASE_URL}/admin/editGame/${id}`, {name, sets, categories});
    return response.data;
};