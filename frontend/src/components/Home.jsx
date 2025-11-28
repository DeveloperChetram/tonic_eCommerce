
import { useSelector } from 'react-redux';
import {Suspense, lazy} from 'react';
import MicroLoader from './MicroLoader';
  const CyberProductCard = lazy(() => import('./CyberProductCard'));
// import Navbar from './Navbar';
const Home = () => {
  const products = useSelector((state) => state.products.products);


  // const newProducts=products?.map((product)=>{
  //   return{
  //   id: product.id,
  //   name: product.name,
  //   category: product.category,
  //   price: product.price,
  //   rating: product.rating,
  //   image: product.image,
  //   origin: product.origin,
  //   stock: product.stock,
  // }})

  const productCard = products?.map((item)=>{
    return(
      <div key={item.id} className="bg-white  p-2 shadow-xl shadow-tertiary/5 ring-1 ring-tertiary/5">
        <Suspense fallback={<div className="flex items-center justify-center h-full min-h-[300px]"><MicroLoader /></div>}>
        
        {
        
            <CyberProductCard data={item} />
          
        }
          
        </Suspense>
      </div>
    )
  })

  return (
    <>
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 mt-10" id="products">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {productCard}
      </div>
    </div>
    </>
  );
}

export default Home;