 import React from 'react';
import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const UserProductCard = ({ product }) => {
  const navigate=useNavigate()
  // Helper function to convert array buffer to base64
  const arrayBufferToBase64 = (buffer) => {
    if (!buffer || !buffer.data) return '';
    let binary = '';
    const bytes = new Uint8Array(buffer.data);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  // Safely extract product data with defaults
  const currentProduct = {
    _id: product?._id || '',
    name: product?.name || 'Unnamed Product',
    price: product?.price || 0,
    discount: product?.discount || 0,
    image: product?.image?.url || (product?.image?.data ? 
      `data:image/jpeg;base64,${arrayBufferToBase64(product.image)}` : 
      'https://via.placeholder.com/300'),
    description: product?.description || 'No description available',
    rating: product?.rating || 4,
    reviewCount: product?.reviewCount || 24,
    originalPrice: product?.originalPrice || null
  };

  // Calculate discount percentage if original price exists
  const discountPercentage = currentProduct.originalPrice && currentProduct.discount > 0 
    ? Math.round((currentProduct.discount / currentProduct.originalPrice) * 100)
    : 0;

  return (
    <div className="w-full max-w-xs mx-auto bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative">
        <img
          className="w-full h-80 object-cover transition-transform duration-500 hover:scale-105"
          src={currentProduct.image}
          alt={currentProduct.name}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300';
          }}
        />
        
        {/* Wishlist Button */}
        <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
          <FiHeart className="text-gray-600" />
        </button>
        
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {discountPercentage}% OFF
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-center mb-1">
          {[...Array(5)].map((_, i) => (
            <FiStar 
              key={i} 
              className={`text-sm ${i < currentProduct.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">({currentProduct.reviewCount})</span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
          {currentProduct.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {currentProduct.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-800">
              ${currentProduct.price.toFixed(2)}
            </span>
            {currentProduct.originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">
                ${currentProduct.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          <button className="flex items-center space-x-1 bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-3 py-2 rounded-md transition-colors duration-200" onClick={()=>navigate("/cart",{state:{id:currentProduct._id}})}>
            <FiShoppingCart className="text-sm" />
            <span className="text-sm font-medium">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProductCard;