import React from 'react';
import Button from './Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function AuthForm({ fields, buttons, onSubmit }) {
    const handleChange = (e, fieldName) => {
        const { value } = e.target;
        if (onSubmit) onSubmit(fieldName, value);
    };

    return (
        <form
            className="p-4 border rounded bg-primary text-white"
            onSubmit={(e) => e.preventDefault()}
        >
            {fields.map((field) => (
                <div className="mb-3" key={field.name}>
                    <label className="form-label">{field.label}</label>
                    <input
                        type={field.type || 'text'}
                        name={field.name}
                        className="form-control border-0"
                        placeholder={field.placeholder}
                        required={field.required}
                        onChange={(e) => handleChange(e, field.name)}
                    />
                </div>
            ))}
            <div className="d-flex gap-2">
                {buttons.map((button, index) => (
                    <Button key={index} {...button} className="btn btn-light text-primary" />
                ))}
            </div>
        </form>
    );
}

export default AuthForm;
