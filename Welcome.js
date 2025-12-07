import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      {/* Overlay for readability */}
      <div className="welcome-overlay"></div>

      {/* Main content */}
      <div className="welcome-content">
        {/* Centered heritage image */}
        <img
          src="https://images.unsplash.com/photo-1505455184864-9a6cf7b8b946?auto=format&fit=crop&w=800&q=80"
          alt="Heritage"
          className="welcome-img"
        />

        <h1>Welcome to</h1>
        <h2>Local Culture & Heritage Explorer</h2>
        <p>
          Discover and explore local culture, traditions, events, and heritage
          spots submitted by users.
        </p>

        {/* Buttons */}
        <div className="welcome-buttons">
          <button className="btn" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
          <button className="btn ghost-btn" onClick={() => navigate("/signin")}>
            Sign In
          </button>
        </div>
      </div>

      {/* Optional floating shapes */}
      <div className="shape shape1"></div>
      <div className="shape shape2"></div>
    </div>
  );
}