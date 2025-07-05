import React from "react";
import "./index.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-main-container">
        <div className="footer-our-vision-container">
          <div className="footer-our-vision">
            <h4>OUR VISION</h4>
            <span></span>
            <small className="footer-main-heading-underline"></small>
            <p>
              To make mental healthcare accessible, affordable, and stigma-free
              across India by: – Empowering individuals to take control of their
              emotional well-being – Providing expert support anytime, anywhere
            </p>
            <h2>
              <a href="tel:18001202676">
                <i className="fas fa-phone" style={{ color: "#5d0f7d" }}>
                  &nbsp;
                  <b
                    style={{
                      fontFamily:
                        "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    }}
                  >
                    1800 120 2676
                  </b>
                </i>
              </a>
            </h2>
          </div>
        </div>

        <div className="our-services-main-container">
          <div className="our-services-container">
            <h4>OUR SERVICES</h4>
            <span></span>
            <small className="footer-main-heading-underline"></small>
            <ul>
              <li>
                <a href="https://www.cioncancerclinics.com/medical-oncology">
                  MEDICAL ONCOLOGY
                </a>
              </li>
              <li>
                <a href="https://www.cioncancerclinics.com/surgical-oncology">
                  SURGICAL ONCOLOGY
                </a>
              </li>
              <li>
                <a href="https://www.cioncancerclinics.com/radiation-oncology">
                  RADIATION ONCOLOGY
                </a>
              </li>
              <li>
                <a href="https://www.cioncancerclinics.com/integrative-care">
                  INTEGRATIVE CARE
                </a>
              </li>
              <li>
                <a href="https://www.cioncancerclinics.com/screening">
                  SCREENING
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="quick-links-main-container">
          <div className="quick-links-container">
            <h4>QUICK LINKS</h4>
            <span></span>
            <small className="footer-main-heading-underline"></small>
            <ul>
              <li>
                <a href="https://www.cioncancerclinics.com/blog/categories/miscellaneous">
                  BLOG
                </a>
              </li>
              <li>
                <a href="https://www.cioncancerclinics.com/media">MEDIA</a>
              </li>
              <li>
                <a href="https://www.cioncancerclinics.com/bio-medical-waste-data">
                  BIO-MEDICAL WASTE MANAGEMENT
                </a>
              </li>
              <li>
                <a href="https://www.cioncancerclinics.com/grievance-redressal-policy">
                  GRIEVANCE REDRESSAL POLICY
                </a>
              </li>
              <li>
                <a href="https://www.cioncancerclinics.com/terms-conditions">
                  TERMS & CONDITIONS
                </a>
              </li>
              <li>
                <a href="https://www.cioncancerclinics.com/privacy-policy">
                  PRIVACY POLICY
                </a>
              </li>
            </ul>
          </div>

          <div className="Social-media-main-container">
            <br />
            <h4>FOLLOW US</h4>
            <span></span>
            <small className="footer-main-heading-underline"></small>
            <div className="social-media-container">
              <a
                href="https://www.facebook.com/CIONCancerClinics/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="https://www.cioncancerclinics.com/assets/newimg/facebook.png"
                  className="footer-icon-new"
                  alt="Facebook"
                />
              </a>
              <a
                href="https://www.instagram.com/cioncancerclinics/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="https://www.cioncancerclinics.com/assets/newimg/instagram.png"
                  className="footer-icon-new"
                  alt="Instagram"
                />
              </a>
              <a href="https://www.cioncancerclinics.com/blog/categories/miscellaneous">
                <img
                  src="https://www.cioncancerclinics.com/assets/newimg/blog.png"
                  className="footer-icon-new"
                  alt="Blog"
                />
              </a>
              <a
                href="https://www.youtube.com/@CIONCancerClinics"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="https://www.cioncancerclinics.com/assets/newimg/youtube.png"
                  className="footer-icon-new"
                  alt="YouTube"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
