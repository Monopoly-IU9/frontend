import { QRCodeCanvas } from 'qrcode.react';

export const generateQRCode = (url) => {
    return <QRCodeCanvas value={url} size={256} />;
};
