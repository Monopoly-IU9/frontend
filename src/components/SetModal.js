import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';

function SetModal({ show, onClose, onSave, set, cards }) {
    const [name, setName] = useState('');
    const [selectedCards, setSelectedCards] = useState([]);

    useEffect(() => {
        if (set) {
            setName(set.name);
            setSelectedCards(set.cards || []);
        } else {
            setName('');
            setSelectedCards([]);
        }
    }, [set]);

    const handleCardSelection = (card) => {
        setSelectedCards(
            selectedCards.includes(card)
                ? selectedCards.filter((c) => c !== card)
                : [...selectedCards, card]
        );
    };

    const handleSave = () => {
        onSave({ id: set ? set.id : Date.now(), name, cards: selectedCards, isMain: false });
        onClose();
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{set ? 'Редактирование набора' : 'Добавление набора'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Название набора</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>

                {/* Выбор карточек */}
                <Form.Group className="mb-3">
                    <Form.Label>Выберите карточки</Form.Label>
                    <ListGroup>
                        {cards.map((card) => (
                            <ListGroup.Item
                                key={card.id}
                                active={selectedCards.includes(card)}
                                onClick={() => handleCardSelection(card)}
                                style={{ cursor: 'pointer' }}
                            >
                                {card.description}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Form.Group>

                <Button onClick={handleSave} className="btn btn-primary w-100">
                    {set ? 'Сохранить изменения' : 'Добавить набор'}
                </Button>
            </Modal.Body>
        </Modal>
    );
}

export default SetModal;
