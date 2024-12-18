import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import {createGame} from "../api/GameAPI";

function NewGameTemplate() {
    const [gameName, setGameName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // логика создания шаблона игры
    const handleCreateGame = async (e) => {
        e.preventDefault();
        setError(''); // Очистка ошибок перед началом запроса

        if (!gameName.trim()) {
            setError('Имя игры не может быть пустым.');
            return;
        }

        try {
            await createGame(gameName, [], [], []); // Удаляем символ "#" из цвета перед отправкой
            navigate('/admin'); // Переход обратно к списку категорий после успешного создания
        } catch (err) {
            console.error('Ошибка при создании игры:', err);
            setError('Не удалось создать игру. Попробуйте позже.');
        }

    };

    return (
        <div className="container bg-light rounded p-4 shadow-sm">
            <Link to="/admin" className="text-decoration-none d-flex align-items-center mb-3"
                  style={{color: '#0d6efd'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-arrow-left me-1" viewBox="0 0 16 16">
                    <path fillRule="evenodd"
                          d="M15 8a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708.708L2.707 7.5H14.5A.5.5 0 0 1 15 8z"/>
                </svg>
                Главная
            </Link>
            <h2>Новая игра</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
                <label className="form-label">Имя игры</label>
                <input type="text"
                       className="form-control"
                       value={gameName}
                       onChange={(e) => setGameName(e.target.value)}
                       placeholder="Введите имя игры"
                />
            </div>
            <Button onClick={handleCreateGame} className="btn btn-primary w-100">Создать игру</Button>
        </div>
    );
}

export default NewGameTemplate;
