import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);

    return (
        <div className="menu-container">
            {/* Hamburger Menu Icon */}
            <div className={`menu-icon ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>

            {/* Top Buttons */}
            <div className="top-buttons">
                <Link to="/signin">
                    <button className="sign-in-btn">Sign In</button>
                </Link>
                <button onClick={() => window.location.href = '/start'} className="fundme-btn">
                    Start FundMe Project
                </button>
            </div>

            {/* Side Menu */}
            <nav className={`menu ${isOpen ? "open" : ""}`}>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/About">About</Link></li>

                    {/* Gallery Dropdown */}
                    <li className="gallery-menu"
                        onMouseEnter={() => setIsGalleryOpen(true)}
                        onMouseLeave={() => setIsGalleryOpen(false)}
                    >
                        <span>Gallery ▾</span>
                        {isGalleryOpen && (
                            <ul className="gallery-dropdown">
                                <li><Link to="/Gallery">Gallery 1</Link></li>
                                <li><Link to="/Gallery2">Gallery 2</Link></li>
                            </ul>
                        )}
                    </li>

                    <li><a href="services.js">Services</a></li>
                    <li><Link to="/Contact">Contact</Link></li>
                    <li><Link to="/SignIn" id="sign">SignIn</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Menu;
