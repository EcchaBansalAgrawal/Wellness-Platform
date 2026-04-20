import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/CalendarComponent.css";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarComponent = ({ bookings, onSelectEvent, onSelectSlot }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Convert bookings to calendar events
    if (bookings && bookings.length > 0) {
      const calendarEvents = bookings.map((booking) => ({
        id: booking._id,
        title: `${booking.sessionType}`,
        start: new Date(booking.date),
        end: new Date(new Date(booking.date).getTime() + 60 * 60 * 1000), // 1 hour duration
        resource: booking,
        status: booking.approvalStatus,
        sessionType: booking.sessionType,
      }));
      setEvents(calendarEvents);
    }
  }, [bookings]);

  const handleSelectEvent = (event) => {
    onSelectEvent(event.resource);
  };

  const handleSelectSlot = (slotInfo) => {
    onSelectSlot(slotInfo.start);
  };

  const eventStyleGetter = (event) => {
    let backgroundColor = "#3174ad"; // default blue

    if (event.status === "Approved") {
      backgroundColor = "#28a745"; // green for approved
    } else if (event.status === "Rejected") {
      backgroundColor = "#dc3545"; // red for rejected
    } else if (event.status === "Pending") {
      backgroundColor = "#ffc107"; // yellow for pending
    }

    const style = {
      backgroundColor: backgroundColor,
      borderRadius: "5px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
      fontWeight: "bold",
    };

    return { style };
  };

  return (
    <div className="calendar-container">
      {events.length > 0 ? (
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600, width: "100%" }}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          popup
          eventPropGetter={eventStyleGetter}
          views={["month", "week", "day", "agenda"]}
          defaultView="month"
        />
      ) : (
        <div className="calendar-empty">
          <p>No bookings scheduled. Create one to get started!</p>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
