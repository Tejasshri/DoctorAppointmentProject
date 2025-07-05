import React from "react";
import styles from "./index.module.css";

const TypesOfTherpies = () => {
  return (
    <section className={styles.container}>
      <h2 data-aos="fade-up" className={styles.title}>
        Therapy For A Better Life
      </h2>
      <p data-aos="fade-up" className={styles.description}>
        What type of a therapy are you looking for?
      </p>
      <div className={styles.cardsContainer}>
        {/* Individual Therapy */}
        <div data-aos="zoom-in-up" className={styles.card}>
          <h4 className={styles.cardTitle}>
            Individual <br /> Therapy
          </h4>
          <div className={styles.cardImageContainer}>
            <img
              src="https://res.cloudinary.com/dnahum2gw/image/upload/v1751479176/individual_2_v953ke.webp"
              alt="individual therapy"
              className={`${styles.cardImage} ${styles.imageFront}`}
            />
            <img
              src="https://res.cloudinary.com/dnahum2gw/image/upload/v1751479176/individual_wudfwj.webp"
              alt="individual therapy"
              className={`${styles.cardImage} ${styles.imageHover}`}
            />
          </div>
        </div>
        {/* Couple Therapy */}
        {/* <div className={styles.card}>
          <h4 className={styles.cardTitle}>Couple <br />Therapy</h4>
          <div className={styles.cardImageContainer}>
            <img
              src="https://res.cloudinary.com/dnahum2gw/image/upload/v1751479176/couple2_ojhwz6.webp"
              alt="Couple therapy"
              className={`${styles.cardImage} ${styles.imageFront}`}
            />
            <img
              src="https://res.cloudinary.com/dnahum2gw/image/upload/v1751479176/couple_fihrj0.webp"
              alt="Couple therapy"
              className={`${styles.cardImage} ${styles.imageHover}`}
            />
          </div>
        </div> */}
        {/* Teen Therapy */}
        <div data-aos="zoom-in-left" className={styles.card}>
          <h4 className={styles.cardTitle}>
            Teen
            <br /> Therapy
          </h4>
          {/* On Hover Image Will Change */}
          <div className={styles.cardImageContainer}>
            <img
              src="https://res.cloudinary.com/dnahum2gw/image/upload/v1751479176/teen_llfhqd.webp"
              alt="Couple therapy"
              className={`${styles.cardImage} ${styles.imageFront}`}
            />
            <img
              src="https://res.cloudinary.com/dnahum2gw/image/upload/v1751479176/teen2_kb7nxl.webp"
              alt="Couple therapy"
              className={`${styles.cardImage} ${styles.imageHover}`}
            />{" "}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TypesOfTherpies;
