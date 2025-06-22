import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(null);
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [phone, setPhone] = useState("");

  // ✅ Verify JWT token on mount
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) loginByToken(token);
  }, []);

  // ✅ Email blur check
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

  // ✅ Token-based login
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

  // ✅ Admin login
  const loginAdmin = async () => {
    try {
      const res = await fetch("http://localhost:3005/api/auth/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Admin login failed");

      Cookies.set("token", data.token);
      setUser(data.user);
      setRole("admin");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ Therapist login
  const loginTherapist = async () => {
    try {
      const res = await fetch(
        "http://localhost:3005/api/auth/therapist-login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Therapist login failed");

      Cookies.set("token", data.token);
      setUser(data.user);
      setRole("therapist");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ OTP login (User)
  const loginUserByOTP = async () => {
    try {
      const res = await fetch("http://localhost:3005/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otpCode: otp, email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "OTP failed");

      Cookies.set("token", data.token);
      setUser(data.user);
      setRole("user");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const sendOTP = async () => {
    try {
      const res = await fetch("http://localhost:3005/api/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send OTP");

      alert("📩 OTP sent successfully");
      setOtpSent(true);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const setMail = () => setEmail("cioncancerclinicsdevelopers@gmail.com");

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {user ? (
        <div>
          <p>
            ✅ Logged in as <strong>{user.name || user.email}</strong>
          </p>
          <p>Role: {role}</p>
        </div>
      ) : (
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Email Input */}
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => checkEmailRole(email)}
            style={{ display: "block", marginBottom: 10, width: "100%" }}
          />
          {role && <p style={{ color: "green" }}>Detected Role: {role}</p>}

          {/* Password Input (Admin/Therapist) */}
          {(role === "admin" || role === "therapist") && (
            <>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ display: "block", marginBottom: 10, width: "100%" }}
              />
              <button
                onClick={role === "admin" ? loginAdmin : loginTherapist}
                style={{ width: "100%", padding: "8px" }}>
                Login as {role}
              </button>
            </>
          )}

          {/* OTP Input (User) */}
          {(!role || role === "user") && (
            <>
              <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ display: "block", marginBottom: 10, width: "100%" }}
              />
              <input
                type="text"
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={{ display: "block", marginBottom: 10, width: "100%" }}
              />
              <button
                onClick={loginUserByOTP}
                style={{ width: "100%", padding: "8px" }}>
                {"Login with OTP"}
              </button>
              <button
                onClick={sendOTP}
                style={{ width: "100%", padding: "8px" }}>
                {"Send Otp"}
              </button>
            </>
          )}
          {!email && <button onClick={setMail}>set temp mail for test</button>}
        </form>
      )}
    </div>
  );
};

export default Login;
