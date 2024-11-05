// src/components/Button.js
import React from 'react';

function Button({ onClick, label, type = 'button', className }) {
    return (
        <button onClick={onClick} type={type} className={className}>
            {label}
        </button>
    );
}

export default Button;
