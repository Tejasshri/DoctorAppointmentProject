import React, { useEffect, useRef, useState } from "react";
import "./index.css"; // Import your styles here

const contentData = [
  {
    label: "Instant Access",
    image:
      "https://res.cloudinary.com/dnahum2gw/image/upload/v1751707517/Group_1171275192_1_dgmbdo.png",
    title: "Why DrPsych Is Different – Instant Access",
    points: [
      "On-Demand Support: Book a therapist instantly, no waiting required",
      "24/7 Availability: Sessions even during nights and weekends",
      "Crisis-Ready: Access help when you need it most",
      "Fast Relief: Immediate support, no long appointment delays",
    ],
  },
  {
    label: "Smart & Secure",
    image:
      "https://res.cloudinary.com/dnahum2gw/image/upload/v1751707515/Group_1171275168_2_e1zpno.jpg",
    title: "Why DrPsych Is Different – Smart & Secure",
    points: [
      "Intelligent Matching: Get paired with the right specialist using AI",
      "Confidential Platform: End-to-end encrypted sessions",
      "Multilingual Care: Support available in your preferred language",
      "Private by Design: Your identity and records are always protected",
    ],
  },
  {
    label: "Built for Real Life",
    image:
      "https://res.cloudinary.com/dnahum2gw/image/upload/v1751707515/Group_1171275191_1_pxmsag.png",
    title: "Why DrPsych Is Different – Built for Real Life",
    points: [
      "Fully Virtual: Therapy that fits your schedule and lifestyle",
      "Accessible to All: Affordable sessions with flexible pricing",
      "For Everyone: Individuals, families, students, and companies",
      "Real Impact: Measurable improvement in emotional wellbeing",
    ],
  },
];


const WhyDrPsych = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const intervalRef = useRef(null);

  const handleImageChange = (index) => {
    clearInterval(intervalRef.current); // Stop auto-rotation
    setImgIndex(index);
  };

  // Auto-rotate logic
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % contentData.length);
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const currentData = contentData[imgIndex];

  return (
    <section data-aos="zoom-in" className="cion-model-section">
      <div className="cion-model-buttons">
        {contentData.map((item, i) => (
          <button
            key={i}
            className={`btn ${imgIndex === i ? "active" : ""}`}
            onClick={() => handleImageChange(i)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="cion-model-content">
        <div className="phone-frame">
          <img src={currentData.image} alt={`CION - ${currentData.label}`} />
        </div>
        <div className="model-info">
          <h2>{currentData.title}</h2>
          <ul>
            {currentData.points.map((point, i) => {
              const [title, desc] = point.split(":");
              return (
                <li key={i}>
                  <span>{title}:</span> {desc}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WhyDrPsych;
