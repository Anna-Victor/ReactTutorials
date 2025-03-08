import React from 'react';
import { Link } from 'react-router-dom';
import './Feedback.css';

function Response() {
    return (
        <div className="welcome-container">
            <div className="welcome-message">
                <h1>Welcome to the Fundraiser!</h1>
                <p>Thank you for reaching out to us. We will get back to you shortly!</p>
                <Link to="/" className="home-link">Go to Home</Link>
            </div>
        </div>
    );
}

export default Response;
