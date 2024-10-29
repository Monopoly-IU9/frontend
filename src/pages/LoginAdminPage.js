import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginAdminPage({ setIsAdminAuthenticated }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setIsAdminAuthenticated(true); // Ваша логика аутентификации
        navigate('/admin');
    };

    return (
        <div>
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginAdminPage;
