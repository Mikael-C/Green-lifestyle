import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ChevronLeft, CreditCard, Truck, Lock } from 'lucide-react';
import './Checkout.css';

type Step = 'cart' | 'shipping' | 'payment' | 'success';

export const Checkout: React.FC = () => {
  const { items, totalPrice, clearCart, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('cart');
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '',
    cardNumber: '', cardName: '', expiry: '', cvv: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOrder = () => {
    setStep('success');
    clearCart();
  };

  const steps = ['cart', 'shipping', 'payment'];

  return (
    <div className="checkout-page">
      {step !== 'success' && (
        <div className="checkout-progress">
          {steps.map((s, i) => (
            <div key={s} className={`progress-step ${step === s ? 'active' : steps.indexOf(step) > i ? 'done' : ''}`}>
              <div className="progress-circle">{steps.indexOf(step) > i ? '✓' : i + 1}</div>
              <span>{s.charAt(0).toUpperCase() + s.slice(1)}</span>
              {i < steps.length - 1 && <div className="progress-line" />}
            </div>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">

        {/* ── CART REVIEW ── */}
        {step === 'cart' && (
          <motion.div key="cart" className="checkout-content" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
            <div className="checkout-main">
              <h2>Review Your Order</h2>
              {items.length === 0 ? (
                <div className="checkout-empty">
                  <p>Your cart is empty.</p>
                  <button className="btn-green" onClick={() => navigate('/products')}>Shop Now</button>
                </div>
              ) : (
                <div className="checkout-items">
                  {items.map(item => (
                    <div key={item.id} className="co-item">
                      <img src={item.image} alt={item.name} className="co-item-img" />
                      <div className="co-item-info">
                        <p className="co-item-name">{item.name}</p>
                        <div className="co-item-meta">
                          <span className="co-swatch" style={{ backgroundColor: item.color }} />
                          <span className="co-size">{item.size}</span>
                        </div>
                        <div className="co-qty-row">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><span>−</span></button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><span>+</span></button>
                          <button className="co-remove" onClick={() => removeItem(item.id)}>Remove</button>
                        </div>
                      </div>
                      <p className="co-item-price">₦{(item.price * item.quantity).toLocaleString('en-NG', { minimumFractionDigits: 2 })}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {items.length > 0 && (
              <div className="checkout-summary">
                <OrderSummary total={totalPrice} />
                <button className="btn-green" onClick={() => setStep('shipping')}>
                  Continue to Shipping
                </button>
                <button className="btn-ghost" onClick={() => navigate('/products')}>
                  <ChevronLeft size={14} /> Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* ── SHIPPING ── */}
        {step === 'shipping' && (
          <motion.div key="shipping" className="checkout-content" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
            <div className="checkout-main">
              <h2><Truck size={20} /> Shipping Details</h2>
              <div className="form-grid">
                {[
                  { name: 'firstName', label: 'First Name', placeholder: 'John' },
                  { name: 'lastName', label: 'Last Name', placeholder: 'Doe' },
                  { name: 'email', label: 'Email Address', placeholder: 'john@example.com' },
                  { name: 'phone', label: 'Phone Number', placeholder: '+234 000 000 0000' },
                  { name: 'address', label: 'Street Address', placeholder: '12 Eco Street' },
                  { name: 'city', label: 'City', placeholder: 'Lagos' },
                  { name: 'state', label: 'State', placeholder: 'Lagos State' },
                  { name: 'zip', label: 'ZIP / Postal Code', placeholder: '100001' },
                ].map(f => (
                  <div key={f.name} className={`form-group ${f.name === 'address' || f.name === 'email' || f.name === 'phone' ? 'full' : ''}`}>
                    <label htmlFor={f.name}>{f.label}</label>
                    <input id={f.name} name={f.name} placeholder={f.placeholder} value={(form as any)[f.name]} onChange={handleChange} />
                  </div>
                ))}
              </div>
            </div>
            <div className="checkout-summary">
              <OrderSummary total={totalPrice} />
              <button className="btn-green" onClick={() => setStep('payment')}>Continue to Payment</button>
              <button className="btn-ghost" onClick={() => setStep('cart')}><ChevronLeft size={14} /> Back to Cart</button>
            </div>
          </motion.div>
        )}

        {/* ── PAYMENT ── */}
        {step === 'payment' && (
          <motion.div key="payment" className="checkout-content" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
            <div className="checkout-main">
              <h2><CreditCard size={20} /> Payment</h2>
              <div className="payment-secure-badge"><Lock size={13} /> Secured by SSL Encryption</div>
              <div className="card-visual">
                <div className="card-chip" />
                <p className="card-number-display">{form.cardNumber || '•••• •••• •••• ••••'}</p>
                <div className="card-bottom">
                  <span>{form.cardName || 'CARD HOLDER'}</span>
                  <span>{form.expiry || 'MM/YY'}</span>
                </div>
              </div>
              <div className="form-grid">
                {[
                  { name: 'cardNumber', label: 'Card Number', placeholder: '1234 5678 9012 3456', full: true },
                  { name: 'cardName', label: 'Name on Card', placeholder: 'John Doe', full: true },
                  { name: 'expiry', label: 'Expiry Date', placeholder: 'MM/YY', full: false },
                  { name: 'cvv', label: 'CVV', placeholder: '•••', full: false },
                ].map(f => (
                  <div key={f.name} className={`form-group ${f.full ? 'full' : ''}`}>
                    <label htmlFor={f.name}>{f.label}</label>
                    <input id={f.name} name={f.name} placeholder={f.placeholder} value={(form as any)[f.name]} onChange={handleChange} maxLength={f.name === 'cvv' ? 3 : undefined} />
                  </div>
                ))}
              </div>
            </div>
            <div className="checkout-summary">
              <OrderSummary total={totalPrice} />
              <button className="btn-green" onClick={handleOrder}>
                <Lock size={14} /> Place Order — ₦{totalPrice.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
              </button>
              <button className="btn-ghost" onClick={() => setStep('shipping')}><ChevronLeft size={14} /> Back to Shipping</button>
            </div>
          </motion.div>
        )}

        {/* ── SUCCESS ── */}
        {step === 'success' && (
          <motion.div key="success" className="checkout-success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}>
              <CheckCircle size={80} strokeWidth={1.5} color="#10B981" />
            </motion.div>
            <h2>Order Confirmed! 🎉</h2>
            <p>Thank you for shopping with Green Lifestyle. Your eco-friendly order is on its way!</p>
            <div className="success-details">
              <div><span>Order ID</span><strong>#GL{Date.now().toString().slice(-6)}</strong></div>
              <div><span>Delivery</span><strong>3–5 Business Days</strong></div>
            </div>
            <button className="btn-green" onClick={() => navigate('/')}>Back to Home</button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

const OrderSummary: React.FC<{ total: number }> = ({ total }) => {
  const shipping = total > 50000 ? 0 : 2500;
  const grandTotal = total + shipping;
  return (
    <div className="order-summary">
      <h3>Order Summary</h3>
      <div className="summary-row"><span>Subtotal</span><span>₦{total.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</span></div>
      <div className="summary-row"><span>Shipping</span><span>{shipping === 0 ? <span className="free-ship">FREE</span> : `₦${shipping.toLocaleString('en-NG')}`}</span></div>
      <div className="summary-row total"><span>Total</span><span>₦{grandTotal.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</span></div>
    </div>
  );
};
