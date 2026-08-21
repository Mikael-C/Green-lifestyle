import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

interface ProductCardProps {
  id: string | number;
  image: string;
  name: string;
  price: number;
  delay?: number;
  bg?: string;
}

const COLORS = ['#111111', '#10B981', '#4B5563', '#D97706', '#EF4444', '#FFFFFF'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const ProductCard: React.FC<ProductCardProps> = ({ id, image, name, price, delay = 0, bg }) => {
  const { addItem } = useCart();
  const [showOptions, setShowOptions] = useState(false);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedSize, setSelectedSize] = useState('');
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowOptions(true);
      return;
    }
    addItem({ productId: id, name, price, image, color: selectedColor, size: selectedSize });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.div
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      {/* Image */}
      <div className="product-image-container" style={bg ? { backgroundColor: bg } : undefined}>
        <span className="product-badge">NEW</span>
        <img src={image} alt={name} className="product-image" loading="lazy" />
      </div>

      {/* Info */}
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <p className="product-price">₦{price.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</p>

        {/* Color & Size options */}
        <AnimatePresence>
          {showOptions && (
            <motion.div
              className="product-options"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
            >
              {/* Colors */}
              <div className="options-row">
                <span className="options-label">Color</span>
                <div className="color-swatches">
                  {COLORS.map(c => (
                    <button
                      key={c}
                      className={`color-swatch ${selectedColor === c ? 'selected' : ''}`}
                      style={{ backgroundColor: c }}
                      onClick={() => setSelectedColor(c)}
                      aria-label={c}
                    />
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="options-row">
                <span className="options-label">Size</span>
                <div className="size-swatches">
                  {SIZES.map(s => (
                    <button
                      key={s}
                      className={`size-swatch ${selectedSize === s ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add to Cart Button */}
        <motion.button
          className={`add-to-cart-btn ${added ? 'added' : ''}`}
          onClick={handleAddToCart}
          whileTap={{ scale: 0.96 }}
        >
          {added ? '✓ Added!' : showOptions && !selectedSize ? 'Select Size →' : 'Add to Cart'}
        </motion.button>
      </div>
    </motion.div>
  );
};
