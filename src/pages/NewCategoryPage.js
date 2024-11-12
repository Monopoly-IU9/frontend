import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";

function NewCategoryPage() {
    const [name, setName] = useState('');
    const [color, setColor] = useState('#0000FF');
    const navigate = useNavigate();

    const handleCreateCategory = (e) => {
        e.preventDefault();
        navigate(`/admin/categories`);
    };

    const handleBackButton = (e) => {
        e.preventDefault();
        navigate(`/admin/categories`);
    }

    return (
        <div className="container my-4">
            <Link to="/admin/categories">Назад</Link>
            <h1>Создать новую категорию</h1>
            <div className="mb-3">
                <label className="form-label">Имя категории</label>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-3">
                <label className="form-label">Цвет категории</label>
                <input type="color" className="form-control" value={color} onChange={(e) => setColor(e.target.value)} />
            </div>
            <div className="mb-3">
                <Button onClick={handleCreateCategory} className="btn btn-primary">
                    Создать категорию
                </Button>
            </div>
        </div>
    );
}

export default NewCategoryPage;