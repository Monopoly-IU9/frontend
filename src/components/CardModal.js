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
                <Modal.Title>
                    Карточка {card.categoryId}.{card.id}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{card.description}</p>
                <div>
                    {card.tags.map((tag, index) => (
                        <Badge key={index} className="me-1" bg={card.color}>
                            {tag}
                        </Badge>
                    ))}
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default CardModal;
