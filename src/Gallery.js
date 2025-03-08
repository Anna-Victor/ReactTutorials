import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Gallery.css';

// Import images
import img1 from "./assets/art.jpg";
import img2 from "./assets/ballets.jpg";
import img3 from "./assets/photography.jpg";

const slides = [
    { image: img1, description: "Explore beautiful art pieces from around the world." },
    { image: img2, description: "Experience the elegance and passion of ballet performances." },
    { image: img3, description: "Capture moments through the lens of talented photographers." }
];

function Gallery() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Function to handle the Next button click
    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    // Function to handle the Previous button click
    const goToPrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    // Toggle menu visibility
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="about-page">
            {/* Navigation Bar */}
            <nav className="navbar">
                <div className="logo">Fundation</div>
                <div className="hamburger" onClick={toggleMenu}>☰</div>
                <ul className={`nav-links ${isOpen ? "open" : ""}`}>
                    <li><Link to="/SignIn" id="sign" onClick={toggleMenu}>SignIn</Link></li>
                    <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
                    <li><Link to="/About" onClick={toggleMenu}>About</Link></li>
                    <li><Link to="/services" onClick={toggleMenu}>Services</Link></li>
                    <li><Link to="/Gallery" onClick={toggleMenu}>Gallery</Link></li>
                    <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
                </ul>
            </nav>

            {/* Slideshow Section */}
            <div className="slideshow">
                <img src={slides[currentIndex].image} alt={`Slide ${currentIndex + 1}`} className="slide-image" />
                <p className="slide-description">{slides[currentIndex].description}</p>
                
                {/* Navigation buttons placed below */}
                <div className="slideshow-controls">
                    <button className="prev" onClick={goToPrev}>❮</button>
                    <button className="next" onClick={goToNext}>❯</button>
                </div>
            </div>
        </div>
    );
}

export default Gallery;
