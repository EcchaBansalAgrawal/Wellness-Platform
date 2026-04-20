import React, { useState } from "react";
import "../styles/RescheduleModal.css";

const RescheduleModal = ({ booking, onClose, onReschedule, isLoading }) => {
  const [newDate, setNewDate] = useState(
    booking?.date ? new Date(booking.date).toISOString().split("T")[0] : ""
  );
  const [newTime, setNewTime] = useState(
    booking?.date ? new Date(booking.date).toTimeString().split(":").slice(0, 2).join(":") : "10:00"
  );
  const [notes, setNotes] = useState(booking?.notes || "");

  const handleReschedule = () => {
    if (!newDate || !newTime) {
      alert("Please select both date and time");
      return;
    }

    const newDateTime = new Date(`${newDate}T${newTime}`);

    onReschedule({
      bookingId: booking._id,
      newDate: newDateTime,
      notes: notes,
    });
  };

  // Format date to readable format
  const currentDate = booking?.date ? new Date(booking.date).toLocaleDateString() : "";
  const currentTime = booking?.date
    ? new Date(booking.date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Reschedule Session</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="booking-info">
            <h3>{booking?.sessionType}</h3>
            <p>
              <strong>Current Date & Time:</strong> {currentDate} at {currentTime}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={`status-badge ${booking?.approvalStatus?.toLowerCase()}`}>
                {booking?.approvalStatus}
              </span>
            </p>
          </div>

          <div className="form-group">
            <label htmlFor="newDate">
              <strong>New Date</strong>
            </label>
            <input
              type="date"
              id="newDate"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="newTime">
              <strong>New Time</strong>
            </label>
            <input
              type="time"
              id="newTime"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="notes">
              <strong>Notes (Optional)</strong>
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes about the rescheduling"
              rows="3"
              disabled={isLoading}
            />
          </div>

          <div className="time-preview">
            <p>
              <strong>New scheduled time:</strong>{" "}
              {newDate && newTime
                ? new Date(`${newDate}T${newTime}`).toLocaleString()
                : "Select date and time"}
            </p>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose} disabled={isLoading}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleReschedule}
            disabled={isLoading || !newDate || !newTime}
          >
            {isLoading ? "Rescheduling..." : "Reschedule"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RescheduleModal;
