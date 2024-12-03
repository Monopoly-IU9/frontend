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
        <div className="container bg-light rounded p-4 shadow-sm">
            <Link to="/admin" className="text-decoration-none d-flex align-items-center mb-3"
                  style={{color: '#0d6efd'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-arrow-left me-1" viewBox="0 0 16 16">
                    <path fillRule="evenodd"
                          d="M15 8a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708.708L2.707 7.5H14.5A.5.5 0 0 1 15 8z"/>
                </svg>
                Главная
            </Link>
            <div className="d-flex justify-content-between align-items-center mb-3 mt-1">
                <h2>Ведущие</h2>
                <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={handleAddHost}
                >
                    +
                </button>
            </div>
            {loading ? (
                <p>Загрузка ведущих...</p>
            ) : (
                <ListGroup className="mb-4">
                    {hosts.map((host) => (
                        <ListGroup.Item
                            key={host.id}
                            className="d-flex justify-content-between align-items-center"
                            onClick={() => handleEditHost(host)}
                        >
                            <span>{host.login}</span>
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
