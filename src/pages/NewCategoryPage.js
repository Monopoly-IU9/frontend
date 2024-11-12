import React, { useState } from 'react';

function NewCategoryPage() {
    const [name, setName] = useState('');
    const [color, setColor] = useState('#000000');

    const handleCreateCategory = () => {
    };

    return (
        <div className="container my-4">
            <h1>Создать новую категорию</h1>
            <div className="mb-3">
                <label className="form-label">Имя категории</label>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-3">
                <label className="form-label">Цвет категории</label>
                <input type="color" className="form-control" value={color} onChange={(e) => setColor(e.target.value)} />
            </div>
            <button className="btn btn-primary" onClick={handleCreateCategory}>Create Category</button>
        </div>
    );
}

export default NewCategoryPage;
