import { createSlice } from '@reduxjs/toolkit'

const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('nx-theme') || 'light';
  }
  return 'light';
};

const persistTheme = (theme) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('nx-theme', theme);
  }
};

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    cart: [],
    theme: getInitialTheme(),
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      persistTheme(state.theme);
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      persistTheme(state.theme);
    },
  },
});

export const { setProducts, setCart, setTheme, toggleTheme } = productsSlice.actions;
export default productsSlice.reducer;