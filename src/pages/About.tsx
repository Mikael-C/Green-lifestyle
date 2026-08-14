import React from 'react';
import { motion } from 'framer-motion';
import './About.css';
import aboutImg from '../assets/images/IMG_2417.png';

export const About: React.FC = () => {
  return (
    <div className="about-page">
      <div className="container">
        <motion.div 
          className="about-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="about-text">
            <h1>Our <span className="highlight-green">Story</span></h1>
            <h2>Fashion that doesn't cost the Earth.</h2>
            <p>
              Green Lifestyle was born out of a simple idea: fashion should be beautiful, sustainable, and accessible. We believe that looking good shouldn't come at the expense of our planet.
            </p>
            <p>
              Founded in 2023, we set out to create a clothing line that respects the environment and the people who make it. From sourcing organic and recycled materials to ensuring fair wages in our supply chain, every decision we make is guided by our commitment to sustainability.
            </p>
            <p>
              Join us in our mission to change the fashion industry for the better. Embrace the Green Lifestyle.
            </p>
          </div>
          <div className="about-image-container">
            <img src={aboutImg} alt="Sustainable Fashion" className="about-image" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
