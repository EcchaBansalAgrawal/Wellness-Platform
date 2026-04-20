const router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const {
  createBooking,
  getUserBookings,
  updateBooking,
  deleteBooking,
  rescheduleBooking,
} = require("../controllers/bookingController");

router.post("/create", auth, createBooking);
router.get("/user/:userId", getUserBookings);
router.get("/all", auth, getUserBookings);
router.put("/update/:id", auth, updateBooking);
router.put("/reschedule/:id", auth, rescheduleBooking);
router.delete("/delete/:id", auth, deleteBooking);

module.exports = router;