import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Mail, Send } from 'lucide-react';
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
              <Truck size={28} />
            </div>
            <div>
              <h3>We deliver nationwide</h3>
              <p>Fast and reliable delivery across the country.</p>
            </div>
          </div>
          
          <div className="info-card">
            <div className="info-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
                <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/>
              </svg>
            </div>
            <div>
              <h3>WhatsApp</h3>
              <p>
                <a 
                  href="https://wa.me/+2347032700774?text=Hello%20Green%20Lifestyle,%20I'm%20interested%20in%20your%20products!" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  Message us on WhatsApp
                </a>
                <br/>Available 24/7
              </p>
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
