import "react";
import { useNavigate } from "react-router-dom";
import "./SOS.css";
import LocationMap from "./LocationMap";

const SOS = () => {
  const navigate = useNavigate();

  const handleEmergencyClick = () => {
    alert("SOS Activated! Sending your location...");
    navigate("/home"); // Redirecting back after activation
  };

  return (
    <div className="sos-container">
      <header className="sos-header">
        <h1>SOS Help System</h1>
      </header>

      <section className="sos-content">
        <h2>Need Immediate Help?</h2>
        <p>Press the SOS button to share your location with emergency contacts.</p>

        {/* Location Map Display */}
        <div className="location-section">
          <h3>Your Current Location:</h3>
          <LocationMap />
        </div>

        {/* SOS Button */}
        <button className="sos-button" onClick={handleEmergencyClick}>Activate SOS</button>
      </section>

      <button className="back-btn" onClick={() => navigate("/home")}>Back to Home</button>

      <footer className="footer">
        <p>© 2025 Emergency Support. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SOS;
