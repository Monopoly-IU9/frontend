import React, { useState, useEffect } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import HostModal from '../components/HostModal';
import { createHost, getHosts, editHost, deleteHost } from '../api/HostsAPI';

function ManageHostsPage() {
    const [hosts, setHosts] = useState([]); // Список ведущих
    const [showModal, setShowModal] = useState(false); // Состояние модального окна
    const [currentHost, setCurrentHost] = useState(null); // Текущий ведущий (для редактирования)
    const [loading, setLoading] = useState(true); // Загрузка данных

    useEffect(() => {
        loadHosts();
    }, []);

    const loadHosts = async () => {
        setLoading(true);
        try {
            const response = await getHosts();
            setHosts(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке ведущих:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddHost = () => {
        setCurrentHost(null);
        setShowModal(true);
    };

    const handleEditHost = (host) => {
        setCurrentHost({ ...host });
        setShowModal(true);
    };

    const handleSaveHost = async () => {
        try {
            if (currentHost?.id) {
                // Редактирование существующего ведущего
                await editHost(currentHost.id, currentHost.login, currentHost.password);
                setHosts((prevHosts) =>
                    prevHosts.map((h) => (h.id === currentHost.id ? currentHost : h))
                );
            } else {
                // Добавление нового ведущего
                await createHost(currentHost.login, currentHost.password);
                loadHosts(); // Перезагружаем список
            }
        } catch (error) {
            console.error('Ошибка при сохранении ведущего:', error);
        }
    };

    const handleDeleteHost = async () => {
        try {
            if (currentHost?.id) {
                await deleteHost(currentHost.id);
                setHosts((prevHosts) => prevHosts.filter((h) => h.id !== currentHost.id));
            }
        } catch (error) {
            console.error('Ошибка при удалении ведущего:', error);
        }
    };

    return (
        <div className="container my-4 bg-light rounded p-4 shadow-sm">
            <Link to="/admin" className="btn btn-outline-secondary mb-3">
                Назад
            </Link>
            <h1 className="mb-4">Ведущие</h1>

            <div className="d-flex flex-column gap-3">
                <button className="btn btn-primary mb-4" onClick={handleAddHost}>
                    Добавить ведущего
                </button>
            </div>

            <h2>Существующие ведущие</h2>
            {loading ? (
                <p>Загрузка ведущих...</p>
            ) : (
                <ListGroup className="mb-4">
                    {hosts.map((host) => (
                        <ListGroup.Item
                            key={host.id}
                            className="d-flex justify-content-between align-items-center"
                        >
                            <span>{host.login}</span>
                            <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => handleEditHost(host)}
                            >
                                Изменить
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}

            <HostModal
                show={showModal}
                onHide={() => setShowModal(false)}
                hostLogin={currentHost?.login || ''}
                setHostLogin={(login) =>
                    setCurrentHost((prev) => ({ ...prev, login }))
                }
                hostPassword={currentHost?.password || ''}
                setHostPassword={(password) =>
                    setCurrentHost((prev) => ({ ...prev, password }))
                }
                onSave={handleSaveHost}
                onDelete={handleDeleteHost}
                isEditing={!!currentHost?.id}
            />
        </div>
    );
}

export default ManageHostsPage;
