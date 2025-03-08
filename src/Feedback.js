import React from 'react';
import { Link } from 'react-router-dom';
import './Feedback.css';

function Feedback() {
    return (
        <div className="welcome-container">
            <div className="welcome-message">
                <h1>Welcome to the Fundraiser!</h1>
                <p>Thank you for starting a fundraiser. We appreciate your support for a great cause!</p>
                <Link to="/" className="home-link">Go to Home</Link>
            </div>
        </div>
    );
}

export default Feedback;
