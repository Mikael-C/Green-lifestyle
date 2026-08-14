import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, CreditCard } from 'lucide-react';
import './ProductCard.css';

interface ProductCardProps {
  id: string | number;
  image: string;
  name: string;
  price: number;
  delay?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ image, name, price, delay = 0 }) => {
  return (
    <motion.div 
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
    >
      <div className="product-image-container">
        <img src={image} alt={name} className="product-image" loading="lazy" />
        <div className="product-actions-overlay">
          <button className="action-btn add-cart" title="Add to Cart">
            <ShoppingCart size={18} />
          </button>
          <button className="action-btn buy-now" title="Buy Now">
            <CreditCard size={18} />
          </button>
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <p className="product-price">${price.toFixed(2)}</p>
      </div>
    </motion.div>
  );
};
