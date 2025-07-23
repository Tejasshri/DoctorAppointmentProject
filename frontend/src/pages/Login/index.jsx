import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import styles from "./index.module.css";
import api from "../../config/api.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    phone: "",
    otp: "",
    password: "",
    role: "", // 'patient' or 'therapist'
  });

  // Try auto login by token
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) loginByToken(token);
  }, []);

  const loginByToken = async (token) => {
    try {
      const res = await api.post("/api/auth/token-login", { token });
      if (res.status === 200) {
        navigate("/home");
      }
    } catch (err) {
      console.error("Token login failed", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const checkEmailRole = async () => {
    try {
      setLoading(true);
      const res = await api.post("/api/auth/check-role", {
        email: user.email,
      });
      const role = res.data.data.role;
      setUser((p) => ({ ...p, role }));

      if (role === "patient") {
        setStep(2); // Ask phone, send OTP
      } else if (role === "therapist") {
        setStep(3); // Ask for password
      } else {
        setError("User not found or role unknown.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Email verification failed");
    } finally {
      setLoading(false);
    }
  };

  const sendOTP = async () => {
    try {
      setLoading(true);
      await api.post("/api/auth/send-otp", {
        email: user.email,
        phone: user.phone,
      });
      setStep(4); // Move to OTP entry step
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const loginPatient = async () => {
    try {
      setLoading(true);
      const res = await api.post("/api/auth/login", {
        email: user.email,
        phone: user.phone,
        otpCode: user.otp,
      });
      Cookies.set("token", res.data.token);
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "OTP Login failed");
    } finally {
      setLoading(false);
    }
  };

  const loginTherapist = async () => {
    try {
      setLoading(true);
      const res = await api.post("/api/auth/login", {
        email: user.email,
        password: user.password,
      });
      Cookies.set("token", res.data.token);
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Password Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (step === 1) {
      await checkEmailRole();
    } else if (step === 2) {
      await sendOTP();
    } else if (step === 3) {
      await loginTherapist();
    } else if (step === 4) {
      await loginPatient();
    }
  };

  return (
    <div className={styles.signupPageContainer}>
      <form className={styles.signupForm} onSubmit={handleSubmit}>
        <h2 className={styles.signupFormHeading}>Login</h2>

        {step === 1 && (
          <div className={styles.formField}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
            />
          </div>
        )}

        {step === 2 && (
          <>
            <div className={styles.formField}>
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={user.phone}
                onChange={handleInputChange}
              />
            </div>
          </>
        )}

        {step === 3 && (
          <div className={styles.formField}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
            />
          </div>
        )}

        {step === 4 && (
          <div className={styles.formField}>
            <label>OTP</label>
            <input
              type="text"
              name="otp"
              value={user.otp}
              onChange={handleInputChange}
            />
          </div>
        )}

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" disabled={loading} className={styles.formNextButton}>
          {loading ? "Processing..." : step === 1 ? "Next" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
