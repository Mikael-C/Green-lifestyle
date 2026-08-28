import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ChevronLeft, CreditCard, Truck, Lock, Globe } from 'lucide-react';
import { PaystackButton } from 'react-paystack';
import './Checkout.css';

type Step = 'cart' | 'shipping' | 'payment' | 'success';

const WHATSAPP_NUMBER = '2347032700774';
const NIGERIA_SHIPPING = 5000;

const hasAddress = (form: { address: string; city: string; state: string }) =>
  form.address.trim().length > 0 && form.city.trim().length > 0 && form.state.trim().length > 0;

const buildWhatsAppMessage = (
  items: { name: string; quantity: number; price: number; size?: string }[],
  form: { firstName: string; lastName: string; email: string; phone: string; address: string; city: string; state: string; zip: string },
  subtotal: number
) => {
  const itemLines = items
    .map((i: any) => `  • ${i.name} (x${i.quantity}${i.size ? `, Size: ${i.size}` : ''}) — ₦${(i.price * i.quantity).toLocaleString('en-NG')}`)
    .join('\n');

  const msg =
    `Hello Green Lifestyle! 👋\n\n` +
    `I'd like to place an INTERNATIONAL ORDER:\n\n` +
    `🛒 *Order Details:*\n${itemLines}\n\n` +
    `💰 *Subtotal:* ₦${subtotal.toLocaleString('en-NG')}\n\n` +
    `📦 *Shipping Address:*\n` +
    `  Name: ${form.firstName} ${form.lastName}\n` +
    `  Phone: ${form.phone}\n` +
    `  Email: ${form.email}\n` +
    `  Address: ${form.address}${form.city ? `, ${form.city}` : ''}${form.state ? `, ${form.state}` : ''}${form.zip ? `, ${form.zip}` : ''}\n\n` +
    `Please let me know the international shipping cost and payment details. Thank you!`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
};

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

  const addressFilled = hasAddress(form);
  const shippingCost = addressFilled ? NIGERIA_SHIPPING : 0;
  const grandTotal = totalPrice + shippingCost;

  const handleOrderSuccess = async (response: any) => {
    setStep('success');
    clearCart();

    const orderData = {
      reference: response.reference,
      customerInfo: form,
      orderDetails: { items, totalPrice, shippingCost, grandTotal },
      createdAt: new Date().toISOString(),
    };

    const [firestoreResult, emailResult] = await Promise.allSettled([
      (async () => {
        const { db } = await import('../lib/firebase');
        const { collection, addDoc } = await import('firebase/firestore');
        await addDoc(collection(db, 'orders'), orderData);
      })(),
      (async () => {
        const res = await fetch('/api/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reference: response.reference, orderDetails: orderData.orderDetails, customerInfo: form }),
        });
        return res.json();
      })(),
    ]);

    if (firestoreResult.status === 'fulfilled') console.log('✅ Order saved to Firestore!');
    else console.warn('⚠️ Firestore save failed:', firestoreResult.reason);

    if (emailResult.status === 'fulfilled') {
      const d = emailResult.value;
      if (d?.emailStatus?.sent) console.log('%c✅ Email sent!', 'color:green;font-weight:bold');
      else console.warn('❌ Email failed:', d?.emailStatus?.error);
    } else console.error('❌ verify-payment error:', emailResult.reason);
  };

  const paystackProps = {
    email: form.email || 'customer@example.com',
    amount: grandTotal * 100,
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    text: `Pay with Paystack — ₦${grandTotal.toLocaleString('en-NG', { minimumFractionDigits: 2 })}`,
    onSuccess: (response: any) => handleOrderSuccess(response),
    onClose: () => {},
    className: 'btn-green',
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
                <OrderSummary total={totalPrice} addressFilled={false} />
                <button className="btn-green" onClick={() => setStep('shipping')}>Continue to Shipping</button>
                <button className="btn-ghost" onClick={() => navigate('/products')}><ChevronLeft size={14} /> Continue Shopping</button>
              </div>
            )}
          </motion.div>
        )}

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

              <div className="intl-shipping-banner">
                <div className="intl-shipping-info">
                  <Globe size={22} />
                  <div>
                    <strong>Shipping outside Nigeria?</strong>
                    <p>Contact us on WhatsApp for international rates. Your order details will be pre-filled in the message.</p>
                  </div>
                </div>
                <a
                  href={buildWhatsAppMessage(items, form, totalPrice)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  International Shipping
                </a>
              </div>
            </div>

            <div className="checkout-summary">
              <OrderSummary total={totalPrice} addressFilled={addressFilled} />
              <button className="btn-green" onClick={() => setStep('payment')}>Continue to Payment</button>
              <button className="btn-ghost" onClick={() => setStep('cart')}><ChevronLeft size={14} /> Back to Cart</button>
            </div>
          </motion.div>
        )}

        {step === 'payment' && (
          <motion.div key="payment" className="checkout-content" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
            <div className="checkout-main">
              <h2><CreditCard size={20} /> Payment</h2>
              <div className="payment-secure-badge"><Lock size={13} /> Secured by SSL Encryption</div>
              <p style={{ marginTop: '20px', color: 'var(--text-light)' }}>
                You will be redirected to Paystack to complete your payment securely.
              </p>
            </div>
            <div className="checkout-summary">
              <OrderSummary total={totalPrice} addressFilled={true} />
              <PaystackButton {...paystackProps} />
              <button className="btn-ghost" onClick={() => setStep('shipping')}><ChevronLeft size={14} /> Back to Shipping</button>
            </div>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div key="success" className="checkout-success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}>
              <CheckCircle size={80} strokeWidth={1.5} color="#10B981" />
            </motion.div>
            <h2>Order Confirmed! 🎉</h2>
            <p>Thank you for shopping with Green Lifestyle. Your order is on its way!</p>
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

interface OrderSummaryProps {
  total: number;
  addressFilled: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ total, addressFilled }) => {
  const shipping = addressFilled ? NIGERIA_SHIPPING : null;
  const grandTotal = total + (shipping ?? 0);
  return (
    <div className="order-summary">
      <h3>Order Summary</h3>
      <div className="summary-row">
        <span>Subtotal</span>
        <span>₦{total.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</span>
      </div>
      <div className="summary-row">
        <span>Shipping</span>
        <span>
          {shipping === null
            ? <span className="shipping-pending">Enter address to calculate</span>
            : `₦${shipping.toLocaleString('en-NG')}`}
        </span>
      </div>
      <div className="summary-row total">
        <span>Total</span>
        <span>₦{grandTotal.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</span>
      </div>
    </div>
  );
};
