// routes/auth.routes.js
import express from "express";
import { loginAdmin } from "../controllers/auth/admin.auth.js";
import {
  registerTherapist,
  loginTherapist,
} from "../controllers/auth/therapist.auth.js";
import {
  requestOTP,
  verifyOTP,
  verifyUserToken,
} from "../controllers/auth/user.auth.js";
import { checkEmail } from "../controllers/auth.controller.js";

const router = express.Router();

// Admin
router.post("/admin-login", loginAdmin);

// Therapist
router.post("/therapist-register", registerTherapist);
router.post("/therapist-login", loginTherapist);

// User
router.post("/request-otp", requestOTP);
router.post("/verify-otp", verifyOTP);

// verify token
router.get("/verify-token", verifyUserToken);

// getting email informtion
router.post("/check-email", checkEmail);

export default router;
