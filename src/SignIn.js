import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignIn.css'; // Ensure styles are updated accordingly

function SignIn() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  // Redirect user to the code page
  const handleRedirectToCodePage = () => {
    navigate('/code'); 
  };

  // Handle email sign-in submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      handleRedirectToCodePage();
    }
  };

  return (
    <div className="signin-container">
      <form onSubmit={handleSubmit}>
        <h2>Welcome</h2>
        <p id="paragraph">Log in to Fundation to continue</p>

        {/* Sign in with Google */}
        <button type="button" className="google-signin" onClick={handleRedirectToCodePage}>
          Continue with Google
        </button>

        {/* Sign in with Apple */}
        <button type="button" className="apple-signin" onClick={handleRedirectToCodePage}>
          Continue with Apple
        </button>

        <hr className="divider" />

        {/* Sign in with Email */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="signin-button">Continue</button>

        {/* Link to Home */}
        <Link to="/" className="back-link">Back to Home Page</Link>
      </form>
    </div>
  );
}

export default SignIn;
