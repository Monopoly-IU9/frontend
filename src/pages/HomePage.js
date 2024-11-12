import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

function HomePage() {
    return (
        <div className="bg-light min-vh-100 d-flex align-items-center">
            <Container className="text-center">
                <h1 className="display-4 fw-bold mb-4 text-primary">Добро пожаловать в игру!</h1>
                <p className="lead text-muted mb-5">
                    Это игра, вдохновленная классической "Монополией", где ведущий управляет процессом, а игроки
                    могут присоединиться, сканируя QR-код. Обратитесь к ведущему, чтобы начать.
                </p>

                <Row className="justify-content-center">
                    <Col md={6} lg={4}>
                        <Card className="shadow-sm mb-4">
                            <Card.Body>
                                <Card.Title className="h5">Вход для Ведущего</Card.Title>
                                <Card.Text className="text-muted">
                                    Если вы ведущий игры, войдите, чтобы управлять процессом и следить за ходом игры.
                                </Card.Text>
                                <Link to="/login">
                                    <Button variant="primary" size="lg" className="w-100">Войти как Ведущий</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} lg={4}>
                        <Card className="shadow-sm mb-4">
                            <Card.Body>
                                <Card.Title className="h5">Для Игроков</Card.Title>
                                <Card.Text className="text-muted">
                                    Игрокам нужно сканировать QR-код от ведущего, чтобы присоединиться к игре.
                                </Card.Text>
                                <Button variant="outline-secondary" size="lg" disabled className="w-100">
                                    Сканируйте QR-код у Ведущего
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default HomePage;
