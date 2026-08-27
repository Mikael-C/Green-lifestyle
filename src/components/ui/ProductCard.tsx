import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

interface ProductCardProps {
  id: string | number;
  image: string;
  backImage?: string;
  name: string;
  price: number;
  delay?: number;
  bg?: string;
  colors?: string[];
  isSoldOut?: boolean;
}

const SIZES = ['L', 'XL', 'XXL'];

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  backImage,
  name,
  price,
  delay = 0,
  bg,
  colors,
  isSoldOut = false,
}) => {
  const { addItem } = useCart();
  const [showOptions, setShowOptions] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };

    if (showOptions) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showOptions]);
  const [selectedColor, setSelectedColor] = useState(colors ? colors[0] : '');
  const [selectedSize, setSelectedSize] = useState('');
  const [added, setAdded] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const hasColors = colors && colors.length > 0;
  const isMultiColor = colors && colors.length > 1;
  const displayImage = isFlipped && backImage ? backImage : image;

  const discountedPrice = price * 0.90;

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowOptions(true);
      return;
    }
    addItem({
      productId: id,
      name,
      price: discountedPrice,
      image,
      color: hasColors ? selectedColor : undefined,
      size: selectedSize,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.div
      ref={cardRef}
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      {/* Image */}
      <div
        className={`product-image-container${backImage && !isSoldOut ? ' has-back' : ''}`}
        style={bg ? { backgroundColor: bg } : undefined}
        onMouseEnter={() => backImage && !isSoldOut && setIsFlipped(true)}
        onMouseLeave={() => backImage && !isSoldOut && setIsFlipped(false)}
        onClick={() => backImage && !isSoldOut && setIsFlipped((f) => !f)}
      >
        <div className="product-badges" style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '5px', zIndex: 2 }}>
          {isSoldOut ? (
            <span className="product-badge sold-out-badge" style={{ position: 'static', backgroundColor: '#333' }}>SOLD OUT</span>
          ) : (
            <span className="product-badge" style={{ position: 'static' }}>NEW</span>
          )}
          {!isSoldOut && <span className="product-badge discount-badge" style={{ position: 'static', backgroundColor: '#e74c3c' }}>-10%</span>}
        </div>
        <motion.img
          key={displayImage}
          src={displayImage}
          alt={name}
          className="product-image"
          loading="lazy"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{ opacity: isSoldOut ? 0.6 : 1, filter: isSoldOut ? 'grayscale(0.5)' : 'none' }}
        />
        {backImage && !isSoldOut && (
          <span className="image-flip-hint">
            {isFlipped ? 'Front' : 'Back'}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <div className="product-price-container" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
          <p className="product-price original-price" style={{ textDecoration: 'line-through', color: '#999', fontSize: '0.9em', margin: 0 }}>
            ₦{price.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
          </p>
          <p className="product-price discounted-price" style={{ color: '#10B981', fontWeight: 'bold', margin: 0 }}>
            ₦{discountedPrice.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
          </p>
        </div>

        {/* Options panel */}
        <AnimatePresence>
          {showOptions && !isSoldOut && (
            <motion.div
              className="product-options"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
            >
              {/* Color row — always shown when colors exist */}
              {hasColors && (
                <div className="options-row">
                  <span className="options-label">Color</span>
                  <div className="color-swatches">
                    {colors!.map((c) => (
                      <button
                        key={c}
                        className={`color-swatch ${selectedColor === c ? 'selected' : ''} ${!isMultiColor ? 'single' : ''}`}
                        style={{ backgroundColor: c }}
                        onClick={() => isMultiColor && setSelectedColor(c)}
                        aria-label={c}
                        // If only one color, it is always "selected" — no pointer needed
                        tabIndex={isMultiColor ? 0 : -1}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              <div className="options-row">
                <span className="options-label">Size</span>
                <div className="size-swatches">
                  {SIZES.map((s) => (
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
          whileTap={isSoldOut ? undefined : { scale: 0.96 }}
          disabled={isSoldOut}
          style={{ opacity: isSoldOut ? 0.6 : 1, cursor: isSoldOut ? 'not-allowed' : 'pointer' }}
        >
          {isSoldOut
            ? 'Sold Out'
            : added
            ? '✓ Added!'
            : showOptions && !selectedSize
            ? 'Select Size →'
            : 'Add to Cart'}
        </motion.button>
      </div>
    </motion.div>
  );
};
