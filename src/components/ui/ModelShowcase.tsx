import React from 'react';
import { motion } from 'framer-motion';
import './ModelShowcase.css';

// Import all 16 model images
import model1 from '../../assets/models/model-1.jpeg';
import model2 from '../../assets/models/model-2.jpeg';
import model3 from '../../assets/models/model-3.jpeg';
import model4 from '../../assets/models/model-4.jpeg';
import model5 from '../../assets/models/model-5.jpeg';
import model6 from '../../assets/models/model-6.jpeg';
import model7 from '../../assets/models/model-7.jpeg';
import model8 from '../../assets/models/model-8.jpeg';
import model9 from '../../assets/models/model-9.jpeg';
import model10 from '../../assets/models/model-10.jpeg';
import model11 from '../../assets/models/model-11.jpeg';
import model12 from '../../assets/models/model-12.jpeg';
import model13 from '../../assets/models/model-13.jpeg';
import model14 from '../../assets/models/model-14.jpeg';
import model15 from '../../assets/models/model-15.jpeg';
import model16 from '../../assets/models/model-16.jpeg';

const row1 = [model1, model2, model3, model4, model5, model6, model7, model8];
const row2 = [model9, model10, model11, model12, model13, model14, model15, model16];

export const ModelShowcase: React.FC = () => {
  return (
    <section className="model-showcase-section">
      <div className="container">
        <div className="model-showcase-header">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            The <span className="highlight-green">Green Lifestyle</span> Look
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Worn by our community of eco-conscious trendsetters
          </motion.p>
        </div>
      </div>

      <div className="marquee-container">
        {/* Row 1: Scrolls Left */}
        <div className="marquee-row left">
          {/* Duplicate array for seamless infinite scroll */}
          {[...row1, ...row1].map((img, index) => (
            <div key={`row1-${index}`} className="model-img-wrapper">
              <img src={img} alt={`Model ${index + 1}`} loading="lazy" />
              <div className="model-overlay">
                <span className="model-overlay-text">Explore Look</span>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: Scrolls Right */}
        <div className="marquee-row right">
          {/* Duplicate array for seamless infinite scroll */}
          {[...row2, ...row2].map((img, index) => (
            <div key={`row2-${index}`} className="model-img-wrapper">
              <img src={img} alt={`Model ${index + 9}`} loading="lazy" />
              <div className="model-overlay">
                <span className="model-overlay-text">Explore Look</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
