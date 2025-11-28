import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isCart = location.pathname === '/cart';

  return (
    <nav className='w-full flex flex-col md:flex-row items-center justify-between gap-6 py-6 px-4 sm:px-8 lg:px-12 mt-4 font-sans selection:bg-primary selection:text-black'>
      
    
      <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-ultrabold uppercase flex items-center gap-2'>
        <span className="relative inline-block align-middle">
          <span className='text-primary text-xl sm:text-2xl md:text-3xl lg:text-6xl xl:text-4xl bg-black py-2 px-4 relative z-10 block'>
            Checkout
          </span>
          {/* corners */}
          <span className="pointer-events-none absolute inset-0 z-20">
          
            <span className="absolute top-[-2px] left-[-2px] w-3 h-3 border-t-4 border-l-4 border-primary" />
           
            <span className="absolute top-[-2px] right-[-2px] w-3 h-3 border-t-4 border-r-4 border-primary" />
          
            <span className="absolute bottom-[-2px] left-[-2px] w-3 h-3 border-b-4 border-l-4 border-primary translate-y-[2px]" />
        
            <span className="absolute bottom-[-2px] right-[-2px] w-3 h-3 border-b-4 border-r-4 border-primary translate-y-[2px]" />
          </span>
        </span>
        <span className='text-black font-regular text-xl sm:text-2xl md:text-3xl lg:text-6xl xl:text-5xl' >   Latest Products</span>
      </h1>

      {/* --- TECH SMOOTH TOGGLE (UPDATED - Dark/Tech Mode) --- */}
      <div className='relative grid grid-cols-2 p-1.5 w-[240px] bg-neutral-900 rounded-full border border-neutral-800 font-mono'>
        
        {/* The Sliding Pill Background */}
        <div 
          className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-[#ccff00] rounded-full shadow-[0_0_10px_rgba(204,255,0,0.4)] transition-all duration-500 cubic-bezier(0.25, 1, 0.5, 1) ${
            isCart ? 'left-[calc(50%+3px)]' : 'left-1.5'
          }`}
        >
           {/* Tech Texture inside Pill */}
           {/* <div className="absolute inset-0 flex items-center justify-center gap-[2px] opacity-20">
              <div className="w-[2px] h-[40%] bg-black rounded-full"></div>
              <div className="w-[2px] h-[60%] bg-black rounded-full"></div>
              <div className="w-[2px] h-[40%] bg-black rounded-full"></div>
           </div> */}
        </div>
        
        {/* Home Link */}
        <NavLink
          to="/"
          className={`relative z-10 flex items-center justify-center gap-2 py-2.5 text-sm font-bold tracking-widest uppercase transition-colors duration-300 ${
            !isCart ? 'text-black' : 'text-neutral-400 hover:text-white'
          }`}
        >
          {!isCart && <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse"></span>}
          Home
        </NavLink>

        {/* Cart Link */}
        <NavLink
          to="/cart"
          className={`relative z-10 flex items-center justify-center gap-2 py-2.5 text-sm font-bold tracking-widest uppercase transition-colors duration-300 ${
            isCart ? 'text-black' : 'text-neutral-400 hover:text-white'
          }`}
        >
           {isCart && <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse"></span>}
          Cart
        </NavLink>
      </div>

    </nav>
  );
};

export default Navbar;