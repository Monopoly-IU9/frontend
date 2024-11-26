import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import { hostLogout } from '../api/AuthAPI';

function CustomNavbar({ isHostAuthenticated, setIsHostAuthenticated }) {
    const navigate = useNavigate();
    const handleLogout = async () => {
        const hostToken = localStorage.getItem('hostToken');
        try {
            await hostLogout(hostToken); // Вызов ручки для выхода
            localStorage.removeItem('hostToken'); // Удаляем токен из локального хранилища
            setIsHostAuthenticated(false); // Обновляем состояние
            navigate('/home');
        } catch (error) {
            console.error('Ошибка при выходе:', error);
        }
    };

    return (
        <Navbar bg="primary" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/home">
                    Monopoly
                </Navbar.Brand>
                <Nav className="ms-auto">
                    {isHostAuthenticated && (
                        <Nav.Link onClick={handleLogout}>
                            Выйти
                        </Nav.Link>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;
