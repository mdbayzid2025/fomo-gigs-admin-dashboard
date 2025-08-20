"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@mui/material";
import { IoIosArrowDown } from "react-icons/io";
import { MdArrowBackIosNew } from "react-icons/md";

const faqData = [
  {
    question: "What is the turnaround time for photo processing?",
    answer:
      "Typically, our AI-powered photo processing takes between 24 to 48 hours, depending on the package selected and workload.",
  },
  {
    question: "Can I customize the styles used on my photos?",
    answer:
      "Yes! Our packages include access to 200 different styles. You can select your preferred styles during the order process.",
  },
  {
    question: "What if I’m not satisfied with the results?",
    answer:
      "Customer satisfaction is our priority. If you’re unhappy with your photos, we offer revisions to ensure the final images meet your expectations.",
  },
  {
    question: "How do I add additional avatars to my order?",
    answer:
      "Additional avatars can be added for an extra fee. Please refer to our pricing section for details or contact support for assistance.",
  },
  {
    question: "Are my photos kept private and secure?",
    answer:
      "Absolutely. We take privacy seriously and ensure all photos and data are securely stored and only used for processing your order.",
  },
];

export default function Faq() {
  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="bg-white px-[5%] lg:px-0 py-20">
      <Button
        onClick={() => window.history.back()}
        sx={{
          backgroundColor: "#131927",
          color: "white",
          padding: "10px",
          width: "15px",
          marginLeft: "15px",
          ":hover": {
            backgroundColor: "#0095FF",
          },
        }}
      >
        <MdArrowBackIosNew />
      </Button>{" "}
      <div className="max-w-4xl mx-auto text-center sm:text-left mb-8">
        <p className="text-lg sm:text-3xl lg:text-4xl text-black font-semibold mb-2">
          Frequently Asked Questions
        </p>
      </div>
      <div className="max-w-4xl mx-auto">
        {faqData.map((faq, index) => (
          <Accordion
            key={index}
            expanded={expanded === faq.question}
            onChange={handleChange(faq.question)}
            sx={{
              boxShadow: "none",
              "&:before": { display: "none" },
              borderRadius: "15px", // Modify the border radius here for the entire accordion
            }}
          >
            <AccordionSummary
              expandIcon={<IoIosArrowDown className="text-lg text-white" />}
              aria-controls={`${faq.question}-content`}
              id={`${faq.question}-header`}
              sx={{
                color: expanded === faq.question ? "white" : "#131927",
                fontSize: {
                  xs: "12px",
                  md: "14px",
                  lg: "16px",
                },
                px: 2,
                borderRadius: expanded === faq.question ? "15px" : "10px", // Adjust border radius on expanded state
                background: expanded === faq.question ? "#131927" : "#64d2ff",
                transition: "background-color 0.3s ease",
              }}
            >
              <p>{faq.question}</p>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                background: "#0095FF",
                color: "#fff",
                px: 2,
                fontSize: {
                  xs: "12px",
                  md: "14px",
                  lg: "16px",
                },
                borderRadius: "10px 10px 15px 15px", // This modifies the border radius for the bottom part of the accordion details
              }}
            >
              {faq.answer}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
