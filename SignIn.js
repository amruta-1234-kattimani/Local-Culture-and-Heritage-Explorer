import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = (e) => {
    e.preventDefault();
    const stored = JSON.parse(localStorage.getItem("userData") || "null");
    if (stored && stored.email === email && stored.password === password) {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card fade-in">
        <h2>Welcome Back</h2>
        <form onSubmit={handleSignin} className="auth-form">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <button type="submit" className="primary-btn">Sign In</button>
        </form>
        <p className="link">
          Don’t have an account? <a href="/signup">Create account</a>
        </p>
      </div>
    </div>
  );
}