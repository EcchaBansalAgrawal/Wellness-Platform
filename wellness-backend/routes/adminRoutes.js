const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const adminMiddleware = require("../middleware/adminMiddleware");

// All admin routes require admin authentication
router.use(adminMiddleware);

// User Management
router.get("/users", adminController.getAllUsers);
router.get("/users/:userId", adminController.getUserById);
router.put("/users/:userId/role", adminController.updateUserRole);

// Booking Management
router.get("/bookings", adminController.getAllBookings);
router.put("/bookings/:bookingId/approve", adminController.approveBooking);
router.put("/bookings/:bookingId/reject", adminController.rejectBooking);

// Analytics
router.get("/analytics", adminController.getSystemAnalytics);

module.exports = router;
