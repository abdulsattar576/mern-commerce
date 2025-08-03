 import React, { useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import CategoryNavbar from '../components/CategoryNavbar'
import { useSelector } from 'react-redux'
 

const Product = () => {
  const { products } = useSelector(state => state.ProductReducer);
 
 
  return (
    <div className="container">
      <CategoryNavbar />
      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-3">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found</p>
        </div>
      )}
    </div>
  )
}

export default Product