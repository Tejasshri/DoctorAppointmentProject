import React from "react";
import styles from "./index.module.css";
import { MdAccessTime } from "react-icons/md";
import { MdOutlinePayment } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";
import { FaSmile } from "react-icons/fa";

const steps = [
  {
    id: 1,
    title: "Choose Your Time",
    description:
      "Select a convenient time that works best for your schedule and lifestyle.",
    icon: <MdAccessTime />,
  },
  {
    id: 2,
    title: "Make Payment",
    description: "Secure your session by making a quick and easy payment.",
    icon: <MdOutlinePayment />,
  },
  {
    id: 3,
    title: "Get Matched to a Therapist",
    description:
      "Our system pairs you with therapists who specialize in your specific needs.",
    icon: <FaUserFriends />,
  },
  {
    id: 4,
    title: "Connect Securely",
    description:
      "Meet with your therapist through our secure and private virtual platform.",
    icon: <MdOutlineSecurity />,
  },
  {
    id: 5,
    title: "Continue Your Healing Journey",
    description:
      "Work with your therapist to develop strategies for long-term growth and healing.",
    icon: <FaSmile   />,
  },
];

const HowItWorks = () => {
  return (
    <div className={styles.wrapper}>
      <h2 data-aos="zoom-in-right" className={styles.title}>Tell Us About Yourself</h2>
      <p data-aos="zoom-in-left" className={styles.subtitle}>
        Begin your healing journey with us. We're here to connect you with the
        right therapist who understands your unique needs.
      </p>

      <div className={styles.stepsGrid}>
        {steps.map((step) => (
          <div data-aos="zoom-in" key={step.id} className={styles.stepCard}>
            <div className={styles.badge}>{step.id}</div>
            <div className={styles.icon}>{step.icon}</div>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepDesc}>{step.description}</p>
          </div>
        ))}
      </div>

      <button className={styles.button}>Start Your Journey Today</button>
    </div>
  );
};

export default HowItWorks;
