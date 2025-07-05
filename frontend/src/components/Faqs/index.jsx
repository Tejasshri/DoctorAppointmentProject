import React, { useState } from "react";
import "./index.css"; // assuming you save styles as Faqs.css
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

const faqs = [
  {
    question:
      "What types of mental health professionals are available on DrPsych?",
    answer:
      "DrPsych connects you with licensed psychologists, psychiatrists, and counselors who specialize in areas like anxiety, depression, stress, trauma, and relationships.",
  },
  {
    question: "Can I access therapy sessions online with DrPsych?",
    answer:
      "Yes. DrPsych offers secure, video-based therapy and psychiatric consultations that you can attend from the comfort of your home.",
  },
  {
    question: "How is DrPsych different from other therapy platforms?",
    answer:
      "DrPsych offers holistic care with expert-vetted professionals, affordable plans, confidentiality, and a stigma-free support environment across India.",
  },
  {
    question: "Do you offer psychiatric consultations with medication support?",
    answer:
      "Yes, DrPsych provides access to certified psychiatrists who can assess, diagnose, and prescribe medication when needed — all online.",
  },
  {
    question: "How can I start my therapy journey on DrPsych?",
    answer:
      "You can start by booking a session, filling a quick mental health intake form, and choosing a therapist based on your preferences and goals.",
  },
  {
    question: "Is my data safe and confidential with DrPsych?",
    answer:
      "Absolutely. DrPsych uses encrypted platforms to ensure all personal information and session details remain private and secure.",
  },
  {
    question: "Does DrPsych provide therapy for teenagers and young adults?",
    answer:
      "Yes, we offer specialized therapy for teens, guided by psychologists trained in adolescent and young adult mental health.",
  },
  {
    question: "How much does therapy cost on DrPsych?",
    answer:
      "DrPsych offers flexible pricing, with one-time session rates and discounted subscription plans to make quality mental health care affordable.",
  },
];

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  const half = Math.ceil(faqs.length / 2);
  const firstCol = faqs.slice(0, half);
  const secondCol = faqs.slice(half);

  const renderColumn = (items, offset = 0) =>
    items.map((faq, i) => {
      const index = i + offset;
      const isOpen = openIndex === index;

      return (
        <div className={`accordion-item ${isOpen ? "open" : ""}`} key={index}>
          <div className="accordion-title" onClick={() => handleToggle(index)}>
            <p>{faq.question}</p>
            <span className="arrow">
              {isOpen ? <FaAngleDown /> : <FaAngleUp />}
            </span>
          </div>
          <div className="accordion-content">{faq.answer}</div>
        </div>
      );
    });

  return (
    <div className="faqs-container">
      <h2 className="faqs-title">Frequently Asked Questions</h2>
      <div className="accordion-main-container">
        <div className="accordion">{renderColumn(firstCol, 0)}</div>
        <div className="accordion">{renderColumn(secondCol, half)}</div>
      </div>
    </div>
  );
};

export default Faqs;
