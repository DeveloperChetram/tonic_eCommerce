import React, { useEffect } from 'react'
import MainRoutes from './routes/MainRoutes'
import { useDispatch } from 'react-redux'
import { getProducts } from './store/actions/productsAction'
import Navbar from './components/Navbar'
import ParallaxHome from './components/ParallaxHome'
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <div className=' max-w-screen-2xl mx-auto flex flex-col items-center justify-center'>
      <ParallaxHome />
      <Navbar />
      <MainRoutes />
      <footer className=' w-full text-center text-sm text-gray-500 py-2 mt-10 bg-black text-white'>
        <p>Copyright © 2025 Checkout. All rights reserved.</p>
      </footer>
      </div>
  )
}

export default App