import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div>
            <nav>
                <Link to="/login-admin">Login as Admin</Link>
                <br />
                <Link to="/login-host">Login as Host</Link>
            </nav>
        </div>
    );
}

export default HomePage;
