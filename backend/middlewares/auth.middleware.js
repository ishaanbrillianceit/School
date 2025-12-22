import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export const auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Access denied!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    console.log("This is the admin req: ", req.user);
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    // Prefer token-stored role when available
    if (req.user.role && req.user.role === "admin") return next();

    // Fallback: check DB (more robust if role can change)
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.role !== "admin")
      return res.status(403).json({ message: "Admin privileges required" });

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
