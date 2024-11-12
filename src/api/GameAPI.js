import axios from 'axios';
import {BASE_URL} from "./config";

// Получение списка игр для ведущего
export const fetchGamesForHost = async (hostId) => {
    const response = await axios.get(`${BASE_URL}/games/host/${hostId}`);
    return response.data;
};

// Получение информации об одной игре
export const fetchGameInfo = async (gameId) => {
    const response = await axios.get(`${BASE_URL}/games/${gameId}`);
    return response.data;
};

// Завершение игры
export const endGame = async (gameId) => {
    const response = await axios.post(`${BASE_URL}/games/${gameId}/end`);
    return response.data;
};

// Получение детальной информации для настройки игры
export const fetchGameDetails = async (gameId) => {
    const response = await axios.get(`${BASE_URL}/games/${gameId}/details`);
    return response.data;
};

// Активация игры
export const activateGame = async (gameId) => {
    const response = await axios.post(`${BASE_URL}/games/${gameId}/activate`);
    return response.data;
};
