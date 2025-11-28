import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home.jsx';
import Cart from '../components/Cart.jsx';

const MainRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
    </Routes>
  )
}

export default MainRoutes