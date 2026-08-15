import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, CreditCard } from 'lucide-react';
import './ProductCard.css';

interface ProductCardProps {
  id: string | number;
  image: string;
  name: string;
  price: number;
  color?: string;
  delay?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ image, name, price, color = "Green", delay = 0 }) => {
  return (
    <motion.div 
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="product-image-container">
        <span className="product-badge">NEW</span>
        <img src={image} alt={name} className="product-image" loading="lazy" />
        <button className="add-btn" aria-label="Add to cart">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <p className="product-color">{color}</p>
        <p className="product-price">₦{price.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</p>
      </div>
    </motion.div>
  );
};
