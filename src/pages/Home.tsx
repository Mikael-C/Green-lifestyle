import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ProductCard } from '../components/ui/ProductCard';
import { ModelShowcase } from '../components/ui/ModelShowcase';
import './Home.css';

// Import images for featured products and banner
import videoFile from '../assets/images/video.mp4';
import sliderImage from '../assets/images/slider.jpeg';

// Trending Now — matching products page
import chainFront from '../assets/images/prod_chain_front.jpg';
import alienLuxBlackFront from '../assets/images/alien_lux_black_front.jpg';
import alienLuxWhiteFront from '../assets/images/alien_lux_white_front.jpg';
import prod1 from '../assets/images/prod1.jpeg';

// Trending Now — back images for hover flip
import crosshairBack from '../assets/images/prod_crosshair_back.jpg';
import alienLuxBlackBack from '../assets/images/alien_lux_black_back.jpg';
import alienLuxWhiteBack from '../assets/images/alien_lux_white_back.jpg';

const featuredProducts = [
  { id: 16, name: 'Green Lifestyle Chain Tee', price: 60000.00, image: chainFront, backImage: crosshairBack, bg: 'white', colors: ['#FFFFFF'] },
  { id: 17, name: 'Alien Lux',                 price: 60000.00, image: alienLuxBlackFront, backImage: alienLuxBlackBack, colors: ['#111111'] },
  { id: 18, name: 'Alien Lux',                 price: 60000.00, image: alienLuxWhiteFront, backImage: alienLuxWhiteBack, bg: 'white', colors: ['#FFFFFF'] },
  { id: 1,  name: 'Collective Star Tees',      price: 60000.00, image: prod1, colors: ['#FFFFFF'] },
];

const heroSlides = [
  { type: 'video', src: videoFile },
  { type: 'image', src: sliderImage }
];

export const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000); // Change slide every 6 seconds to give video time
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home-page">
      {/* Hero Banner Slider */}
      <section className="hero-section">
        <AnimatePresence mode="popLayout">
          {heroSlides[currentSlide].type === 'video' ? (
            <motion.video
              key={`video-${currentSlide}`}
              className="hero-media"
              src={heroSlides[currentSlide].src}
              autoPlay
              muted
              loop
              playsInline
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          ) : (
            <motion.div
              key={`image-${currentSlide}`}
              className="hero-media"
              style={{ backgroundImage: `url(${heroSlides[currentSlide].src})` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          )}
        </AnimatePresence>
        {/* We need an overlay that sits on top of either the video or image */}
        <div className="hero-overlay" style={{ zIndex: 1, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}></div>
        <div className="container hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hero-text"
          >
            <h1>Embrace the <span className="highlight-green">Green Lifestyle</span></h1>
            <p>Discover our exclusive sustainable fashion collection designed for the modern, eco-conscious individual. Look great while protecting our planet.</p>
            <div className="hero-buttons">
              <Link to="/products">
                <Button size="lg">Shop Collection</Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="btn-white-outline">Our Story</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Model Showcase */}
      <ModelShowcase />

      {/* Featured Products */}
      <section className="featured-section container">
        <div className="section-header">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Trending <span className="highlight-green">Now</span>
          </motion.h2>
          <Link to="/products" className="view-all-link">View All Products &rarr;</Link>
        </div>
        
        <div className="product-grid">
          {featuredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              backImage={(product as any).backImage}
              bg={(product as any).bg}
              colors={(product as any).colors}
              delay={index * 0.1}
            />
          ))}
        </div>
      </section>

      {/* Value Proposition */}
      <section className="values-section">
        <div className="container">
          <div className="values-grid">
            <motion.div 
              className="value-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="value-icon">🌿</div>
              <h3>100% Organic</h3>
              <p>All our materials are sourced from certified organic farms, ensuring no harmful chemicals touch your skin.</p>
            </motion.div>
            <motion.div 
              className="value-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="value-icon">♻️</div>
              <h3>Recycled Packaging</h3>
              <p>We use 100% recycled and biodegradable packaging for every order to minimize our carbon footprint.</p>
            </motion.div>
            <motion.div 
              className="value-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="value-icon">🤝</div>
              <h3>Fair Trade</h3>
              <p>We ensure fair wages and safe working conditions for everyone involved in creating our garments.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
