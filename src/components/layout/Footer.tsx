import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Footer.css';
import logo2 from '../../assets/images/logo2.png';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src={logo2} alt="Green Lifestyle" className="footer-logo" />
            <p>Pioneering sustainable fashion. Look good while doing good for the planet with our green lifestyle collections.</p>
            <div className="social-links">
              <a href="https://www.instagram.com/gre_en_lifestyle?igsi=ZzZ6MTAxcWY3OXJw" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@green_lifestyle7?_r=1&_t=ZS-99BgWXzkmjl" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
                </svg>
              </a>
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
