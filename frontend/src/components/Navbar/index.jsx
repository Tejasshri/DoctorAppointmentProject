import React, { useEffect } from "react";
import "./index.css"; // Assuming you store your styles here

const baseUrl = "https://www.cioncancerclinics.com/";

const Navar = () => {
  useEffect(() => {
    const toggle = document.getElementById("nav-toggle");
    const nav = document.getElementById("nav-menu");

    const handleClick = () => {
      nav.classList.toggle("show-menu");
      toggle.classList.toggle("show-icon");
    };

    toggle.addEventListener("click", handleClick);

    return () => {
      toggle.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <header className="header">
        <nav className="nav container">
          <div className="nav__data">
            <a href="#" className="nav__logo">
              <img
                src="/home_page/assets/home/logo.webp"
                loading="lazy"
                alt="logo"
              />
            </a>

            <div className="nav__toggle" id="nav-toggle">
              <i className="fa-solid fa-bars nav__burger"></i>
              <i className="fa-solid fa-xmark nav__close"></i>
            </div>
          </div>

          <div>
            <div className="nav__menu" id="nav-menu">
              <ul className="nav__list">
                {/* Example Menu Item */}
                <li className="dropdown__item">
                  <div className="nav__link">About CION</div>
                </li>
                <li className="dropdown__item">
                  <div className="nav__link">About CION</div>
                </li>
                <li className="dropdown__item">
                  <div className="nav__link">About CION</div>
                </li>
                <li className="dropdown__item">
                  <div className="nav__link">About CION</div>
                </li>

                {/* Repeat dropdown__item list items here just like above */}
                {/* Add other nav sections: A-Z of Cancer, Services, Network, Doctors, etc. */}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navar;
