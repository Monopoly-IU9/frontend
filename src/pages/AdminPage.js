import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminPage() {
    const navigate = useNavigate();

    return (
        <div className="container my-4">
            <h1>Admin Panel</h1>
            <button className="btn btn-primary" onClick={() => navigate('/admin/categories')}>Manage Categories</button>
            <button className="btn btn-secondary my-2" onClick={() => navigate('/admin/new-game')}>Create New Game Template</button>

            <h2>Existing Game Templates</h2>
            <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between">
                    Game Template 1
                    <button className="btn btn-sm btn-outline-primary" onClick={() => navigate('/admin/edit-game?id=1')}>Edit</button>
                </li>
            </ul>
        </div>
    );
}

export default AdminPage;
