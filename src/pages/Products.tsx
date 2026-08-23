import React from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '../components/ui/ProductCard';
import './Products.css';

// Import all images
import prod1 from '../assets/images/prod1.jpeg';
import prod2 from '../assets/images/prod2.jpeg';
import prod3 from '../assets/images/prod3.jpeg';
import prod4 from '../assets/images/prod4.jpeg';
import prod5 from '../assets/images/prod5.jpeg';
import prod6 from '../assets/images/prod6.jpeg';
import prod7 from '../assets/images/prod7.jpeg';
import prod8 from '../assets/images/prod8.jpeg';
import prod9 from '../assets/images/prod9.jpeg';
import img2412 from '../assets/images/IMG_2412.jpeg';
import img2413 from '../assets/images/IMG_2413.jpeg';
import img2415 from '../assets/images/IMG_2415.jpeg';
import img2416 from '../assets/images/IMG_2416.jpeg';
import img2417 from '../assets/images/IMG_2417.png';
import img2418 from '../assets/images/IMG_2418.png';

const allProducts = [
  { id: 1, name: 'Collective Star Tees', price: 60000.00, image: prod1 },
  { id: 2, name: 'Green Revolution Tees', price: 60000.00, image: prod2 },
  { id: 3, name: 'Galaxy Edition Tank Top', price: 65000.00, image: prod3 },
  { id: 4, name: 'Collective Star Tees', price: 60000.00, image: prod4 },
  { id: 5, name: 'Collective Star Tees', price: 60000.00, image: prod5 },
  { id: 6, name: 'GLS Exclusive Socks', price: 10000.00, image: prod6 },
  { id: 7, name: 'Bamboo Lounge Wear', price: 85.00, image: prod7 },
  { id: 8, name: 'Earth-Tone Skirt', price: 75.00, image: prod8 },
  { id: 9, name: 'Vegan Leather Bag', price: 150.00, image: prod9 },
  { id: 10, name: 'Eco-Friendly Shoes', price: 130.00, image: img2412 },
  { id: 11, name: 'Upcycled Denim', price: 105.00, image: img2413 },
  { id: 12, name: 'Nature Inspired Coat', price: 210.00, image: img2415 },
  { id: 13, name: 'Green Pattern Scarf', price: 35.00, image: img2416 },
  { id: 14, name: 'Organic Linen Shirt', price: 80.00, image: img2417, bg: 'white' },
  { id: 15, name: 'Sustainable Shorts', price: 55.00, image: img2418, bg: 'white' },
];

export const Products: React.FC = () => {
  return (
    <div className="products-page">
      <div className="products-header">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our <span className="highlight-green">Collection</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore our wide range of sustainable and eco-friendly fashion.
          </motion.p>
        </div>
      </div>
      
      <div className="container products-container">
        <div className="products-grid">
          {allProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              delay={(index % 4) * 0.1}
              bg={(product as any).bg}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
