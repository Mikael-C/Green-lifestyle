import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Heart, Share2, ArrowRight } from 'lucide-react';
import './Footer.css';
import logo2 from '../../assets/images/logo2.jpeg';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src={logo2} alt="Green Lifestyle" className="footer-logo" />
            <p>Pioneering sustainable fashion. Look good while doing good for the planet with our green lifestyle collections.</p>
            <div className="social-links">
              <a href="#" aria-label="Globe"><Globe size={20} /></a>
              <a href="#" aria-label="Heart"><Heart size={20} /></a>
              <a href="#" aria-label="Share"><Share2 size={20} /></a>
            </div>
          </div>
          
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Shop</Link></li>
              <li><Link to="/about">Our Story</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h3>Customer Care</h3>
            <ul>
              <li><Link to="#">FAQ</Link></li>
              <li><Link to="#">Shipping & Returns</Link></li>
              <li><Link to="#">Size Guide</Link></li>
              <li><Link to="#">Track Order</Link></li>
            </ul>
          </div>

          <div className="footer-newsletter">
            <h3>Join our Newsletter</h3>
            <p>Get the latest updates on sustainable fashion.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email address" required />
              <button type="submit" aria-label="Subscribe">
                <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Green Lifestyle. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
