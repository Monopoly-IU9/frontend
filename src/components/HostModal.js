import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function HostModal({
                       show,
                       onHide,
                       hostLogin,
                       setHostLogin,
                       hostPassword,
                       setHostPassword,
                       onSave,
                       onDelete,
                       isEditing
                   }) {
    const handleSave = () => {
        onSave();
        onHide(); // Закрываем модальное окно после сохранения
    };

    const handleDelete = () => {
        if (onDelete) onDelete();
        onHide(); // Закрываем модальное окно после удаления
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{isEditing ? 'Редактировать ведущего' : 'Добавить ведущего'}</Modal.Title>
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
                {isEditing && (
                    <Button variant="danger" onClick={handleDelete}>
                        Удалить
                    </Button>
                )}
                <Button variant="primary" onClick={handleSave}>
                    {isEditing ? 'Сохранить изменения' : 'Сохранить'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default HostModal;
