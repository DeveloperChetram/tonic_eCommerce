import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home.jsx';
import Cart from '../components/Cart.jsx';
import Loader from '../components/Loader.jsx';
import { Suspense } from 'react';
const MainRoutes = () => {
  return (
    <Routes className='w-full'>
      <Route path='/' element={<Suspense fallback={<Loader />}> <Home /> </Suspense>} />
      <Route path='/cart' element={<Suspense fallback={<Loader />}> <Cart /> </Suspense>} />
    </Routes>
  );
};

export default MainRoutes;