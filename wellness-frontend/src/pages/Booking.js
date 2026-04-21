import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CalendarComponent from "../components/CalendarComponent";
import RescheduleModal from "../components/RescheduleModal";
import API from "../services/api";
import "./BookingPage.css";

function Booking() {
  const location = useLocation();
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showNewBookingForm, setShowNewBookingForm] = useState(false);
  const [formData, setFormData] = useState({
    sessionType: location.state?.sessionType || "Meditation",
    sessionType: "Meditation",
    date: "",
    notes: "",
  });

  // Fetch bookings on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Please login first");
      return;
    }
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      const response = await API.get("/booking/all");
      setBookings(response.data || []);
      setMessage(""); // Clear any previous error messages
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Failed to fetch bookings";
      setMessage(errorMsg);
      setBookings([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectEvent = (booking) => {
    setSelectedBooking(booking);
  };

  const handleSelectSlot = (date) => {
    // Format date as YYYY-MM-DD for the date input
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    
    setFormData((prev) => ({
      ...prev,
      date: formattedDate,
    }));
    setShowNewBookingForm(true);
  };

  const handleCreateBooking = async (e) => {
    e.preventDefault();
    if (!formData.date || !formData.sessionType) {
      setMessage("Please fill in all required fields");
      return;
    }

    try {
      setIsLoading(true);
      // Create date with 10:00 AM time to avoid timezone issues
      const bookingDate = new Date(`${formData.date}T10:00:00`);
      
      const response = await API.post("/booking/create", {
        sessionType: formData.sessionType,
        date: bookingDate.toISOString(),
        notes: formData.notes,
      });

      setMessage("Booking created successfully!");
      setShowNewBookingForm(false);
      setFormData({ sessionType: "Meditation", date: "", notes: "" });
      fetchBookings();
      
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Failed to create booking: " + (error.response?.data?.message || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  const handleReschedule = async (rescheduleData) => {
    try {
      setIsLoading(true);
      
      const response = await API.put(`/booking/reschedule/${rescheduleData.bookingId}`, {
        date: rescheduleData.newDate.toISOString(),
        notes: rescheduleData.notes,
      });

      setMessage("Booking rescheduled successfully!");
      setShowRescheduleModal(false);
      setSelectedBooking(null);
      fetchBookings();
      
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Failed to reschedule booking: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        setIsLoading(true);
        await API.delete(`/booking/delete/${bookingId}`);
        setMessage("Booking deleted successfully!");
        setSelectedBooking(null);
        fetchBookings();
        
        setTimeout(() => setMessage(""), 3000);
      } catch (error) {
        setMessage("Failed to delete booking: " + error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="booking-page">
      <div className="booking-container">
        <div className="booking-header">
          <h1>📅 Wellness Session Calendar</h1>
          <button 
            className="btn-new-booking" 
            onClick={() => setShowNewBookingForm(!showNewBookingForm)}
          >
            {showNewBookingForm ? "Cancel" : "+ New Booking"}
          </button>
        </div>

        {message && (
          <div className={`alert ${message.includes("Failed") ? "alert-error" : "alert-success"}`}>
            {message}
          </div>
        )}

        {showNewBookingForm && (
          <div className="new-booking-form">
            <h3>Create New Booking</h3>
            <form onSubmit={handleCreateBooking}>
              <div className="form-group">
                <label>Session Type</label>
                <select
                  value={formData.sessionType}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      sessionType: e.target.value,
                    }))
                  }
                  disabled={isLoading}
                >
                  <option>Meditation</option>
                  <option>Yoga</option>
                  <option>Consultation</option>
                  <option>Therapy</option>
                  <option>Fitness</option>
                </select>
              </div>

              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, date: e.target.value }))
                  }
                  min={new Date().toISOString().split("T")[0]}
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="form-group">
                <label>Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, notes: e.target.value }))
                  }
                  placeholder="Add any special requests..."
                  disabled={isLoading}
                  rows="3"
                />
              </div>

              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Booking"}
              </button>
            </form>
          </div>
        )}

        <div className="calendar-section">
          <h2>Your Bookings</h2>
          {bookings.length > 0 ? (
            <CalendarComponent
              bookings={bookings}
              onSelectEvent={handleSelectEvent}
              onSelectSlot={handleSelectSlot}
            />
          ) : (
            <div className="no-bookings">
              <p>No bookings yet. Create one to get started!</p>
            </div>
          )}
        </div>

        <div className="bookings-grid">
          {bookings.map((booking) => (
            <div key={booking._id} className="booking-card">
              <div className="booking-header-card">
                <h3>{booking.sessionType}</h3>
                <span className={`status-badge ${booking.approvalStatus?.toLowerCase()}`}>
                  {booking.approvalStatus}
                </span>
              </div>

              <div className="booking-details">
                <p>
                  <strong>📅 Date:</strong>{" "}
                  {new Date(booking.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>⏰ Time:</strong>{" "}
                  {new Date(booking.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p>
                  <strong>📝 Status:</strong> {booking.status}
                </p>
                {booking.notes && (
                  <p>
                    <strong>📄 Notes:</strong> {booking.notes}
                  </p>
                )}
              </div>

              <div className="booking-actions">
                <button
                  className="btn btn-reschedule"
                  onClick={() => {
                    setSelectedBooking(booking);
                    setShowRescheduleModal(true);
                  }}
                  disabled={isLoading || booking.status === "Completed"}
                >
                  🔄 Reschedule
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => handleDeleteBooking(booking._id)}
                  disabled={isLoading}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showRescheduleModal && selectedBooking && (
        <RescheduleModal
          booking={selectedBooking}
          onClose={() => setShowRescheduleModal(false)}
          onReschedule={handleReschedule}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default Booking;
