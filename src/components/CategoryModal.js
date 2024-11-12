import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function CategoryModal({ show, onClose }) {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Добавление карточки</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label>Описание</label>
                <input type="text" className="form-control mb-2" />
                <label>Теги</label>
                <input type="text" className="form-control mb-2" />
                <Button className="btn btn-primary mt-2" onClick={onClose}>Добавить карточку</Button>
            </Modal.Body>
        </Modal>
    );
}

export default CategoryModal;
