import React from "react";
import "./index.css";

const Banner = () => {
  return (
    <div class="banner-container">
      {/* Left Side */}
      <div class="banner-left">
        <div class="banner-text">
          <p>Book Appointment</p>
          <p class="sub-text">With 100+ Trusted Doctors</p>
        </div>
        <button onclick="location.href='/login'" class="banner-button">
          Create account
        </button>
      </div>

      {/* Right Side */}
      <div class="banner-right">
        <img src="assets/appointment_img.png" alt="Appointment" />
      </div>
    </div>
  );
};

export default Banner;
