import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { useNavigate } from 'react-router-dom';

function LoginAdminPage({ setIsAdminAuthenticated }) {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const handleInputChange = (name, value) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Admin login data:', formData);
        setIsAdminAuthenticated(true);
        navigate('/admin');
    };

    const fields = [
        { name: 'username', label: 'Username', placeholder: 'Enter username', required: true },
        { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter password', required: true }
    ];

    const buttons = [
        { type: 'submit', label: 'Login', onClick: handleLogin },
    ]

    return (
        <div>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <AuthForm fields={fields} buttons={buttons} onSubmit={handleInputChange}/>
            </div>
            {/*<AuthForm*/}
            {/*    fields={[*/}
            {/*        { name: 'username', label: 'Username', placeholder: 'Enter username', required: true },*/}
            {/*        { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter password', required: true }*/}
            {/*    ]}*/}
            {/*    buttons={[*/}
            {/*        { label: 'Login', onClick: handleLogin, type: 'button' }*/}
            {/*    ]}*/}
            {/*    onSubmit={handleInputChange}*/}
            {/*/>*/}
        </div>
    );
}

export default LoginAdminPage;
