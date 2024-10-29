import React from 'react';

function QRCode({ gameCode }) {
    return (
        <div>
            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${gameCode}`} alt="QR Code" />
        </div>
    );
}

export default QRCode;
