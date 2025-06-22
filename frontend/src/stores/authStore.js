import { create } from "zustand";
import { persist } from "zustand/middleware";

const url = "http://localhost:3005";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      role: null, // 'admin' | 'therapist' | 'user'
      otpSent: false,
      loading: false,
      error: null,

      adminLogin: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const res = await fetch(url + "/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });
          if (!res.ok) throw new Error("Admin login failed");
          const data = await res.json();
          set({
            user: data.user,
            token: data.token,
            role: "admin",
            loading: false,
          });
        } catch (err) {
          set({ error: err.message, loading: false });
        }
      },

      therapistLogin: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const res = await fetch(url + "/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });
          if (!res.ok) throw new Error("Therapist login failed");
          const data = await res.json();
          set({
            user: data.user,
            token: data.token,
            role: "therapist",
            loading: false,
          });
        } catch (err) {
          set({ error: err.message, loading: false });
        }
      },

      requestUserOtp: async (email) => {
        set({ loading: true, error: null });
        try {
          const res = await fetch(url + "/api/auth/request-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          });
          if (!res.ok) throw new Error("Failed to send OTP");
          set({ otpSent: true, loading: false });
        } catch (err) {
          set({ error: err.message, loading: false });
        }
      },

      verifyUserOtp: async ({ email, otp }) => {
        set({ loading: true, error: null });
        try {
          const res = await fetch(url + "/api/auth/verify-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, otp }),
          });
          if (!res.ok) throw new Error("OTP verification failed");
          const data = await res.json();
          if (data.token)
            Cookies.set("token", data.token, {
              expires: 2,
            });
          set({
            user: data.user,
            token: data.token,
            role: "user",
            loading: false,
            otpSent: false,
          });
        } catch (err) {
          set({ error: err.message, loading: false });
        }
      },

      verifyByToken: async () => {
        set({ loading: true, error: null });
        const token = Cookies.get("token");
        try {
          const res = await fetch(url + "/api/auth/verify-by-jwt", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          });
          if (!res.ok) throw new Error("OTP verification failed");
          const data = await res.json();
          set({
            user: data.user,
            token: data.token,
            role: "user",
            loading: false,
            otpSent: false,
          });
        } catch (err) {
          set({ error: err.message, loading: false });
        }
      },

      logout: () =>
        set({ user: null, token: null, role: null, otpSent: false }),
    }),
    { name: "auth-store" }
  )
);

export default useAuthStore;
