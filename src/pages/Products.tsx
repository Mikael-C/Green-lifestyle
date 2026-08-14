import React from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '../components/ui/ProductCard';
import './Products.css';

// Import all images
import img2403 from '../assets/images/IMG_2403.png';
import img2404 from '../assets/images/IMG_2404.png';
import img2405 from '../assets/images/IMG_2405.png';
import img2406 from '../assets/images/IMG_2406.png';
import img2407 from '../assets/images/IMG_2407.png';
import img2408 from '../assets/images/IMG_2408.jpeg';
import img2409 from '../assets/images/IMG_2409.png';
import img2410 from '../assets/images/IMG_2410.jpeg';
import img2411 from '../assets/images/IMG_2411.jpeg';
import img2412 from '../assets/images/IMG_2412.jpeg';
import img2413 from '../assets/images/IMG_2413.jpeg';
import img2415 from '../assets/images/IMG_2415.jpeg';
import img2416 from '../assets/images/IMG_2416.jpeg';
import img2417 from '../assets/images/IMG_2417.png';
import img2418 from '../assets/images/IMG_2418.png';
import img2424 from '../assets/images/IMG_2424.jpeg';

const allProducts = [
  { id: 1, name: 'Eco Green Dress', price: 120.00, image: img2403 },
  { id: 2, name: 'Sustainable Jacket', price: 180.00, image: img2404 },
  { id: 3, name: 'Organic Cotton Top', price: 65.00, image: img2405 },
  { id: 4, name: 'Recycled Fiber Pants', price: 95.00, image: img2406 },
  { id: 5, name: 'Classic Green Tee', price: 45.00, image: img2407 },
  { id: 6, name: 'Hemp Knit Sweater', price: 110.00, image: img2408 },
  { id: 7, name: 'Bamboo Lounge Wear', price: 85.00, image: img2409 },
  { id: 8, name: 'Earth-Tone Skirt', price: 75.00, image: img2410 },
  { id: 9, name: 'Vegan Leather Bag', price: 150.00, image: img2411 },
  { id: 10, name: 'Eco-Friendly Shoes', price: 130.00, image: img2412 },
  { id: 11, name: 'Upcycled Denim', price: 105.00, image: img2413 },
  { id: 12, name: 'Nature Inspired Coat', price: 210.00, image: img2415 },
  { id: 13, name: 'Green Pattern Scarf', price: 35.00, image: img2416 },
  { id: 14, name: 'Organic Linen Shirt', price: 80.00, image: img2417 },
  { id: 15, name: 'Sustainable Shorts', price: 55.00, image: img2418 },
  { id: 16, name: 'Eco Activewear', price: 90.00, image: img2424 },
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
            />
          ))}
        </div>
      </div>
    </div>
  );
};
