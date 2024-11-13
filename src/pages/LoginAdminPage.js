import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { useNavigate } from 'react-router-dom';

function LoginAdminPage({ setIsAdminAuthenticated }) {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const handleInputChange = (name, value) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // обработка авторизации админа
    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Admin login data:', formData);
        setIsAdminAuthenticated(true);
        navigate('/admin');
    };
    // поля для формы авторизации
    const fields = [
        { name: 'username', label: 'Username', placeholder: 'Enter username', required: true },
        { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter password', required: true }
    ];
    // кнопки для формы авторизации
    const buttons = [
        { type: 'submit', label: 'Login', onClick: handleLogin },
    ]

    return (
        <div>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <AuthForm fields={fields} buttons={buttons} onSubmit={handleInputChange}/>
            </div>
        </div>
    );
}

export default LoginAdminPage;
