import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/actions/productsAction';

const ArrowRightIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" className={className}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const CheckIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter" className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const LayersIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" className={className}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

// --- Reusable Card Component ---

const CyberProductCard = ({
  data,
  className = "",
  labels = {
    addToCart: "Add to Order",
    loading: "Processing",
    confirmed: "Confirmed"
  }
}) => {
  const [cartState, setCartState] = useState('idle');
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.products.theme);
  const isDarkTheme = theme === 'dark';
  const accentTextClass = isDarkTheme ? 'text-black' : 'text-tertiary';
  const accentHoverTextClass = isDarkTheme ? 'group-hover/btn:text-black' : 'group-hover/btn:text-tertiary';
  // This state controls whether the data drawer should be forced open after Add to Cart
  const [drawerForcedOpen, setDrawerForcedOpen] = useState(false);

  // When the button is clicked, set forced open and control cart state/confirmation as before
  const handleAddToCart = async (e, data) => {
    e.stopPropagation();
    if (cartState !== 'idle') return;

    setDrawerForcedOpen(true);
    setCartState('loading');

    const minLoading = new Promise(resolve => setTimeout(resolve, 600));

    let success = false;
    try {
     const actionResult = await dispatch(addToCart(data));
     
      success = true;
    } catch (error) {
      success = false;
    }

    await minLoading;

    if (success) {
      setCartState('success');
      setTimeout(() => {
        setCartState('idle');
        setDrawerForcedOpen(false);
      }, 1000);
    } else {
      setCartState('idle');
      setDrawerForcedOpen(false);
    }
  };

  const isDrawerOpen = drawerForcedOpen || undefined; // on mobile drawer is always open

  return (
    <div className={`group relative w-full bg-white-off cursor-default selection:bg-primary selection:text-tertiary perspective-[1000px] lg:aspect-square lg:overflow-hidden ${className}`}>
      {/* --- Base Layer: Technical Grid (Desktop Hover Only) --- */}
      <div className="absolute inset-0 z-0 p-4 hidden lg:block opacity-0 group-hover:opacity-100 transform scale-110 group-hover:scale-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
        <div className="w-full h-full border border-dashed border-secondary/30 relative">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-secondary" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-secondary" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-secondary" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-secondary" />
          {/* Background Data Text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[100px] font-black text-secondary/10 select-none pointer-events-none">
            01
          </div>
        </div>
      </div>

      {/* --- Middle Layer: Image --- */}
      <div className="relative z-10 w-full aspect-square lg:absolute lg:inset-0 lg:aspect-auto lg:h-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:group-hover:scale-[0.85] lg:group-hover:-translate-y-6 lg:origin-bottom shadow-sm group-hover:shadow-2xl">
        {/* Status Light */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-2 py-1 shadow-sm border border-white-off transition-opacity duration-300 lg:group-hover:opacity-0">
          <div
            className={`w-1.5 h-1.5 rounded-full animate-pulse ${
              data.stock
                ? "bg-primary shadow-[0_0_8px_rgba(182,237,2,0.6)]"
                : "bg-[#FF6347] shadow-[0_0_8px_rgba(255,99,71,0.5)]"
            }`}
          />
          <span className="text-[9px] font-mono font-bold tracking-widest text-secondary uppercase">
            {data.stock ? "Live" : "Closed"}
          </span>
        </div>

        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
        />
      </div>

      {/* --- Top Layer: Data Drawer (Stacked on Mobile/Tablet, Slides on Desktop) --- */}
      <div
        className={
          `
          relative z-20 bg-white border-t border-primary lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:transform
          ${drawerForcedOpen
            ? "lg:translate-y-0"
            : "lg:translate-y-[101%] lg:group-hover:translate-y-0"
          }
          transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]`
        }
      >
        {/* Drawer Header Tag */}
        <div
          className="absolute -top-8 left-0 bg-primary px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm"
          style={{ color: isDarkTheme ? '#000000' : 'var(--color-tertiary)' }}
        >
          {data.category || 'Spec_Sheet_A'}
        </div>

        <div className="p-5 flex flex-col gap-4">
          {/* Header Info - Stagger 1 */}
          <div className="flex justify-between items-start opacity-100 translate-y-0 lg:opacity-0 lg:translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-500 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={drawerForcedOpen ? { opacity: 1, transform: 'translateY(0)' } : undefined}
          >
            <div>
              <h3 className="text-base font-black text-tertiary leading-none mb-1 uppercase tracking-tight">
                {data.name}
              </h3>
              <div className="flex gap-2 text-[10px] font-mono text-secondary uppercase">
                <span>Ref: #{data.id}</span>
                <span>•</span>
                {data.stock
                  ? <span>Stock: OK</span>
                  : <span className="text-[10px] font-mono text-[#FF6347] font-bold">Out of Stock</span>
                }
              </div>
            </div>
            <div className="text-xl font-bold text-tertiary tabular-nums tracking-tighter">
              ${data.price}
            </div>
          </div>

          {/* Micro Grid Specs - Stagger 2 */}
          <div className="grid grid-cols-2 gap-px bg-white-off border border-white-off opacity-100 translate-y-0 lg:opacity-0 lg:translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-500 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={drawerForcedOpen ? { opacity: 1, transform: 'translateY(0)' } : undefined}
          >
            <div className="bg-white p-2 flex flex-col">
              <span className="text-[9px] text-secondary uppercase font-mono">Rating</span>
              <span className="text-xs font-bold text-tertiary">{data.rating?data.rating:4.5}/5.0</span>
            </div>
            <div className="bg-white p-2 flex flex-col">
              <span className="text-[9px] text-secondary uppercase font-mono">Origin</span>
              <span className="text-xs font-bold text-tertiary">{data.origin?data.origin:'N/A'}</span>
            </div>
          </div>

          {/* Action Button - Stagger 3 */}
          <div className="opacity-100 translate-y-0 lg:opacity-0 lg:translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-500 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={drawerForcedOpen ? { opacity: 1, transform: 'translateY(0)' } : undefined}
          >
            <button
              onClick={(e)=>handleAddToCart(e, data)}
              disabled={cartState !== 'idle' || !data.stock}
              className={`
                w-full h-10 relative overflow-hidden transition-all duration-200 group/btn
                ${
                  !data.stock
                    ? 'bg-secondary '
                    : cartState === 'idle'
                    ? 'bg-tertiary hover:bg-primary active:scale-[0.98] cursor-pointer'
                    : cartState === 'success'
                    ? 'bg-primary cursor-pointer'
                    : 'bg-white-off cursor-wait'
                }
              `}
            >
              <div
                className={`absolute inset-0 flex items-center justify-center font-bold text-sm tracking-wide uppercase gap-2 ${
                  !data.stock
                    ? 'text-white'
                    : cartState === 'idle'
                    ? `text-white ${accentHoverTextClass}`
                    : `${accentTextClass}`
                }`}
              >
                {cartState === 'idle' && (
                  <>
                    <span>{data.stock?'Add to Cart':'Out of Stock'}</span>
                    <ArrowRightIcon
                      className={`w-4 h-4 transition-transform duration-300
                        ${!data.stock ? '' : 'group-hover/btn:translate-x-1'}`}
                    />
                  </>
                )}
                {cartState === 'loading' && (
                  <div className="flex gap-1 items-center justify-center w-full">
                    <span className="w-1 h-4 bg-secondary animate-[pulse_0.5s_ease-in-out_infinite]"></span>
                    <span className="w-1 h-4 bg-secondary animate-[pulse_0.5s_ease-in-out_0.1s_infinite]"></span>
                    <span className="w-1 h-4 bg-secondary animate-[pulse_0.5s_ease-in-out_0.2s_infinite]"></span>
                  </div>
                )}
                {cartState === 'success' && (
                  <>
                    <span>{labels.confirmed}</span>
                    <CheckIcon className="w-4 h-4" />
                  </>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CyberProductCard;