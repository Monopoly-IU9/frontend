import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { generateQRCode } from '../utils/QRgeneration';

// модальное окно для вывода QR-кода игры
function QRCodeModal({ show, onClose, gameId }) {
    const gameUrl = `${window.location.origin}/game?id=${gameId}`;

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>QR-код для игры</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                {generateQRCode(gameUrl)}
            </Modal.Body>
            <Modal.Footer>
                <p>Ссылка на игру: <a href={gameUrl} target="_blank" rel="noopener noreferrer">{gameUrl}</a></p>
            </Modal.Footer>
        </Modal>
    );
}

export default QRCodeModal;
