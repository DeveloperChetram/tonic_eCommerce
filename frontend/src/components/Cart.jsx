import React, { useState, useEffect, useCallback } from 'react';
import { Minus, Plus, ArrowRight, ShieldCheck, Zap, CheckCircle, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, updateCart } from '../store/actions/productsAction';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.products.cart);
  
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
    const updatedItem = { ...item, quantity: 1 };
    dispatch(updateCart(updatedItem));
    setActiveId(item.id);
    setTimeout(() => {
      setActiveId(null);
      dispatch(getCart());
    }, 500);
  };

  const handleQuantityDecrease = (item) => {
    if (item.quantity <= 1) return;
    
    const updatedItem = { ...item, quantity: -1 };
    dispatch(updateCart(updatedItem));
    setActiveId(item.id);
    setTimeout(() => {
      setActiveId(null);
      dispatch(getCart());
    }, 500);
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
      className="group relative bg-white border border-[#8d8d8d]/10 p-6 rounded-sm transition-all duration-500 hover:shadow-[0_20px_50px_-12px_rgba(182,237,2,0.3)] hover:border-[#b6ed02] hover:-translate-y-1 overflow-hidden"
    >
      <div className="absolute -right-20 -top-20 w-40 h-40 bg-[#b6ed02]/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
      
      <div className="flex gap-6 items-stretch relative z-10">
        {/* Image */}
        <div className="relative w-28 h-28 bg-[#F9F8F6] flex items-center justify-center overflow-hidden border border-[#8d8d8d]/10 group-hover:border-[#b6ed02] transition-colors duration-500 rounded-sm">
          <img src={item.image} alt={item.name} className="relative z-10 h-24 object-contain" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#b6ed02]/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out z-0"></div>
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            <span className="text-[10px] font-mono text-[#b6ed02] font-bold tracking-wider bg-black px-1 py-0.5 mb-2 inline-block rounded-sm uppercase">
              {item.category || 'Item'}
            </span>
            <h3 className="font-bold text-xl tracking-tight group-hover:text-[#b6ed02] transition-colors cursor-default">
              {item.name}
            </h3>
            <div className="mt-1 text-xs text-[#8d8d8d] font-mono">
              {item.origin && <span className="mr-2">Origin: {item.origin}</span>}
              {item.rating && <span>Rating: {item.rating}★</span>}
            </div>
          </div>

          <div className="flex items-end justify-between mt-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center bg-[#F9F8F6] border border-[#8d8d8d]/20 group-hover:border-[#b6ed02]/50 transition-colors rounded-sm">
                <button
                  onClick={() => handleQuantityDecrease(item)}
                  disabled={item.quantity <= 1}
                  className="w-8 h-8 flex items-center justify-center hover:bg-black hover:text-white transition-colors disabled:opacity-20 disabled:cursor-not-allowed active:bg-[#b6ed02] active:text-black rounded-l-sm"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <div className="w-8 h-8 flex items-center justify-center overflow-hidden relative font-mono text-sm font-bold">
                  <span className={`transition-all duration-200 ${activeId === item.id ? 'scale-150 text-[#b6ed02] blur-sm' : 'scale-100'}`}>
                    {item.quantity || 1}
                  </span>
                </div>
                <button
                  onClick={() => handleQuantityIncrease(item)}
                  className="w-8 h-8 flex items-center justify-center hover:bg-black hover:text-white transition-colors active:bg-[#b6ed02] active:text-black rounded-r-sm"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
              <p className="font-mono font-bold text-lg min-w-[80px] text-right">
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
      <div className="fixed inset-0 bg-white text-black flex items-center justify-center z-50 overflow-hidden font-sans">
        <div className="relative z-10 text-center space-y-8 p-6 sm:p-8 max-w-full sm:max-w-md w-full mx-2 sm:mx-0 flex flex-col items-center justify-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-[#b6ed02] rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(182,237,2,0.3)]">
            <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-black" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold uppercase tracking-widest mb-2 text-[#b6ed02]">Order Confirmed</h1>
            <p className="font-mono text-[#8d8d8d] text-xs sm:text-sm tracking-wider">ORDER ID: #{Math.floor(Math.random() * 999999)}</p>
          </div>
          <div className="bg-[#F9F8F6] border border-[#8d8d8d]/20 p-4 sm:p-6 rounded-sm w-full max-w-xs sm:max-w-full mx-auto">
            <div className="flex flex-col sm:flex-row sm:justify-between text-sm font-mono mb-2">
              <span className="text-[#8d8d8d]">Payment Status</span>
              <span className="text-[#b6ed02] font-bold sm:text-right sm:ml-2">Successful</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between text-sm font-mono mb-4">
              <span className="text-[#8d8d8d]">Total Amount</span>
              <span className="text-black font-bold sm:text-right sm:ml-2">₹{total.toFixed(2)}</span>
            </div>
            <p className="mt-4 text-xs text-[#8d8d8d] text-left sm:text-center">
              A copy of your receipt has been sent to your email.
            </p>
          </div>
          <button
            onClick={resetSystem}
            className="group relative inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-transparent border border-[#b6ed02] text-[#b6ed02] hover:bg-[#b6ed02] hover:text-black transition-colors uppercase font-bold tracking-widest text-xs sm:text-sm rounded-sm w-full sm:w-auto justify-center"
          >
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            Continue Shopping
          </button>
        </div>
        <div className={`absolute bottom-0 left-0 h-1.5 bg-[#b6ed02] transition-all duration-[5000ms] ease-linear ${progressWidth}`}></div>
      </div>
    );
  }

  return (
    <div className={`max-w-screen-2xl w-full px-10 mt-10 mx-auto text-black font-sans selection:bg-[#b6ed02] selection:text-black transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'} [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#e5e5e5] hover:[&::-webkit-scrollbar-thumb]:bg-[#b6ed02]`}>
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        {/* Cart List */}
        <div className="flex-1 space-y-8">
          <header className="flex justify-between items-center mb-8 pb-4 border-b border-[#8d8d8d]/20">
            <h1 className="text-4xl font-light uppercase tracking-tighter">
              Shopping <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-black to-[#8d8d8d]">Cart</span>
            </h1>
            {cartArray.length > 0 && (
              <button
                onClick={handleClearCart}
                className="flex items-center gap-2 text-xs font-mono text-[#8d8d8d] hover:text-red-500 transition-colors group"
              >
                <Trash2 className="w-3 h-3" />
                <span className="group-hover:underline uppercase">Clear Cart</span>
              </button>
            )}
          </header>

          {cartArray.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center border border-dashed border-[#8d8d8d]/30 bg-white/50 rounded-sm animate-pulse">
              <p className="font-mono text-[#8d8d8d] mb-4">Your cart is empty</p>
              <button
                onClick={() => window.location.href = '/'}
                className="text-xs font-bold border-b-2 border-[#b6ed02] hover:bg-[#b6ed02] hover:text-white transition-all px-2 py-1 uppercase"
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

        {/* Checkout Panel */}
        <div className="lg:w-80 flex-shrink-0 transition-all duration-700 ease-out">
          <div className="bg-white border border-[#8d8d8d]/20 p-8 sticky top-24 hover:border-[#b6ed02] hover:shadow-xl transition-all duration-500 group/panel rounded-sm">
            <div className="flex items-center gap-2 mb-8 pb-4 border-b border-[#8d8d8d]/10">
              <div className="w-2 h-2 bg-[#b6ed02] animate-pulse rounded-full"></div>
              <h2 className="text-sm font-bold uppercase tracking-widest">Order Summary</h2>
            </div>
            
            <div className="space-y-3 font-mono text-sm mb-8">
              <div className="flex justify-between text-[#8d8d8d]">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#8d8d8d]">
                <span>Tax (8%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="h-px bg-[#8d8d8d]/10 my-2"></div>
              <div className="flex justify-between text-lg font-bold text-black">
                <span>Total</span>
                <span className="group-hover/panel:text-[#b6ed02] transition-colors duration-300">
                  ₹{total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="relative group/input mb-6">
              <input
                type="text"
                placeholder="PROMO CODE"
                className="w-full bg-[#F9F8F6] border-b border-[#8d8d8d]/30 py-2 pl-0 pr-8 text-sm focus:outline-none focus:border-[#b6ed02] transition-colors placeholder-[#8d8d8d]/40 font-mono uppercase rounded-t-sm"
              />
              <Zap className="w-4 h-4 text-[#8d8d8d]/30 absolute right-0 top-2 group-focus-within/input:text-[#b6ed02] transition-colors" />
              <div className="absolute bottom-0 left-0 h-[1px] bg-[#b6ed02] w-0 group-focus-within/input:w-full transition-all duration-500"></div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={cartArray.length === 0}
              className="w-full relative overflow-hidden bg-black text-white py-4 font-bold uppercase tracking-widest group/btn disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
            >
              <div className="absolute inset-0 bg-[#b6ed02] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              <div className="relative z-10 flex items-center justify-center gap-2 group-hover/btn:text-black transition-colors">
                <span>Checkout</span>
                <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
              </div>
              <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 pointer-events-none mix-blend-exclusion bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
            </button>

            <div className="mt-6 flex justify-center gap-4 text-[#8d8d8d]/40">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[10px] font-mono tracking-wider uppercase">Secure SSL Encryption</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-[#8d8d8d]/20 p-4 z-40 safe-area-pb">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-[#8d8d8d]">Total</span>
            <span className="font-mono font-bold text-lg">₹{total.toFixed(2)}</span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={cartArray.length === 0}
            className="bg-black text-white px-8 py-3 font-bold uppercase text-sm hover:bg-[#b6ed02] hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
          >
            Checkout
          </button>
        </div>
      </div>
      <div className="h-20 lg:hidden"></div>
    </div>
  );
};

export default Cart;
