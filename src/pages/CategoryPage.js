import React, { useState } from 'react';
import CategoryModal from '../components/CategoryModal';

function CategoryPage() {
    const [name, setName] = useState('Category 1');
    const [color, setColor] = useState('#0000FF');
    const [showModal, setShowModal] = useState(false);

    const handleUpdateCategory = () => {
    };

    return (
        <div className="container my-4">
            <h1>Изменить категорию</h1>
            <div className="mb-3">
                <label className="form-label">Имя категории</label>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-3">
                <label className="form-label">Цвет категории</label>
                <input type="color" className="form-control" value={color} onChange={(e) => setColor(e.target.value)} />
            </div>
            <button className="btn btn-primary mb-2" onClick={() => setShowModal(true)}>Добавить карточку</button>
            <CategoryModal show={showModal} onClose={() => setShowModal(false)} />
        </div>
    );
}

export default CategoryPage;
