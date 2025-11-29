import React, { useEffect, useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Sun, Moon } from 'lucide-react';
import { setTheme, toggleTheme } from '../store/slices/productsSlice';

const THEME_PRESETS = {
  light: {
    '--color-primary': '#b6ed02',
    '--color-secondary': '#8d8d8d',
    '--color-tertiary': '#000000',
    '--color-white': '#ffffff',
    '--color-white-off': '#F9F8F6',
    '--app-background': '#e0e2d9',
    '--app-text': '#000000',
  },
  dark: {
    '--color-primary': '#c8ff4c',
    '--color-secondary': '#d1d5db',
    '--color-tertiary': '#f3f4f6',
    '--color-white': '#050505',
    '--color-white-off': '#0f1115',
    '--app-background': '#050505',
    '--app-text': '#f3f4f6',
  },
};

const Navbar = () => {
  const location = useLocation();
  const isCart = location.pathname === '/cart';
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.products.theme);

  const themeColors = useMemo(() => THEME_PRESETS[theme] || THEME_PRESETS.light, [theme]);
  const isDarkTheme = theme === 'dark';
  const swapBgColor = isDarkTheme ? themeColors['--color-primary'] : '#000000';
  const swapTextColor = isDarkTheme ? '#000000' : '#ffffff';
  const headingTextStyle = { color: themeColors['--color-tertiary'] };
  const cornerBorderColor = isDarkTheme ? '#ffffff' : themeColors['--color-primary'];

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedTheme = localStorage.getItem('nx-theme');
    if (storedTheme) {
      dispatch(setTheme(storedTheme));
    }
  }, [dispatch]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    Object.entries(themeColors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    document.body.style.backgroundColor = themeColors['--app-background'];
    document.body.style.color = themeColors['--app-text'];
    if (typeof window !== 'undefined') {
      localStorage.setItem('nx-theme', theme);
    }
  }, [theme, themeColors]);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <nav
      id="navbar"
      className="w-full flex flex-col md:flex-row items-center justify-between gap-6 py-6 px-4 sm:px-8 lg:px-12 mt-4 font-sans selection:bg-primary selection:text-black"
    >
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-ultrabold uppercase flex items-center gap-2" style={headingTextStyle}>
        <span className="relative inline-block align-middle">
          <span
            className="text-xl sm:text-2xl md:text-3xl lg:text-6xl xl:text-4xl py-2 px-4 relative z-10 block"
            style={{ backgroundColor: swapBgColor, color: swapTextColor }}
          >
            Checkout
          </span>
          <span className="pointer-events-none absolute inset-0 z-20">
            <span
              className="absolute top-[-2px] left-[-2px] w-3 h-3 border-t-4 border-l-4"
              style={{ borderColor: cornerBorderColor }}
            />
            <span
              className="absolute top-[-2px] right-[-2px] w-3 h-3 border-t-4 border-r-4"
              style={{ borderColor: cornerBorderColor }}
            />
            <span
              className="absolute bottom-[-2px] left-[-2px] w-3 h-3 border-b-4 border-l-4 translate-y-[2px]"
              style={{ borderColor: cornerBorderColor }}
            />
            <span
              className="absolute bottom-[-2px] right-[-2px] w-3 h-3 border-b-4 border-r-4 translate-y-[2px]"
              style={{ borderColor: cornerBorderColor }}
            />
          </span>
        </span>
        <span className="font-regular text-xl sm:text-2xl md:text-3xl lg:text-6xl xl:text-5xl" style={headingTextStyle}>
          {isCart ? 'Your Cart' : 'Latest Products'}
        </span>
      </h1>

      <div className="relative flex items-center gap-3 font-mono">
        <div className="relative grid grid-cols-2 p-1.5 w-[240px] bg-neutral-900 rounded-full border border-neutral-800 font-mono">
          <div
            className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-[#ccff00] rounded-full shadow-[0_0_10px_rgba(204,255,0,0.4)] transition-all duration-500 cubic-bezier(0.25, 1, 0.5, 1) ${
              isCart ? 'left-[calc(50%+3px)]' : 'left-1.5'
            }`}
          />

          <NavLink
            to="/"
            className={`relative z-10 flex items-center justify-center gap-2 py-2.5 text-sm font-bold tracking-widest uppercase transition-colors duration-300 ${
              !isCart ? 'text-black' : 'text-neutral-400 hover:text-var(--color-white)'
            }`}
          >
            {!isCart && <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />}
            Home
          </NavLink>

          <NavLink
            to="/cart"
            className={`relative z-10 flex items-center justify-center gap-2 py-2.5 text-sm font-bold tracking-widest uppercase transition-colors duration-300 ${
              isCart ? 'text-black' : 'text-neutral-400 hover:text-var(--color-white)'
            }`}
          >
            {isCart && <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />}
            Cart
          </NavLink>
        </div>

        <button
          type="button"
          onClick={handleThemeToggle}
          aria-pressed={theme === 'dark'}
          className={`h-12 w-12 rounded-full border transition-all duration-300 flex items-center justify-center ${
            isDarkTheme
              ? 'bg-black'
              : 'bg-[var(--color-primary)]'
          }`}
          style={{
            color: isDarkTheme ? '#ffffff' : '#000000',
            borderColor: isDarkTheme ? '#ffffff' : 'rgba(0,0,0,0.2)',
          }}
        >
          <span className="sr-only">Toggle color theme</span>
          {isDarkTheme ? <Moon className="w-5 h-5" color="#ffffff" /> : <Sun className="w-5 h-5" color="#000000" />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
 
