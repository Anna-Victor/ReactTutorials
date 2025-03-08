import React, { useState } from 'react';
import axios from 'axios';

function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/admin/login", { username, password });
            setMessage(response.data.message);
            // Redirect or handle successful login logic here
            setMessage("Login successful! Redirecting...");
            setTimeout(() => {
                window.location.href = "/AdminDashboard";
            }, 2000);
        } catch (error) {
            setMessage("Login failed: " + error.response.data.error);
        }
    };

    return (
        <div>
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default AdminLogin;
