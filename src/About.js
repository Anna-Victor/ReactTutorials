import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './About.css';

function About() {
  const [isOpen, setIsOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="about-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo"><img src="logo.jpeg" alt="Logo" /></div>

        {/* Hamburger Icon */}
        <div className="hamburger" onClick={toggleMenu}>
          ☰
        </div>

        {/* Navigation Links */}
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li><Link to="/SignIn" id="sign" onClick={toggleMenu}>SignIn</Link></li>
          <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/About" onClick={toggleMenu}>About</Link></li>
          <li><Link to="/services" onClick={toggleMenu}>Services</Link></li>

          {/* Gallery Dropdown */}
          <li 
            className="gallery-dropdown"
            onMouseEnter={() => setIsGalleryOpen(true)}
            onMouseLeave={() => setIsGalleryOpen(false)}
          >
            <Link to="/Gallery">Gallery</Link>
            {isGalleryOpen && (
              <ul className="gallery-dropdown-menu">
                <li><Link to="/Gallery1" onClick={toggleMenu}>Gallery 1</Link></li>
                <li><Link to="/Gallery2" onClick={toggleMenu}>Gallery 2</Link></li>
              </ul>
            )}
          </li>

          <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <div className="hero">
        <img src={'/aboutbg.jpg'} alt="Fundation - Making a Difference" className="hero-image" />
        <div className="hero-text">
          <h1>About Fundation</h1>
          <h4>Committed to making a difference in people's lives.</h4>
        </div>
      </div>

      {/* About Page Content */}
      <div className="page">

        <h2>Who We Are!</h2>
        <p>Our foundation is dedicated to uplifting communities by supporting various causes, including mentorship, education, and essential aid for underprivileged children. Through our initiatives, we provide food, clothing, and personal care items, ensuring that every child has the opportunity to thrive. We believe in nurturing potential, fostering hope, and creating a lasting impact in the lives of those we serve. Join us in making a difference—one act of kindness at a time.</p>
        <button onClick={() => window.location.href = '/start'} className="start">Start A GoFundMe</button>
        <div className="images">
            <h3>OUR CAUSES</h3>
            <div className="image-pics">
                <div className="polaroid"><img src={'slides/art.jpg'} alt="Cause 1" /></div>
                <div className="polaroid"><img src={'slides/ballets.jpg'} alt="Cause 2" /></div>
                <div className="polaroid"><img src={'slides/photography.jpg'} alt="Cause 3"  /></div>
                <div className="polaroid"><img src={'slides/pottery.jpg'} alt="Cause 4" /></div>
                <div className="polaroid"><img src={'slides/pottery.jpg'} alt="Cause 5" /></div>
                <div className="polaroid"><img src={'slides/photography.jpg'} alt="Cause 6" /></div>
                <div className="polaroid"><img src={'slides/art.jpg'} alt="Cause 7" /></div>
                <div className="polaroid"><img src={'slides/ballets.jpg'} alt="Cause 8" /></div>
            </div>
        </div>

        <button onClick={() => window.location.href = '/FundMePage'} id="donate">Donate</button>

        <section className="user-reviews">
        <h2>What People Say</h2>
        <div className="reviews-container">
            <div className="review-card">
                <h5 className="review-title">GoFundMe has been a lifesaver! </h5>
                <p className="review-text">Their platform made it easy to raise funds for my medical bills, and the support was incredible. I highly recommend it for anyone in need of financial help.</p>
                <p className="review-author">- Chris  </p>
            </div>
            <div className="review-card">
                <h5 className="review-title">Great experience using GoFundMe!</h5>
                <p className="review-text">The site is user-friendly, and the donations came in faster than expected. Customer support was also very responsive and helpful throughout.</p>
                <p className="review-author">- Panelope</p>
            </div>
            <div className="review-card">
                <h5 className="review-title">GoFundMe made fundraising simple!</h5>
                <p className="review-text">I was able to set up a campaign quickly and reach a wide audience. The transparency and security features gave donors confidence to contribute.</p>
                <p className="review-author">- Simon</p>
            </div>
            <div className="review-card">
                <h5 className="review-title">A reliable crowdfunding platform!</h5>
                <p className="review-text">I used GoFundMe for a community project, and the response was amazing. It’s a fantastic way to connect with people who truly care.</p>
                <p className="review-author">- Robert</p>
            </div>
    
        </div>
        </section> 

        <button className="start" id="first" onClick={() => window.location.href = '/start'} >Start A GoFundMe</button>

    </div>

    <footer>
        <p>© 2025 Fundation. All Rights Reserved.</p>
    </footer>

    </div>
  );
}

export default About;