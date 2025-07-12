import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import styles from "./index.module.css";
import { url } from "../../config/settings";

const Login = () => {
  const [role, setRole] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [user, setUser] = useState({
    email: "tejasshrishekhar08@gmail.com",
    phone: "7895441429",
    otp: "",
    role: "user",
    password: "12345",
    confirmPassword: "12345",
    tAndC: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) loginByToken(token);
  }, []);

  const checkEmailRole = async (email) => {
    if (!email.includes("@")) return;
    try {
      const res = await fetch("http://localhost:3005/api/auth/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok && data.exists) {
        setRole(data.role);
        setError("");
      } else {
        setError("Email not found");
        setRole(null);
      }
    } catch (err) {
      setError("Failed to check email");
      setRole(null);
    }
  };

  const loginByToken = async (token) => {
    try {
      const res = await fetch("http://localhost:3005/api/auth/verify-by-jwt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error("Token invalid or expired");

      setUser(data.userObj);
      setRole(data.userObj?.role || "unknown");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const sendOTP = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${url}/api/auth/request-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send OTP");

      alert("📩 OTP sent successfully");
      setOtpSent(true);
      setStep(2);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log(user)
    e.preventDefault();

    if (!user.tAndC) {
      setError("Please agree to Terms and Conditions.");
      return;
    }

    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${url}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: user.phone,
          otpCode: user.otp,
          email: user.email,
          password: user.password,
          confirmPassword: user.confirmPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "OTP verification failed");

      Cookies.set("token", data.token);
      setUser(data.user);
      setRole("user");
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.signupPageContainer}>
      <form className={styles.signupForm} onSubmit={handleSubmit}>
        <h2 className={styles.signupFormHeading}>Create an account?</h2>

        {step === 1 ? (
          <>
            <div className={styles.formField}>
              <label htmlFor="signupMail">Email</label>
              <input
                name="email"
                id="signupMail"
                type="text"
                placeholder="joedoe75@gmail.com"
                value={user.email}
                onChange={handleInputChange}
                onBlur={() => checkEmailRole(user.email)}
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="signupPhone">Phone</label>
              <input
                name="phone"
                id="signupPhone"
                type="text"
                value={user.phone}
                onChange={handleInputChange}
              />
            </div>
          </>
        ) : (
          <>
            <div className={styles.formField}>
              <label htmlFor="signupPassword">Password</label>
              <input
                name="password"
                id="signupPassword"
                type="password"
                value={user.password}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                name="confirmPassword"
                id="confirmPassword"
                type="password"
                value={user.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="signupOTP">OTP</label>
              <input
                name="otp"
                id="signupOTP"
                type="text"
                value={user.otp}
                onChange={handleInputChange}
              />
            </div>
          </>
        )}

        <div className={styles.termsSection}>
          <div className={styles.termsCheckboxWrapper}>
            <input
              id="signupTerms"
              type="checkbox"
              name="tAndC"
              checked={user.tAndC}
              onChange={handleInputChange}
            />
            <label htmlFor="signupTerms">
              I agree to the Terms of Services
            </label>
          </div>
          <a href="#">Create an account as a therapist?</a>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        {step === 1 ? (
          <button
            type="button"
            disabled={loading}
            onClick={sendOTP}
            className={styles.formNextButton}>
            {!loading ? "Next" : "Sending otp..."}
          </button>
        ) : (
          <button
            disabled={loading || !user.tAndC}
            onClick={handleSubmit}
            type="submit"
            className={styles.formNextButton}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        )}
      </form>
    </div>
  );
};

export default Login;
