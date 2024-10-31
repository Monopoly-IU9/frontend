import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';

function LoginHostPage() {
    const [formData, setFormData] = useState({});

    const handleInputChange = (name, value) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleLogin = () => {
        // Логика аутентификации ведущего
        console.log('Host login data:', formData);
    };

    return (
        <div>
            <h2>Host Login</h2>
            <AuthForm
                fields={[
                    { name: 'gameId', label: 'Game ID', placeholder: 'Enter game ID', required: true },
                    { name: 'username', label: 'Username', placeholder: 'Enter username', required: true },
                    { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter password', required: true }
                ]}
                buttons={[
                    { label: 'Join Game', onClick: handleLogin, type: 'button' }
                ]}
                onSubmit={handleInputChange}
            />
        </div>
    );
}

export default LoginHostPage;
