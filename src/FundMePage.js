import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios'; // Import Axios for HTTP requests
import './FundMePage.css';

function FundMePage() {
    const { id } = useParams(); // Get the fundraiser ID from the URL
    const [isOpen, setIsOpen] = useState(false);
    const [donationAmount, setDonationAmount] = useState("10");
    const [message, setMessage] = useState("");
    const [fundraiser, setFundraiser] = useState(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        // Fetch the fundraiser details by ID
        axios.get(`http://localhost:5000/api/fundraisers/${id}`)
            .then(response => setFundraiser(response.data))
            .catch(error => console.error('Error fetching fundraiser details:', error));
    }, [id]);

    const handleDonate = async (e) => {
        e.preventDefault();

        console.log("Donation amount:", donationAmount);  // Check this value

    
        const numericDonationAmount = parseFloat(donationAmount);
       
        // Check if the donation amount is valid
        if (isNaN(numericDonationAmount) || numericDonationAmount <= 0) {
            setMessage("Please enter a valid donation amount.");
            return;
        }
    
        try {
            // Send the donation amount as a numeric value
            const response = await axios.post('http://localhost:5000/FundMePage', { fundraiserId: id, amount: numericDonationAmount });
    
            // If the donation is successful, update the message
            setMessage(response.data.message || "Donation made successfully!");
        } catch (error) {
            setMessage("Failed to process donation");
            console.error(error);
        }
    };
    
    

    if (!fundraiser) {
        return <p>Loading fundraiser details...</p>;
    }

    return (
        <div>
            {/* Navigation Links */}
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

            {/* Main Page Content */}
            <div className="fundraiser-content">
                <h2 id="title">{fundraiser.title}</h2>
                <p>{fundraiser.description}</p>

                {/* Donation Form */}
                <div className="donation-form">
                    <form onSubmit={handleDonate}>
                        <h3>MAKE A DONATION TODAY</h3>
                        <label htmlFor="donationAmount">Select Amount to Donate:</label>
                        <select 
                            id="donationAmount" 
                            value={donationAmount} 
                            onChange={(e) => setDonationAmount(e.target.value)}
                        >
                            <option value="10">10 GBP</option>
                            <option value="25">25 GBP</option>
                            <option value="50">50 GBP</option>
                            <option value="100">100 GBP</option>
                        </select>
                        <button className="btn-style" type="submit" id="one">Donate Now</button>
                    </form>
                    {message && <p className="message">{message}</p>}
                </div>

                {/* Call to Action */}
                <div className="cta">
                    <h3>Join us in supporting our causes!</h3>
                    <button className="btn-style"><a href="#one" id="second">Make a Difference Today</a></button>
                </div>

                <div className="support-art">
                    <h3>Support our causes</h3>
                    <p>We are truly grateful for the support of our generous donors. Your contributions help provide the tools and resources for the next generation of artists. Together, we can make the art world flourish and create meaningful change.</p>
                    <p><b>Thank you for your help and continued support!</b></p>
                </div>
            </div>
        </div>
    );
}

export default FundMePage;
