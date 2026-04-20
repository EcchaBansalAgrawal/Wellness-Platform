const Booking = require("../models/Booking");

// ✅ CREATE BOOKING (SECURE WITH JWT)
exports.createBooking = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const { sessionType, date, notes } = req.body;

    const booking = new Booking({
      userId,
      sessionType,
      date,
      notes,
      status: "Pending",
    });

    await booking.save();

    res.status(201).json({ message: "Booking confirmed successfully", booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ GET ALL BOOKINGS FOR USER
exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.user?.id || req.query.userId || req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const bookings = await Booking.find({ userId }).sort({ date: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ UPDATE BOOKING
exports.updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBooking = await Booking.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ message: "Booking updated", updatedBooking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ DELETE BOOKING
exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    await Booking.findByIdAndDelete(id);
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};