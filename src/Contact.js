import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import "./Contact.css";
import axios from "axios";

function Contact() {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [submitted, setSubmitted] = useState(false);

    // Toggle menu visibility
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/contact", formData);
            setSubmitted(true);

                // Redirect to welcome page after 3 seconds
        setTimeout(() => {
            window.location.href = "/Response";  // Replace with your actual welcome page URL
        }, 3000); // 3 seconds delay


        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div>
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

            {/* Contact Section */}
            <div className="contact-container">
                <h2>Contact Us</h2>
                <p>Have any questions? Reach out to us!</p>

                {/* Contact Form */}
                <div className="contact-form">
                    {submitted ? (
                        <p className="success-message">Thank you for reaching out! We'll get back to you soon.</p>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

                            <label htmlFor="message">Message:</label>
                            <textarea id="message" name="message" value={formData.message} onChange={handleChange} required />

                            <button type="submit" className="btn-submit">Send Message</button>
                        </form>
                    )}
                </div>

                {/* Social Media Buttons */}
                <div className="social-media">
                    <h3>Connect with us</h3>
                    <div className="social-buttons">
                        <a href="https://wa.me/+254710569854" target="_blank" rel="noopener noreferrer" className="social-btn whatsapp">
                            <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp
                        </a>
                        <a href="mailto:info@fundation.com" className="social-btn email">
                            <FontAwesomeIcon icon={faEnvelope} /> Email
                        </a>
                        <a href="tel:+254710569854" className="social-btn phone">
                            <FontAwesomeIcon icon={faPhone} /> Call Us
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
