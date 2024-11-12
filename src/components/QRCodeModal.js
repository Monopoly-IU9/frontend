import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { generateQRCode } from '../utils/QRgeneration';

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
        </Modal>
    );
}

export default QRCodeModal;
