import React, { useState } from "react";
import RecommendationComponent from "../components/RecommendationComponent";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

function Assessment() {
  const [formData, setFormData] = useState({
    mood: "Happy",
    stressLevel: 5,
    sleepHours: 7,
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await API.post("/assessment/add", {
        mood: formData.mood,
        stressLevel: parseInt(formData.stressLevel),
        sleepHours: parseFloat(formData.sleepHours),
        notes: formData.notes,
      });

      setMessage("Assessment submitted successfully!");
      setSubmitted(true);
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          mood: "Happy",
          stressLevel: 5,
          sleepHours: 7,
          notes: "",
        });
      }, 2000);
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to submit assessment";
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ padding: "20px", flex: 1, background: "#f5f7fa", minHeight: "100vh" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h1>📊 Wellness Assessment</h1>
          <p style={{ color: "#666", marginBottom: "30px" }}>
            Track your wellness metrics to get personalized recommendations
          </p>

          <form onSubmit={handleSubmit} style={styles.form}>
            {message && (
              <div style={styles[message.includes("successfully") ? "successMessage" : "errorMessage"]}>
                {message}
              </div>
            )}

            <div style={styles.formGroup}>
              <label>How are you feeling today?</label>
              <select
                name="mood"
                value={formData.mood}
                onChange={handleChange}
                style={styles.input}
                required
              >
                <option>Happy</option>
                <option>Neutral</option>
                <option>Sad</option>
                <option>Anxious</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label>Stress Level (1-10)</label>
              <div style={styles.sliderContainer}>
                <input
                  type="range"
                  name="stressLevel"
                  min="1"
                  max="10"
                  value={formData.stressLevel}
                  onChange={handleChange}
                  style={styles.slider}
                />
                <span style={styles.sliderValue}>{formData.stressLevel}</span>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label>Hours of Sleep Last Night</label>
              <input
                type="number"
                name="sleepHours"
                min="0"
                max="24"
                step="0.5"
                value={formData.sleepHours}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label>Additional Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                style={{ ...styles.input, minHeight: "100px", resize: "vertical" }}
                placeholder="Any thoughts or concerns?"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={styles.submitButton}
            >
              {loading ? "Submitting..." : "Submit Assessment"}
            </button>
          </form>

          {submitted && (
            <div style={{ marginTop: "40px" }}>
              <RecommendationComponent key={Date.now()} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  form: {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
  },
  formGroup: {
    marginBottom: "25px",
  },
  input: {
    width: "100%",
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "15px",
    fontFamily: "inherit",
    boxSizing: "border-box",
  },
  sliderContainer: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  slider: {
    flex: 1,
    cursor: "pointer",
  },
  sliderValue: {
    background: "#667eea",
    color: "white",
    padding: "6px 12px",
    borderRadius: "6px",
    fontWeight: "600",
    minWidth: "50px",
    textAlign: "center",
  },
  submitButton: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    padding: "14px 28px",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    width: "100%",
    transition: "all 0.3s ease",
  },
  successMessage: {
    background: "#d4edda",
    color: "#155724",
    padding: "15px",
    borderRadius: "6px",
    marginBottom: "20px",
    border: "1px solid #c3e6cb",
  },
  errorMessage: {
    background: "#f8d7da",
    color: "#721c24",
    padding: "15px",
    borderRadius: "6px",
    marginBottom: "20px",
    border: "1px solid #f5c6cb",
  },
};

export default Assessment;