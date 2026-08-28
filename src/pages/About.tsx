import React from 'react';
import { motion } from 'framer-motion';
import './About.css';
import aboutImg from '../assets/images/alien_skate.jpg';

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
            <p>
              Born in Nigeria in 2024, GREEN LIFESTYLE BRAND is a luxury street-fashion label built for those who aren’t afraid to stand out.
            </p>
            <p>
              Founded by OKEREKE RAPHAEL IKECHUKWU, a proud Nigerian, fashion lover, and visionary, GREEN LIFESTYLE was created from one simple belief:
            </p>
            <h2>Fashion should never be BORING.</h2>
            <p>
              From statement tees and jerseys to two-piece sets, tank tops, socks, and more, we blend street culture, luxury, comfort, and individuality into pieces made to turn heads.
            </p>
            <p>
              We’re not here to follow trends.<br />
              We’re here to create our own.
            </p>
            <p>
              <strong>Rooted in Nigeria. Inspired by the world.</strong>
            </p>
            <p>GREEN LIFESTYLE —</p>
          </div>
          <div className="about-image-container">
            <img src={aboutImg} alt="Sustainable Fashion" className="about-image" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
