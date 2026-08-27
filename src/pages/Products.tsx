import React from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '../components/ui/ProductCard';
import './Products.css';

// Import all images
import prod1 from '../assets/images/prod1.jpeg';
import prod2 from '../assets/images/prod2.jpeg';
import prod3 from '../assets/images/prod3.jpeg';
import prod4 from '../assets/images/prod4.jpeg';
import prod6 from '../assets/images/prod6.jpeg';
import prod7 from '../assets/images/prod7.jpeg';
import prod8 from '../assets/images/prod8.jpeg';
import prod9 from '../assets/images/prod9.jpeg';
import img2416 from '../assets/images/IMG_2416.jpeg';
import img2417 from '../assets/images/IMG_2417.png';
import img2418 from '../assets/images/IMG_2418.png';

// Chain Tee images
import chainFront from '../assets/images/prod_chain_front.jpg';
import crosshairBack from '../assets/images/prod_crosshair_back.jpg';

// Alien Lux images
import alienLuxBlackFront from '../assets/images/alien_lux_black_front.jpg';
import alienLuxWhiteFront from '../assets/images/alien_lux_white_front.jpg';
import alienLuxWhiteBack from '../assets/images/alien_lux_white_back.jpg';
import alienLuxBlackBack from '../assets/images/alien_lux_black_back.jpg';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  backImage?: string;
  bg?: string;
  colors?: string[];
}

const allProducts: Product[] = [
  // Collective Star Tees — white (prod1) & black (prod4)
  { id: 1,  name: 'Collective Star Tees',    price: 60000.00, image: prod1, colors: ['#FFFFFF'] },
  { id: 4,  name: 'Collective Star Tees',    price: 60000.00, image: prod4, colors: ['#111111'] },

  // Green Revolution Tees — black (prod2) & white (prod8)
  { id: 2,  name: 'Green Revolution Tees',   price: 60000.00, image: prod2, colors: ['#111111'] },
  { id: 8,  name: 'Green Revolution Tees',   price: 60000.00, image: prod8, colors: ['#FFFFFF'] },

  // Galaxy Edition Tank Top — black (prod3) & white (prod7)
  { id: 3,  name: 'Galaxy Edition Tank Top', price: 65000.00, image: prod3, colors: ['#111111'] },
  { id: 7,  name: 'Galaxy Edition Tank Top', price: 65000.00, image: prod7, colors: ['#FFFFFF'] },

  // Chain Tee — white
  { id: 16, name: 'Green Lifestyle Chain Tee', price: 45000.00, image: chainFront, backImage: crosshairBack, bg: 'white', colors: ['#FFFFFF'] },

  // Alien Lux — black & white variants (separate cards)
  { id: 17, name: 'Alien Lux', price: 45000.00, image: alienLuxBlackFront, backImage: alienLuxBlackBack, colors: ['#111111'] },
  { id: 18, name: 'Alien Lux', price: 45000.00, image: alienLuxWhiteFront, backImage: alienLuxWhiteBack, bg: 'white', colors: ['#FFFFFF'] },

  // GLS Exclusive Socks — black (prod6) & white (prod9)
  { id: 6,  name: 'GLS Exclusive Socks',     price: 10000.00, image: prod6, colors: ['#111111'] },
  { id: 9,  name: 'GLS Exclusive Socks',     price: 10000.00, image: prod9, colors: ['#FFFFFF'] },



  // Zero Panic Tees — black
  { id: 13, name: 'Zero Panic Tees',         price: 60000.00, image: img2416, colors: ['#111111'], isSoldOut: true },

  // Green Lifestyle Tank Top — white (img2417) & black (img2418)
  { id: 14, name: 'Green Lifestyle Tank Top', price: 25000.00, image: img2417, bg: 'white', colors: ['#FFFFFF'] },
  { id: 15, name: 'Green Lifestyle Tank Top', price: 25000.00, image: img2418, colors: ['#111111'], isSoldOut: true },
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
              backImage={product.backImage}
              delay={(index % 4) * 0.1}
              bg={product.bg}
              colors={product.colors}
              isSoldOut={product.isSoldOut}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
