import React, { useState, useRef, useEffect } from "react";
import "./index.css";

const Navar = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const navMenuRef = useRef(null);
  const dropdownRef = useRef(null);

  // Close menu when nav__link is clicked
  useEffect(() => {
    const links = navMenuRef.current?.querySelectorAll(".nav__link");
    const handleClick = () => setMenuVisible(false);

    links?.forEach((link) => link.addEventListener("click", handleClick));
    return () => {
      links?.forEach((link) => link.removeEventListener("click", handleClick));
    };
  }, []);

  return (
    <header className="header">
      <nav className="nav container">
        <a href="#" className="nav__logo">
          Logo
        </a>

        {/* NAV MENU */}
        <div
          ref={navMenuRef}
          className={`nav__menu ${menuVisible ? "show-menu" : ""}`}
          id="nav-menu"
        >
          <ul className="nav__list">
            <li>
              <a href="#" className="nav__link">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="nav__link">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="nav__link">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="nav__link">
                Products
              </a>
            </li>
            <li>
              <a href="#" className="nav__link">
                Contact
              </a>
            </li>
          </ul>

          <div
            className="nav__close"
            id="nav-close"
            onClick={() => setMenuVisible(false)}
          >
            <i className="ri-close-large-line"></i>
          </div>
        </div>

        {/* NAV ACTIONS */}
        <div className="nav__actions">
          <div
            className={`dropdown ${dropdownVisible ? "show-dropdown" : ""}`}
            id="dropdown"
            ref={dropdownRef}
            onClick={() => setDropdownVisible(!dropdownVisible)}
          >
            <div className="dropdown__profile">
              <div className="dropdown__names">
                <h3>Mark Sparks</h3>
                <span>Developer</span>
              </div>
              <div className="dropdown__image">
                <img src="assets/img/perfil.png" alt="profile" />
              </div>
            </div>

            <div className="dropdown__list">
              <a href="#" className="dropdown__link">
                <i className="ri-user-line"></i>
                <span>Profile</span>
              </a>
              <a href="#" className="dropdown__link">
                <i className="ri-time-line"></i>
                <span>Activity</span>
              </a>
              <a href="#" className="dropdown__link">
                <i className="ri-bookmark-line"></i>
                <span>Saved</span>
              </a>
              <a href="#" className="dropdown__link">
                <i className="ri-settings-3-line"></i>
                <span>Settings</span>
              </a>
              <a href="#" className="dropdown__link">
                <i className="ri-logout-box-r-line"></i>
                <span>Logout</span>
              </a>
            </div>
          </div>

          <div
            className="nav__toggle"
            id="nav-toggle"
            onClick={() => setMenuVisible(true)}
          >
            <i className="ri-menu-line"></i>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navar;
