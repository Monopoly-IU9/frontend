import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';


// модальное окно для создания или изменения набора
function SetModal({ show, onClose, onSave, set, cards, categoryId }) {
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

    // обработка выбора карточек
    const handleCardSelection = (card) => {
        setSelectedCards(
            selectedCards.find((c) => c.id === card.id)
                ? selectedCards.filter((c) => c.id !== card.id)
                : [...selectedCards, card]
        );
    };

    // обработка сохранения изменений
    const handleSave = () => {
        onSave({
            id: set ? set.id : Date.now(),
            name,
            cards: selectedCards,
            isMain: false,
        });
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
                                active={selectedCards.some((selected) => selected.id === card.id)}
                                onClick={() => handleCardSelection(card)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="d-flex flex-column">
                                    <h5 className="mb-1">{categoryId + "." + card.id}</h5>
                                    <p className="mb-0 text-truncate">
                                        {card.description}
                                    </p>
                                </div>
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
