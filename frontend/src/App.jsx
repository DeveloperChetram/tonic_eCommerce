import React, { useEffect } from 'react'
import MainRoutes from './routes/MainRoutes'
import { useDispatch } from 'react-redux'
import { getProducts } from './store/actions/productsAction'
import Navbar from './components/Navbar'
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <div className=' max-w-screen-2xl mx-auto flex flex-col items-center justify-center'>
      <Navbar />
      <MainRoutes />
      </div>
  )
}

export default App