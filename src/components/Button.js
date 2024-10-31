// src/components/Button.js
import React from 'react';

function Button({ onClick, label, type = 'button', style }) {
    return (
        <button onClick={onClick} type={type} style={style}>
            {label}
        </button>
    );
}

export default Button;
