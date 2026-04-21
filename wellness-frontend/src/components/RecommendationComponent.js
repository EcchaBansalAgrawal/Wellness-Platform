import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/RecommendationComponent.css";

function RecommendationComponent() {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const handleAction = (action) => {
    if (action.includes("Book")) {
      const sessionType = action.replace("Book ", "").toLowerCase();
      navigate("/booking", { state: { sessionType } });
    } else if (action === "Sleep Tips") {
      alert("Sleep tips: Maintain consistent bedtime, avoid screens before bed, create a relaxing environment.");
    } else if (action === "View Progress") {
      navigate("/dashboard");
    } else {
      alert(`Action: ${action}`);
    }
  };

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const response = await API.get("/recommendation");
      setRecommendations(response.data.recommendations || []);
      setError("");
    } catch (err) {
      setError("Failed to load recommendations");
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = (action) => {
    if (action.includes("Book")) {
      // Extract session type from action
      const sessionType = action.replace("Book ", "").toLowerCase();
      navigate("/booking", { state: { sessionType } });
    } else if (action === "Sleep Tips") {
      // Could navigate to a tips page or show modal
      alert("Sleep tips: Maintain consistent bedtime, avoid screens before bed, create a relaxing environment.");
    } else if (action === "View Progress") {
      navigate("/dashboard");
    } else {
      // Default action
      alert(`Action: ${action}`);
    }
  };

  if (loading) {
    return <div className="recommendation-container">Loading recommendations...</div>;
  }

  if (error) {
    return <div className="recommendation-container error">{error}</div>;
  }

  return (
    <div className="recommendation-container">
      <div className="recommendation-header">
        <h2>💡 Personalized Recommendations</h2>
        <button className="refresh-btn" onClick={fetchRecommendations} title="Refresh">
          🔄
        </button>
      </div>

      {recommendations.length === 0 ? (
        <p className="no-recommendations">No recommendations available yet.</p>
      ) : (
        <div className="recommendation-list">
          {recommendations.map((rec, index) => (
            <div
              key={rec.id}
              className={`recommendation-card priority-${rec.priority}`}
              style={{
                animation: `slideIn 0.4s ease-out ${index * 0.1}s both`,
              }}
            >
              <div className="recommendation-icon">{rec.icon}</div>

              <div className="recommendation-content">
                <h3>{rec.title}</h3>
                <p>{rec.description}</p>
                <span className="recommendation-category">{rec.category}</span>
              </div>

              <button className="recommendation-action">
                {rec.action} →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecommendationComponent;
