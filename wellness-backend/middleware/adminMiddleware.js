const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1] || req.headers["authorization"];

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "SECRET_KEY");
    
    // Check if user is admin
    if (decoded.role !== "Admin") {
      return res.status(403).json({ message: "Access denied: Admin privileges required" });
    }
    
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token", error: err.message });
  }
};
