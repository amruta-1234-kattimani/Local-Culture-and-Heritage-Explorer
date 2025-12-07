import React from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import "../styles.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const handleLogout=()=>{ navigate("/signin"); }

  return (
    <div className="dashboard-root">
      <div className="shape shape1"></div>
      <div className="shape shape2"></div>

      <div className="dash-nav">
        <h2>MyApp</h2>
        <div style={{display:"flex",gap:"10px"}}>
          <ThemeToggle />
          <button className="ghost-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="welcome-card">
        <h2>Welcome!</h2>
        <p>This is your dashboard with floating shapes and dark mode support.</p>
      </div>
    </div>
  )
}