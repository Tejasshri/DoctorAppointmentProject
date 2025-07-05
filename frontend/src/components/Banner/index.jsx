import React from "react";
import "./index.css";

const Banner = () => {
  return (
    <div class="banner d-flex flex-column justify-content-center align-items-center">
      <div class="banner__left-container">
        <h1 data-aos="fade-left" class="banner__title">
          India's <span>Fastest-Growing Mental Health Platform</span> — Bringing
          Affordable Therapy to Every Screen
        </h1>
        <p data-aos="fade-right" class="banner__description">
          Where clinical expertise meets compassionate care — delivered
          securely, instantly, and in your language across our growing
          nationwide network.
        </p>
        <div data-aos="fade-up" class="banner__btn-container d-flex">
          <button
            type="button"
            onclick="openServicesForm('')"
            class="banner__talk-to-expert"
          >
            Talk to a Licensed Therapist Today
          </button>
          <button type="button" class="banner__watch-our-video">
            <div>
              <i class="fa-solid fa-play"></i>
            </div>
            <span> Watch Our Video</span>
          </button>
        </div>
      </div>
      <div class="banner__right-container">
        <div  data-aos="zoom-in-up" class="banner__image-container">
          <img 
            src="https://res.cloudinary.com/dnahum2gw/image/upload/v1751711648/doctors_banner_image_mzycko.webp"
            class="banner__image"
            alt="banner image"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
