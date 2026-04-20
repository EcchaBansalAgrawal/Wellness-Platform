import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <h2>Wellness</h2>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/assessment">Assessment</Link>
      <Link to="/booking">Booking</Link>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "200px",
    height: "100vh",
    background: "#2c3e50",
    color: "white",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    gap: "15px",
  },
};

export default Sidebar;