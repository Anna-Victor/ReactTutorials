import React, { useState } from 'react';
import { Link } from 'reacr-router-dom';
import './NavBar.css';

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    //Toggle menu Visibility
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="logo">Fundation</div>

            {/* Hamburger Icon */}
            <div className="hamburger" onClick={toggleMenu}>☰</div>

            {/* Navigation Links */}
            <ul className={`nav-links ${isOpen ? "open" : ""}`}>
                <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
                <li><Link to="/about" onClick={toggleMenu}>About</Link></li>
                <li><Link to="/services" onClick={toggleMenu}>Services</Link></li>
                <li><Link to="/Gallery" onClick={toggleMenu}>Gallery</Link></li>
                <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
            </ul>
        </nav>
    );
}


export default NavBar;