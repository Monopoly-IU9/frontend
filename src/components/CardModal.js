import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function CardModal({ show, onClose, card }) {
    if (!card) return null;

    // Генерация стиля для заголовка
    const headerStyle = {
        backgroundColor: `#${card.color}`, // Установка цвета категории
        color: 'white', // Текст будет белым для контраста
    };

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton style={headerStyle}>
                <Modal.Title>{card.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    <strong>{card.id}</strong>: {card.description}
                </p>
            </Modal.Body>
        </Modal>
    );
}

export default CardModal;
