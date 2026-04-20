import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2>Wellness Platform</h2>
      <div style={{ display: "flex", gap: "20px" }}>
  <Link to="/dashboard" style={{ color: "white" }}>Dashboard</Link>
  <Link to="/assessment" style={{ color: "white" }}>Assessment</Link>
  <Link to="/booking" style={{ color: "white" }}>Booking</Link>
</div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px",
    background: "#2c3e50",
    color: "white",
  },
};

export default Navbar;