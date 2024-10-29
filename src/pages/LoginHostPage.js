import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginHostPage({ setIsHostAuthenticated }) {
    const [gameId, setGameId] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Ваша логика аутентификации ведущего (например, проверка введенных данных)
        setIsHostAuthenticated(true); // Устанавливаем статус аутентификации
        navigate(`/host/settings?id=${gameId}`); // Переход на страницу настройки игры
    };

    return (
        <div>
            <h2>Host Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Game ID"
                    value={gameId}
                    onChange={(e) => setGameId(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginHostPage;
