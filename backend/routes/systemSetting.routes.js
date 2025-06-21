/**
 * System Setting Routes - Admin Platform Configuration
 * Developed by Tejas and Sanju
 */
import express from "express";
import {
  getSetting,
  updateSetting,
} from "../controllers/systemSetting.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/role.middleware.js";

const router = express.Router();

// ✅ Get System Setting by Key
// Admin fetches config value like session price, GMeet key, etc.
router.get("/:key", authenticate, authorizeRole("admin"), getSetting);

// ✅ Update System Setting
// Admin updates values like price, email settings, etc.
router.put("/:key", authenticate, authorizeRole("admin"), updateSetting);

export default router;
