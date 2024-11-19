import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginHost } from '../api/AuthAPI';
import AuthForm from '../components/AuthForm';

function LoginHostPage({ setIsHostAuthenticated }) {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (name, value) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await loginHost(formData.username, formData.password);
            localStorage.setItem('hostToken', response.data.access_token);
            setIsHostAuthenticated(true);
            navigate('/games');
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    const fields = [
        { name: 'username', label: 'Username', placeholder: 'Enter username', required: true },
        { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter password', required: true }
    ];

    const buttons = [
        { type: 'submit', label: 'Login', onClick: handleLogin },
    ];

    return (
        <div>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <AuthForm fields={fields} buttons={buttons} onSubmit={handleInputChange} />
                {error && <p className="text-danger">{error}</p>}
            </div>
        </div>
    );
}

export default LoginHostPage;
