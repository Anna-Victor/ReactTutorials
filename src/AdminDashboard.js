import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';
import { Link } from 'react-router-dom';

function AdminDashboard() {
    const [fundraisers, setFundraisers] = useState([]);
    const [message, setMessage] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchFundraisers = async () => {
            try {
                const response = await axios.get("http://localhost:5000/admin/fundraisers");
                setFundraisers(response.data);
            } catch (error) {
                console.error("Error fetching fundraisers", error);
            }
        };
        fetchFundraisers();
    }, []);

    const handleConfirm = async (id) => {
        try {
            await axios.post("http://localhost:5000/admin/confirm-fundraiser", { fundraiserId: id });
            setMessage("Fundraiser confirmed successfully!");
            setFundraisers(fundraisers.filter(f => f.id !== id)); // Remove from list after confirmation
        } catch (error) {
            console.error("Error confirming fundraiser", error);
        }
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <nav className="navbar">
                <div className="logo">Fundation</div>
                <h3>Welcome to the Art Fundraiser</h3>
                <div className="hamburger" onClick={toggleMenu}>☰</div>
                <ul className={`nav-links ${isOpen ? "open" : ""}`}>
                    <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
                    <li><Link className="about" to="/About" onClick={toggleMenu}>About</Link></li>
                    <li><Link to="/Gallery" onClick={toggleMenu}>NEWS</Link></li>
                    <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
                    <li><Link to="/Start" onClick={toggleMenu}>FundMe</Link></li>
                    <li><Link to="/SignIn" onClick={toggleMenu}>SignIn</Link></li>
                </ul>
            </nav>

            <div className="dashboard-container">
                <h2>Admin Dashboard</h2>
                {message && <p className="success-message">{message}</p>}
                <div className="fundraiser-list">
                    {fundraisers.map(fundraiser => (
                        <div key={fundraiser.id} className="fundraiser-card">
                            <h3>{fundraiser.title}</h3>
                            <p>{fundraiser.description}</p>
                            <p><strong>Goal:</strong> £{fundraiser.goalAmount}</p>
                            <p><strong>Organizer:</strong> {fundraiser.organizer}</p>
                            <button onClick={() => handleConfirm(fundraiser.id)} className="confirm-button">Confirm</button>
                        </div>
                    ))}
                </div>
            </div>

            <footer className="footer-to-left">
                <p>©️ 2025 Fundation. All Rights Reserved.</p>
            </footer>
        </div>
    );
}

export default AdminDashboard;
