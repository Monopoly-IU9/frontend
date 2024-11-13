import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
// модальное окно для выбора ведущего в игре
function HostModal({ show, onHide, hostLogin, setHostLogin, hostPassword, setHostPassword }) {
    const handleSave = () => {
        onHide(); // Закрываем модальное окно после сохранения
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Настроить ведущего</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3">
                    <label className="form-label">Логин ведущего</label>
                    <input
                        type="text"
                        className="form-control"
                        value={hostLogin}
                        onChange={(e) => setHostLogin(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Пароль ведущего</label>
                    <input
                        type="password"
                        className="form-control"
                        value={hostPassword}
                        onChange={(e) => setHostPassword(e.target.value)}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSave}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default HostModal;
