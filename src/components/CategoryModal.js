import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';

function CategoryModal({ show, onClose, onSave, card }) {
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState('');

    useEffect(() => {
        if (card) {
            setDescription(card.description);
            setTags(card.tags || []);
        } else {
            setDescription('');
            setTags([]);
        }
    }, [card]);

    const handleAddTag = () => {
        if (newTag && !tags.includes(newTag)) {
            setTags([...tags, newTag]);
            setNewTag('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleSave = () => {
        onSave({ id: card ? card.id : Date.now(), description, tags });
        onClose();
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{card ? 'Редактирование карточки' : 'Добавление карточки'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Описание</Form.Label>
                    <Form.Control
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>

                {/* Управление тегами */}
                <Form.Group className="mb-3">
                    <Form.Label>Теги</Form.Label>
                    <div>
                        {tags.map((tag, index) => (
                            <span key={index} className="badge bg-secondary me-2">
                                {tag}{' '}
                                <span
                                    style={{ cursor: 'pointer', color: 'red' }}
                                    onClick={() => handleRemoveTag(tag)}
                                >
                                    ✖
                                </span>
                            </span>
                        ))}
                    </div>
                    <InputGroup className="mt-2">
                        <Form.Control
                            type="text"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            placeholder="Новый тег"
                        />
                        <Button variant="outline-primary" onClick={handleAddTag}>
                            Добавить тег
                        </Button>
                    </InputGroup>
                </Form.Group>

                <Button onClick={handleSave} className="btn btn-primary w-100">
                    {card ? 'Сохранить изменения' : 'Добавить карточку'}
                </Button>
            </Modal.Body>
        </Modal>
    );
}

export default CategoryModal;
