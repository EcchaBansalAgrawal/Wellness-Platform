const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

// ✅ connect DB
connectDB();

// ✅ middlewares
app.use(cors());
app.use(express.json());

// ✅ IMPORT ROUTES
const authRoutes = require("./routes/authRoutes");
const assessmentRoutes = require("./routes/assessmentRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const reportRoutes = require("./routes/reportRoutes");

// ✅ USE ROUTES (VERY IMPORTANT)
app.use("/api/auth", authRoutes);
app.use("/api/assessment", assessmentRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/report", reportRoutes);

// ✅ test route
app.get("/", (req, res) => {
  res.send("API Running ✅");
});

// ✅ start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));