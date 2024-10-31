import React from 'react';
import { useNavigate } from 'react-router-dom';

function CategoriesPage() {
    const navigate = useNavigate();

    return (
        <div className="container my-4">
            <h1>Categories</h1>
            <button className="btn btn-primary" onClick={() => navigate('/admin/new-category')}>Create New Category</button>

            <h2>Existing Categories</h2>
            <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between">
                    Category 1
                    <button className="btn btn-sm btn-outline-primary" onClick={() => navigate('/admin/category?id=1')}>Edit</button>
                </li>
            </ul>
        </div>
    );
}

export default CategoriesPage;
