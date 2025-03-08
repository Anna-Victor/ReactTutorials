import React, { useState } from 'react';
import axios from 'axios';

function AdminRegister() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!username || !email || !password || !repeatPassword) {
            setMessage("All fields are required");
            return;
        }

        if (password !== repeatPassword) {
            setMessage("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/admin/register", { 
                username, 
                email, 
                password, 
                repeatPassword 
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage("Registration failed: " + (error.response?.data?.error || "Unknown error"));
        }
    };

    return (
        <div>
            <h2>Admin Registration</h2>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <input type="password" placeholder="Repeat Password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} required />
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default AdminRegister;
