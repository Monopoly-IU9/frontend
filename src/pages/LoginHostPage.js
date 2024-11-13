import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { useNavigate } from 'react-router-dom';

function LoginHostPage({ setIsHostAuthenticated }) {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const handleInputChange = (name, value) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    // обработка авторизации ведущего
    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Host login data:', formData);
        setIsHostAuthenticated(true);
        navigate('/games');

    };

    return (
        <div>
            <div className="d-flex justify-content-center align-items-center vh-100">
            <AuthForm
                fields={[
                    {name: 'username', label: 'Username', placeholder: 'Enter username', required: true},
                    {
                        name: 'password',
                        label: 'Password',
                        type: 'password',
                        placeholder: 'Enter password',
                        required: true
                    }
                ]}
                buttons={[
                    {label: 'Login', onClick: handleLogin, type: 'button'}
                ]}
                onSubmit={handleInputChange}
            />
            </div>
        </div>
    );
}

export default LoginHostPage;
