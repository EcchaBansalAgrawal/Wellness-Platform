const User = require("../models/User");
const Booking = require("../models/Booking");
const Assessment = require("../models/Assessment");

// Get all users (Admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    
    res.json({
      message: "All users retrieved successfully",
      total: users.length,
      users: users,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user details (Admin only)
exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get user's assessments and bookings
    const assessments = await Assessment.find({ userId }).sort({ createdAt: -1 });
    const bookings = await Booking.find({ userId }).sort({ createdAt: -1 });

    res.json({
      message: "User details retrieved",
      user: user,
      assessmentCount: assessments.length,
      bookingCount: bookings.length,
      assessments: assessments,
      bookings: bookings,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all bookings (Admin only)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name email")
      .populate("approvedBy", "name email")
      .sort({ createdAt: -1 });

    res.json({
      message: "All bookings retrieved successfully",
      total: bookings.length,
      bookings: bookings,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Approve booking (Admin only)
exports.approveBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      {
        approvalStatus: "Approved",
        status: "Confirmed",
        approvedBy: req.user.id,
      },
      { new: true }
    ).populate("userId", "name email").populate("approvedBy", "name email");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({
      message: "Booking approved successfully",
      booking: booking,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Reject booking (Admin only)
exports.rejectBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { reason } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      {
        approvalStatus: "Rejected",
        status: "Cancelled",
        approvedBy: req.user.id,
        notes: reason || "Rejected by admin",
      },
      { new: true }
    ).populate("userId", "name email").populate("approvedBy", "name email");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({
      message: "Booking rejected successfully",
      booking: booking,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get system analytics (Admin only)
exports.getSystemAnalytics = async (req, res) => {
  try {
    // Count statistics
    const totalUsers = await User.countDocuments();
    const adminUsers = await User.countDocuments({ role: "Admin" });
    const regularUsers = await User.countDocuments({ role: "User" });
    
    const totalBookings = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ approvalStatus: "Pending" });
    const approvedBookings = await Booking.countDocuments({ approvalStatus: "Approved" });
    const rejectedBookings = await Booking.countDocuments({ approvalStatus: "Rejected" });
    
    const totalAssessments = await Assessment.countDocuments();
    
    // Average stress level
    const assessments = await Assessment.find();
    const avgStress = assessments.length > 0
      ? (assessments.reduce((sum, a) => sum + a.stressLevel, 0) / assessments.length).toFixed(2)
      : 0;

    // Mood distribution
    const moodDistribution = {};
    assessments.forEach((a) => {
      moodDistribution[a.mood] = (moodDistribution[a.mood] || 0) + 1;
    });

    // Booking status distribution
    const bookingsByStatus = {
      pending: await Booking.countDocuments({ status: "Pending" }),
      confirmed: await Booking.countDocuments({ status: "Confirmed" }),
      completed: await Booking.countDocuments({ status: "Completed" }),
      cancelled: await Booking.countDocuments({ status: "Cancelled" }),
    };

    // Recent activity
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5).select("-password");
    const recentBookings = await Booking.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      message: "System analytics retrieved successfully",
      statistics: {
        users: {
          total: totalUsers,
          admins: adminUsers,
          regular: regularUsers,
        },
        bookings: {
          total: totalBookings,
          pending: pendingBookings,
          approved: approvedBookings,
          rejected: rejectedBookings,
        },
        assessments: {
          total: totalAssessments,
          averageStress: parseFloat(avgStress),
          moodDistribution: moodDistribution,
        },
        bookingsByStatus: bookingsByStatus,
      },
      recentActivity: {
        recentUsers: recentUsers,
        recentBookings: recentBookings,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user role (Admin only - Super Admin feature)
exports.updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!["User", "Admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role. Must be 'User' or 'Admin'" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role: role },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User role updated successfully",
      user: user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
