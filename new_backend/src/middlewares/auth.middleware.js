// 📁 middleware/authenticate.js
import jwt from "jsonwebtoken";
import ResponseFormatter from "../utils/ResponseFormatter.js";
import User from "../models/User.js";

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("Token not found");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) throw new Error("Invalid token payload");

    const user = await User.findById(decoded.id);
    if (!user) throw new Error("User not found");

    req.user = user; // attach user to request
    next();
  } catch (error) {
    ResponseFormatter.error(res, error.message, "Unauthorized", 401);
  }
};

export default authenticate;
