import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { Button } from '../components/ui/Button';
import './Contact.css';

export const Contact: React.FC = () => {
  return (
    <div className="contact-page container">
      <motion.div 
        className="contact-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Get in <span className="highlight-green">Touch</span></h1>
        <p>We'd love to hear from you. Reach out with any questions or feedback.</p>
      </motion.div>

      <div className="contact-content">
        <motion.div 
          className="contact-info"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="info-card">
            <div className="info-icon">
              <MapPin size={28} />
            </div>
            <div>
              <h3>Visit Us</h3>
              <p>123 Green Avenue, Eco District<br/>New York, NY 10001</p>
            </div>
          </div>
          
          <div className="info-card">
            <div className="info-icon">
              <Phone size={28} />
            </div>
            <div>
              <h3>Call Us</h3>
              <p>+1 (555) 123-4567<br/>Mon-Fri from 9am to 6pm</p>
            </div>
          </div>
          
          <div className="info-card">
            <div className="info-icon">
              <Mail size={28} />
            </div>
            <div>
              <h3>Email Us</h3>
              <p>hello@greenlifestyle.com<br/>support@greenlifestyle.com</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="contact-form-container glass"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" placeholder="John Doe" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" placeholder="john@example.com" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" placeholder="How can we help?" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows={5} placeholder="Your message here..." required></textarea>
            </div>
            
            <Button type="submit" className="submit-btn" size="lg">
              Send Message <Send size={18} style={{ marginLeft: '8px' }} />
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
