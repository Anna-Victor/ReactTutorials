import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CodeVerification.css'; // Ensure to style the form

function CodeVerification() {
  const [countryCode, setCountryCode] = useState('+1'); // Default to US
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  // Simulate sending an OTP (Replace with real API integration)
  const handleSendOtp = () => {
    if (phoneNumber) {
      setOtpSent(true);
      alert(`OTP sent to ${countryCode} ${phoneNumber}`); // Placeholder alert
    }
  };

  // Simulate OTP verification (Replace with real authentication logic)
  const handleVerifyOtp = () => {
    if (otp === '123456') { // Placeholder OTP for testing
      alert('Phone number verified. Signed in successfully!');
      navigate('/Public'); // Redirect to dashboard after sign-in
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="code-container">
      <h2>Verify Your Phone Number</h2>

      {!otpSent ? (
        <div className="phone-input">
          <label>Country Code:</label>
          <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
          <option value="+1">🇺🇸 United States</option>
            <option value="+44"><span role="img" aria-label="UK">🇬🇧</span> +44 (UK)</option>
            <option value="+91"><span role="img" aria-label="India">🇮🇳</span> +91 (India)</option>
            <option value="+254"><span role="img" aria-label="Kenya">🇰🇪</span> +254 (Kenya)</option>
            <option value="+61"><span role="img" aria-label="Australia">🇦🇺</span> +61 (Australia)</option>
            <option value="+370"><span role="img" aria-label="Lithuania">🇱🇹</span> +370 (Lithuania)</option>
          </select>


          <input
            type="tel"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <button onClick={handleSendOtp} className="send-otp-button">Send OTP</button>
        </div>
      ) : (
        <div className="otp-input">
          <p>Enter the OTP sent to {countryCode} {phoneNumber}</p>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength="6"
            required
          />
          <button onClick={handleVerifyOtp} className="verify-otp-button">Verify & Sign In</button>
          
        </div>
      )}
    </div>
  );
}

export default CodeVerification;
