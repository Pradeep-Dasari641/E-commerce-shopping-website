import React from "react";
import "./About.css"; // Import your CSS file
import { motion } from "framer-motion";
import NavBar from "../NavBar/HomeNav";

const About = () => {
  return (
    <div>
      <NavBar />
      <div className="about-container">
        <motion.h1
          className="about-title"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Us
        </motion.h1>

        <div className="about-content">
          <motion.section
            className="about-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Our Mission</h2>
            <p>
              To provide the best shopping experience by connecting consumers
              with top-notch products.
            </p>
          </motion.section>

          <motion.section
            className="about-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Our Team</h2>
            <ul>
              <li>Jane Doe - CEO</li>
              <li>John Smith - CTO</li>
              <li>Emily Johnson - CMO</li>
            </ul>
          </motion.section>

          <motion.section
            className="about-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Our History</h2>
            <p>
              Founded in 2020, we have grown rapidly by focusing on customer
              satisfaction and innovation.
            </p>
          </motion.section>

          <motion.section
            className="about-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Contact Us</h2>
            <p>Email: info@example.com</p>
            <p>Phone: (123) 456-7890</p>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default About;
