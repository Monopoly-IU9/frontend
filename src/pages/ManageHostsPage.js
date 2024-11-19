import React, { useState, useEffect } from 'react';
import { Button, Container, ListGroup, Row, Col } from 'react-bootstrap';
import HostModal from '../components/HostModal';
import { createHost } from '../api/AuthAPI';
import {Link} from "react-router-dom";

function ManageHostsPage() {
    const [hosts, setHosts] = useState([]); // Список ведущих
    const [showModal, setShowModal] = useState(false); // Состояние модального окна
    const [hostLogin, setHostLogin] = useState(''); // Логин ведущего
    const [hostPassword, setHostPassword] = useState(''); // Пароль ведущего
    const [loading, setLoading] = useState(true);

    // Загрузка списка ведущих
    // useEffect(() => {
    //     const fetchHosts = async () => {
    //         try {
    //             const response = await getHosts();
    //             setHosts(response.data); // Установим ведущих из API
    //         } catch (error) {
    //             console.error('Ошибка при загрузке ведущих:', error);
    //         }
    //     };
    //
    //     fetchHosts();
    // }, []);

    // Добавление нового ведущего
    const handleSaveHost = async () => {
        try {
            await createHost(hostLogin, hostPassword);
            setHosts([...hosts, { login: hostLogin }]); // Добавляем нового ведущего в список
            setHostLogin(''); // Сбрасываем поля ввода
            setHostPassword('');
        } catch (error) {
            console.error('Ошибка при добавлении ведущего:', error);
        }
    };

    return (
        <div className="container my-4 bg-light rounded p-4 shadow-sm">
            <Link to="/admin" className="btn btn-outline-secondary mb-3">Назад</Link>
            <h1 className="mb-4">Ведущие</h1>

            <div className="d-flex flex-column gap-3">
                <button
                    className="btn btn-primary mb-4"
                    onClick={() => setShowModal(true)}
                >
                    Задать нового ведущего
                </button>
            </div>
            <HostModal
                show={showModal}
                onHide={() => setShowModal(false)}
                hostLogin={hostLogin}
                setHostLogin={setHostLogin}
                hostPassword={hostPassword}
                setHostPassword={setHostPassword}
                onSave={handleSaveHost}
            />
            <h2>Существующие ведущие</h2>
            {loading ? (
                <p>Загрузка Ведущих...</p>
            ) : (
                <ListGroup className="mb-4">
                    {hosts.map((host, index) => (
                        <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                            {host.login}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    );
}

export default ManageHostsPage;
