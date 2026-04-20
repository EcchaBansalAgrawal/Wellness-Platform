import React, { useState, useEffect } from "react";
import API from "../services/api";
import "../styles/RecommendationComponent.css";

function RecommendationComponent() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRecommendations();
  }, []);

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
