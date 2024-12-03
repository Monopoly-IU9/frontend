import React from 'react';
import { Modal, Button, Badge } from 'react-bootstrap';

function CardModal({ show, onClose, card }) {
    if (!card) return null;

    // Генерация стиля для заголовка
    const headerStyle = {
        backgroundColor: `var(--bs-${card.color})`, // Использование стандартных цветов Bootstrap
        color: 'white', // Текст будет белым для контраста
    };

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton style={headerStyle}>
                <Modal.Title>{`Категория ${card.categoryId}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    <strong>{`${card.categoryId}.${card.id}`}</strong>: {card.description}
                </p>
            </Modal.Body>
        </Modal>
    );
}

export default CardModal;
