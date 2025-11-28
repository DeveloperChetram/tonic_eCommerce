import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { Minus, Plus, ArrowRight, ShieldCheck, Zap, CheckCircle, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, updateCart } from '../store/actions/productsAction';
import Loader from './Loader';
import MicroLoader from './MicroLoader';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.products.cart);
  const theme = useSelector((state) => state.products.theme);
  const isDarkTheme = theme === 'dark';
  const colors = {
    primary: 'var(--color-primary)',
    text: isDarkTheme ? '#f5f7fb' : '#000000',
    textMuted: isDarkTheme ? 'rgba(245,247,251,0.65)' : '#8d8d8d',
    surface: isDarkTheme ? '#0f1115' : '#ffffff',
    surfaceAlt: isDarkTheme ? '#151922' : '#F9F8F6',
    border: isDarkTheme ? 'rgba(255,255,255,0.15)' : 'rgba(141,141,141,0.2)',
    borderMuted: isDarkTheme ? 'rgba(255,255,255,0.08)' : 'rgba(141,141,141,0.1)',
    panel: isDarkTheme ? '#09090d' : '#ffffff',
  };
  const checkoutButton = {
    backgroundColor: isDarkTheme ? '#0b0b10' : '#000000',
    color: '#ffffff',
    border: `1px solid ${isDarkTheme ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.4)'}`,
  };
  const checkoutHoverOverlay = colors.primary;
  
  const [activeId, setActiveId] = useState(null);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progressWidth, setProgressWidth] = useState('w-full');

  
  useEffect(() => {
    setIsLoaded(true);
    dispatch(getCart());
  }, [dispatch]);

  const resetSystem = useCallback(() => {
    setIsCheckedOut(false);
    setProgressWidth('w-full');
    dispatch(clearCart());
  }, [dispatch]);

  // Handle checkout progress bar
  useEffect(() => {
    let timer;
    if (isCheckedOut) {
      setTimeout(() => setProgressWidth('w-0'), 100);
      timer = setTimeout(resetSystem, 5000);
    } else {
      setProgressWidth('w-full');
    }
    return () => clearTimeout(timer);
  }, [isCheckedOut, resetSystem]);
  const handleQuantityIncrease = (item) => {
    if (activeId) return;
    setActiveId(item.id);
    const updatedItem = { ...item, quantity: 1 };
    dispatch(updateCart(updatedItem));
    setTimeout(() => {
      dispatch(getCart());
    }, 300);
    setTimeout(() => {
      setActiveId(null);
    }, 800);
  };

  const handleQuantityDecrease = (item) => {
    if (item.quantity <= 1 || activeId) return;
    setActiveId(item.id);
    const updatedItem = { ...item, quantity: -1 };
    dispatch(updateCart(updatedItem));
    setTimeout(() => {
      dispatch(getCart());
    }, 300);
    setTimeout(() => {
      setActiveId(null);
    }, 800);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    setIsCheckedOut(true);
  };

  // Calculations
  const cartArray = Array.isArray(cart) ? cart : [];
  const subtotal = cartArray.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  // Render cart item
  const renderCartItem = (item) => (
    <div
      key={item.id}
      className="group relative p-6 rounded-sm transition-all duration-500 hover:-translate-y-1 overflow-hidden hover:shadow-[0_0_35px_rgba(182,237,2,0.25)]"
      style={{
        backgroundColor: colors.surface,
        border: `1px solid ${colors.border}`,
        color: colors.text,
      }}
    >
      <div className="absolute -right-20 -top-20 w-40 h-40 bg-[#b6ed02]/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
      
      <div className="flex gap-6 items-stretch relative z-10">
      
        <div
          className=" relative w-28 h-28 flex items-center justify-center overflow-hidden transition-colors duration-500 rounded-sm"
          style={{
            backgroundColor: colors.surfaceAlt,
            border: `1px solid ${colors.border}`,
          }}
        >
          <img src={item.image} alt={item.name} className="relative z-10 h-24 object-contain " />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#b6ed02]/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out z-0"></div>
        </div>

       
        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            <span className="text-[10px] font-mono text-[#b6ed02] font-bold tracking-wider bg-black px-1 py-0.5 mb-2 inline-block rounded-sm uppercase">
              {item.category || 'Item'}
            </span>
            <h3
              className="font-ultrabold text-xl tracking-tight transition-colors cursor-default group-hover:text-[var(--color-primary)]"
              style={{ color: colors.text }}
            >
              {item.name}
            </h3>
            <div className="mt-1 text-xs font-mono" style={{ color: colors.textMuted }}>
              {item.origin && <span className="mr-2">Origin: {item.origin}</span>}
              {item.rating && <span>Rating: {item.rating}★</span>}
            </div>
          </div>

          <div className="flex items-end justify-between mt-4">
            <div className="flex items-center gap-6">
              <div
                className="flex items-center transition-colors rounded-sm"
                style={{
                  backgroundColor: colors.surfaceAlt,
                  border: `1px solid ${colors.border}`,
                }}
              >
                <button
                  onClick={() => handleQuantityDecrease(item)}
                  disabled={item.quantity <= 1 || activeId === item.id}
                  className="w-8 h-8 flex items-center justify-center transition-colors disabled:opacity-20 disabled:cursor-not-allowed rounded-l-sm hover:bg-[var(--color-primary)] hover:text-black active:bg-[var(--color-primary)] active:text-black"
                  style={{ color: colors.text }}
                >
                  <Minus className="w-3 h-3" />
                </button>
                <div className="w-8 h-8 flex items-center justify-center overflow-hidden relative">
                  {activeId === item.id ? (
                    <div className="flex items-center justify-center">
                      <div className="relative h-4 w-4">
                        {/* loader */}
                        <div className="absolute inset-0 rounded-full border border-[#8d8d8d]/30"></div>
                        <div className="absolute inset-0 animate-spin rounded-full border border-[#b6ed02] border-l-transparent border-r-transparent"></div>
                        <div className="absolute inset-0.5 animate-[spin_1.5s_linear_infinite_reverse] rounded-full border border-black border-t-transparent"></div>
                        <div className="absolute inset-0 m-auto h-1 w-1 animate-pulse rounded-full bg-[#b6ed02]"></div>
                      </div>
                    </div>
                  ) : (
                    <span className="font-mono text-sm font-bold">{item.quantity || 1}</span>
                  )}
                </div>
                <button
                  onClick={() => handleQuantityIncrease(item)}
                  disabled={activeId === item.id}
                  className="w-8 h-8 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-r-sm hover:bg-[var(--color-primary)] hover:text-black active:bg-[var(--color-primary)] active:text-black"
                  style={{ color: colors.text }}
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
              <p className="font-mono font-bold text-lg min-w-[80px] text-right" style={{ color: colors.text }}>
                ₹{((item.price || 0) * (item.quantity || 1)).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Checkout confirmation screen
  if (isCheckedOut) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden font-sans"
        style={{ backgroundColor: colors.surface, color: colors.text }}
      >
        <div className="relative z-10 text-center space-y-8 p-6 sm:p-8 max-w-full sm:max-w-md w-full mx-2 sm:mx-0 flex flex-col items-center justify-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(182,237,2,0.3)]" style={{ backgroundColor: colors.primary }}>
            <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12" color="#000000" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold uppercase tracking-widest mb-2" style={{ color: colors.primary }}>Order Confirmed</h1>
            <p className="font-mono text-xs sm:text-sm tracking-wider" style={{ color: colors.textMuted }}>ORDER ID: #{Math.floor(Math.random() * 999999)}</p>
          </div>
          <div
            className="p-4 sm:p-6 rounded-sm w-full max-w-xs sm:max-w-full mx-auto"
            style={{ backgroundColor: colors.surfaceAlt, border: `1px solid ${colors.border}` }}
          >
            <div className="flex flex-col sm:flex-row sm:justify-between text-sm font-mono mb-2">
              <span style={{ color: colors.textMuted }}>Payment Status</span>
              <span className="font-bold sm:text-right sm:ml-2" style={{ color: colors.primary }}>Successful</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between text-sm font-mono mb-4">
              <span style={{ color: colors.textMuted }}>Total Amount</span>
              <span className="font-bold sm:text-right sm:ml-2" style={{ color: colors.text }}>₹{total.toFixed(2)}</span>
            </div>
            <p className="mt-4 text-xs text-left sm:text-center" style={{ color: colors.textMuted }}>
              A copy of your receipt has been sent to your email.
            </p>
          </div>
          <button
            onClick={resetSystem}
            className="group relative inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-transparent transition-colors uppercase font-bold tracking-widest text-xs sm:text-sm rounded-sm w-full sm:w-auto justify-center"
            style={{
              border: `1px solid ${colors.primary}`,
              color: colors.primary,
            }}
          >
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            Continue Shopping
          </button>
        </div>
        <div
          className={`absolute bottom-0 left-0 h-1.5 transition-all duration-[5000ms] ease-linear ${progressWidth}`}
          style={{ backgroundColor: colors.primary }}
        ></div>
      </div>
    );
  }

  return (
    <div
      className={`max-w-screen-2xl w-full px-10 mt-10 mx-auto font-regular selection:bg-[var(--color-primary)] selection:text-black transition-opacity duration-700 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      } [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#e5e5e5] hover:[&::-webkit-scrollbar-thumb]:bg-[var(--color-primary)]`}
      style={{ color: colors.text }}
    >
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        {/* Cart List */}
        <Suspense fallback={<Loader />}>
        <div className="flex-1 space-y-8">
          <header
            className="flex justify-between items-center mb-8 pb-4"
            style={{ borderBottom: `1px solid ${colors.border}` }}
          >
            <h1 className="text-4xl font-light uppercase tracking-tighter" style={{ color: colors.text }}>
              Shopping{' '}
              <span
                className="font-bold text-transparent bg-clip-text"
                style={{ backgroundImage: `linear-gradient(90deg, ${colors.text}, ${colors.textMuted})` }}
              >
                Cart
              </span>
            </h1>
            {cartArray.length > 0 && (
              <button
                onClick={handleClearCart}
                className="flex items-center gap-2 text-xs font-mono transition-colors group hover:text-red-400"
                style={{ color: colors.textMuted }}
              >
                <Trash2 className="w-4 h-4" />
                <span className="group-hover:underline uppercase cursor-pointer text-lg">Clear Cart</span>
              </button>
            )}
          </header>

          {cartArray.length === 0 ? (
            <div
              className="h-64 flex flex-col items-center justify-center border border-dashed rounded-sm animate-pulse"
              style={{
                borderColor: colors.border,
                backgroundColor: colors.surfaceAlt,
              }}
            >
              <p className="font-mono mb-4" style={{ color: colors.textMuted }}>
                Your cart is empty
              </p>
              <button
                onClick={() => window.location.href = '/'}
                className="text-xs font-bold border-b-2 px-2 py-1 uppercase transition-all"
                style={{
                  borderColor: 'var(--color-primary)',
                  color: colors.text,
                }}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cartArray.map(renderCartItem)}
            </div>
          )}
        </div>
        </Suspense>

        {/* Checkout Panel */}
        <div className="lg:w-80 flex-shrink-0 transition-all duration-700 ease-out">
          <div
            className="p-8 sticky top-24 hover:shadow-xl transition-all duration-500 group/panel rounded-sm"
            style={{
              backgroundColor: colors.surface,
              border: `1px solid ${colors.border}`,
            }}
          >
            <div className="flex items-center gap-2 mb-8 pb-4" style={{ borderBottom: `1px solid ${colors.borderMuted}` }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: colors.primary }}></div>
              <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: colors.text }}>
                Order Summary
              </h2>
            </div>
            
            <div className="space-y-3 font-mono text-sm mb-8">
              <div className="flex justify-between" style={{ color: colors.textMuted }}>
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between" style={{ color: colors.textMuted }}>
                <span>Tax (8%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="h-px my-2" style={{ backgroundColor: colors.borderMuted }}></div>
              <div className="flex justify-between text-lg font-bold" style={{ color: colors.text }}>
                <span>Total</span>
                <span className="group-hover/panel:text-[var(--color-primary)] transition-colors duration-300">
                  ₹{total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="relative group/input mb-6">
              <input
                type="text"
                placeholder="PROMO CODE"
                className="w-full py-2 pl-0 pr-8 text-sm focus:outline-none transition-colors font-mono uppercase rounded-t-sm"
                style={{
                  backgroundColor: colors.surfaceAlt,
                  borderBottom: `1px solid ${colors.border}`,
                  color: colors.text,
                }}
              />
              <Zap
                className="w-4 h-4 absolute right-0 top-2 group-focus-within/input:text-[var(--color-primary)] transition-colors"
                style={{ color: colors.textMuted }}
              />
              <div
                className="absolute bottom-0 left-0 h-[1px] w-0 group-focus-within/input:w-full transition-all duration-500"
                style={{ backgroundColor: colors.primary }}
              ></div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={cartArray.length === 0}
              className="w-full relative overflow-hidden py-4 font-bold uppercase tracking-widest group/btn disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
              style={checkoutButton}
            >
              <div
                className="absolute inset-0 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-in-out"
                style={{ backgroundColor: checkoutHoverOverlay }}
              ></div>
              <div
                className="relative z-10 flex items-center justify-center gap-2 transition-colors group-hover/btn:text-black"
                style={{ color: checkoutButton.color }}
              >
                <span>Checkout</span>
                <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
              </div>
              <div
                className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 pointer-events-none mix-blend-exclusion translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 ease-in-out"
                style={{ backgroundColor: isDarkTheme ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.2)' }}
              ></div>
            </button>

            <div className="mt-6 flex justify-center gap-4" style={{ color: colors.textMuted }}>
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[10px] font-mono tracking-wider uppercase">Secure SSL Encryption</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bar */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 backdrop-blur-lg p-4 z-40 safe-area-pb"
        style={{
          backgroundColor: isDarkTheme ? 'rgba(9,9,13,0.92)' : 'rgba(255,255,255,0.9)',
          borderTop: `1px solid ${colors.border}`,
        }}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase" style={{ color: colors.textMuted }}>
              Total
            </span>
            <span className="font-mono font-bold text-lg" style={{ color: colors.text }}>
              ₹{total.toFixed(2)}
            </span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={cartArray.length === 0}
            className="px-8 py-3 font-bold uppercase text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-sm relative overflow-hidden group/mobile"
            style={{ backgroundColor: checkoutButton.backgroundColor, color: checkoutButton.color, border: checkoutButton.border }}
          >
            <span className="relative z-10 transition-colors group-hover/mobile:text-black">Checkout</span>
            <div
              className="absolute inset-0 translate-y-full group-hover/mobile:translate-y-0 transition-transform duration-300 ease-in-out"
              style={{ backgroundColor: checkoutHoverOverlay }}
            ></div>
          </button>
        </div>
      </div>
      <div className="h-20 lg:hidden"></div>
    </div>
  );
};

export default Cart;
