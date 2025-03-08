import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Public.css';

function Public() {
    const [fundraisers, setFundraisers] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5000/api/fundraisers')
            .then(response => setFundraisers(response.data))
            .catch(error => console.error('Error fetching fundraisers:', error));
    }, []);

    // Toggle menu visibility
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            {/* Navigation Bar */}
            <nav className="navbar">
                <div className="logo">Fundation</div>
                <div className="hamburger" onClick={toggleMenu}>☰</div>
                <ul className={`nav-links ${isOpen ? "open" : ""}`}>
                    <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
                    <li><Link to="/About" onClick={toggleMenu}>About</Link></li>
                    <li><Link to="/services" onClick={toggleMenu}>Services</Link></li>
                    <li><Link to="/Gallery" onClick={toggleMenu}>Gallery</Link></li>
                    <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
                </ul>
            </nav>

            <h2>Fundraisers</h2>
            <div className="fundraiser-container">
                {fundraisers.length > 0 ? (
                    fundraisers.map(fundraiser => {
                        // Calculate remaining amount
                        const remainingAmount = fundraiser.goalAmount - fundraiser.donatedAmount;
                        const imageUrl = fundraiser.image
                        ?  `http://localhost:5000/uploads/${decodeURIComponent(fundraiser.image)}`
                        : 'https://via.placeholder.com/300'; // Placeholder if no image

                        return (
                            <div key={fundraiser.id} className={`fundraiser-card ${fundraiser.goalAmount === 0 ? 'inactive' : ''}`}>
                                <h3>{fundraiser.title}</h3>
                                <p><strong>Organizer:</strong> {fundraiser.organizer}</p>
                                <p><strong>Cause:</strong> {fundraiser.cause}</p>
                                <p><strong>Description:</strong> {fundraiser.description}</p>
                                <p><strong>Fundraising Goal:</strong> £{fundraiser.goalAmount}</p>
                                <p><strong>Donated Amount:</strong> £{fundraiser.donatedAmount}</p>
                                <p><strong>Remaining Amount:</strong> £{remainingAmount}</p>
                                <p><strong>Started:</strong> {new Date(fundraiser.createdAt).toLocaleDateString()}</p>

                                      {/* ✅ Add the image here */}
                                <img src={imageUrl} alt={fundraiser.title} className="fundraiser-image" />
                                
                                {/* Link to Donate Page */}
                                <Link to={`/FundMePage/${fundraiser.id}`}>
                                    <button disabled={remainingAmount <= 0}>
                                        {remainingAmount <= 0 ? 'Goal Reached' : 'Donate Now'}
                                    </button>
                                </Link>
                            </div>
                        );
                    })
                ) : (
                    <p>No fundraisers available</p>
                )}
            </div>
        </div>
    );
}

export default Public;
