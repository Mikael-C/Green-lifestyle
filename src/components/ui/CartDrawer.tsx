import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './CartDrawer.css';

export const CartDrawer: React.FC = () => {
  const { items, isCartOpen, closeCart, removeItem, updateQuantity, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            className="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="cart-drawer-header">
              <div className="cart-drawer-title">
                <ShoppingBag size={20} />
                <span>My Cart</span>
                {totalItems > 0 && <span className="cart-count-pill">{totalItems}</span>}
              </div>
              <button className="cart-close-btn" onClick={closeCart}>
                <X size={22} />
              </button>
            </div>

            {/* Items */}
            <div className="cart-items-list">
              {items.length === 0 ? (
                <div className="cart-empty">
                  <ShoppingBag size={56} strokeWidth={1} />
                  <p>Your cart is empty</p>
                  <button className="cart-browse-btn" onClick={() => { closeCart(); navigate('/products'); }}>
                    Browse Products
                  </button>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map(item => (
                    <motion.div
                      key={item.id}
                      className="cart-item"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <img src={item.image} alt={item.name} className="cart-item-img" />
                      <div className="cart-item-details">
                        <p className="cart-item-name">{item.name}</p>
                        <div className="cart-item-meta">
                          {item.color && (
                            <span className="cart-item-swatch" style={{ backgroundColor: item.color }} />
                          )}
                          <span className="cart-item-size">{item.size}</span>
                        </div>
                        <p className="cart-item-price">₦{(item.price * item.quantity).toLocaleString('en-NG', { minimumFractionDigits: 2 })}</p>
                        <div className="cart-item-qty">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <Minus size={12} />
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                      <button className="cart-item-remove" onClick={() => removeItem(item.id)}>
                        <Trash2 size={15} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="cart-drawer-footer">
                <div className="cart-subtotal">
                  <span>Subtotal</span>
                  <span className="cart-subtotal-value">₦{totalPrice.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</span>
                </div>
                <p className="cart-shipping-note">Shipping & taxes calculated at checkout</p>
                <button className="cart-checkout-btn" onClick={handleCheckout}>
                  Proceed to Checkout <ArrowRight size={16} />
                </button>
                <button className="cart-continue-btn" onClick={closeCart}>
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
