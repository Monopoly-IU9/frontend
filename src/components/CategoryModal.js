import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function CategoryModal({ show, onClose }) {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Card</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label>Description</label>
                <input type="text" className="form-control mb-2" />
                <label>Hashtags</label>
                <input type="text" className="form-control mb-2" />
                <button className="btn btn-primary mt-2" onClick={onClose}>Add Card</button>
            </Modal.Body>
        </Modal>
    );
}

export default CategoryModal;
