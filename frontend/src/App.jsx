import React, { useEffect } from 'react'
import MainRoutes from './routes/MainRoutes'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from './store/actions/productsAction'
import Navbar from './components/Navbar'
import ParallaxHome from './components/ParallaxHome'
const App = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.products.theme);
  const isDarkTheme = theme === 'dark';

  const footerStyles = isDarkTheme
    ? { backgroundColor: 'var(--color-primary)', color: '#000000' }
    : { backgroundColor: '#000000', color: '#ffffff' };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <div className=' max-w-screen-2xl mx-auto flex flex-col items-center justify-center'>
      <ParallaxHome />
      <Navbar />
      <MainRoutes />
      <footer
        className='w-full text-center text-sm py-2 mt-10 transition-colors duration-300'
        style={footerStyles}
      >
        <p className='font-regular tracking-wide'>Copyright © 2025 Checkout. All rights reserved.</p>
      </footer>
      </div>
  )
}

export default App