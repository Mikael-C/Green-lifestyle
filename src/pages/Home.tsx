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
import feat1 from '../assets/images/IMG_2403.png';
import feat2 from '../assets/images/IMG_2404.png';
import feat3 from '../assets/images/IMG_2405.png';
import feat4 from '../assets/images/IMG_2406.png';

const featuredProducts = [
  { id: 1, name: 'Eco Green Dress', price: 120.00, image: feat1 },
  { id: 2, name: 'Sustainable Jacket', price: 180.00, image: feat2 },
  { id: 3, name: 'Organic Cotton Top', price: 65.00, image: feat3 },
  { id: 4, name: 'Recycled Fiber Pants', price: 95.00, image: feat4 },
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
