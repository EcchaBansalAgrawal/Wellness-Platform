import React from "react";
import ChartComponent from "../components/ChartComponent";
import Sidebar from "../components/Sidebar";
import RecommendationComponent from "../components/RecommendationComponent";


function Dashboard() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ padding: "20px", flex: 1 }}>
        <div style={styles.container}>
          <h1>Dashboard</h1>

          <div style={styles.cards}>
            <div style={styles.card}>
              <h3>Mood</h3>
              <p>😊 Good</p>
            </div>

            <div style={styles.card}>
              <h3>Stress Level</h3>
              <p>Moderate</p>
            </div>

            <div style={styles.card}>
              <h3>Sleep</h3>
              <p>7 hrs</p>
            </div>
          </div>

          <div style={styles.chart}>
            <h2>Weekly Stress Trends</h2>
            <ChartComponent />
          </div>

          <div style={{ marginTop: "30px" }}>
            <RecommendationComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
const styles = {
  container: {
    padding: "20px",
    background: "#f5f7fa",
    minHeight: "100vh",
  },
  cards: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    width: "200px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
};


export default Dashboard;