import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// шаблон для формы авторизации
function AuthForm({ fields, buttons, onSubmit }) {
    const [passwordVisible, setPasswordVisible] = useState(false);

    // обработка изменения
    const handleChange = (e, fieldName) => {
        const { value } = e.target;
        if (onSubmit) onSubmit(fieldName, value);
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <form
            className="p-4 bg-light rounded p-4 shadow-sm"
            onSubmit={(e) => e.preventDefault()}
        >
            <h1 className="text-center">Вход</h1>
            {fields.map((field) => (
                <div className="mb-3" key={field.name}>
                    <label className="form-label">{field.label}</label>
                    <input
                        type={field.type === 'password' ? (passwordVisible ? 'text' : 'password') : field.type || 'text'}
                        name={field.name}
                        className="form-control border-primary"
                        placeholder={field.placeholder}
                        required={field.required}
                        onChange={(e) => handleChange(e, field.name)}
                    />
                    {field.type === 'password' && (
                        <div className="form-check mt-2">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id={`show-password-${field.name}`}
                                checked={passwordVisible}
                                onChange={togglePasswordVisibility}
                            />
                            <label className="form-check-label" htmlFor={`show-password-${field.name}`}>
                                Показать пароль
                            </label>
                        </div>
                    )}
                </div>
            ))}
            <div className="d-flex gap-2 justify-content-center">
                {buttons.map((button, index) => (
                    <Button key={index} {...button} className="btn btn-primary w-100">
                        {button.label}
                    </Button>
                ))}
            </div>
        </form>
    );
}

export default AuthForm;
