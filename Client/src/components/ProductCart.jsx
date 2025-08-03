 import React, { useState, useEffect } from 'react';
import { FiShoppingCart, FiPlus, FiMinus } from 'react-icons/fi';
import { FaImage, FaCheck, FaTimes, FaJediOrder, FaFirstOrder, FaFirstOrderAlt } from 'react-icons/fa';
import { RiDiscountPercentFill } from 'react-icons/ri';
 
const ProductCart = ({ product, quantity: initialQuantity = 1, onCheckout, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (onQuantityChange) onQuantityChange(quantity);
  }, [quantity]);

  const arrayBufferToBase64 = (buffer) => {
    if (!buffer?.data) return '';
    let binary = '';
    const bytes = new Uint8Array(buffer.data);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const imageSrc = product?.image?.data
    ? `data:image/jpeg;base64,${arrayBufferToBase64(product.image)}`
    : '';

  const price = parseFloat(product?.price || 0);
  const discount = parseFloat(product?.discount || 0);
  const actualPrice = price * (1 - discount / 100);
  const totalPrice = actualPrice * quantity;

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div 
      className={`w-full max-w-sm bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden transition-all duration-300 ${
        isHovered ? 'shadow-md transform -translate-y-1' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative h-60 w-full overflow-hidden">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={product?.name || 'Product Image'}
            className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center text-gray-400">
            <FaImage className="w-12 h-12 mb-2" />
            <span className="text-sm">No image available</span>
          </div>
        )}
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
            <RiDiscountPercentFill className="mr-1" />
            {discount}% OFF
          </div>
        )}
      </div>

      {/* Product Content */}
      <div className="p-5">
        {/* Title and Price */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {product?.name || 'Product Name'}
          </h3>
          <div className="flex flex-col items-end">
            <span className="text-lg font-bold text-gray-900">
              ${actualPrice.toFixed(2)}
            </span>
            {discount > 0 && (
              <span className="text-xs text-gray-500 line-through">
                ${price.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {product?.description || 'No description available'}
        </p>

        {/* Stock Status */}
        <div className="flex items-center mb-4">
          {product?.inStock ? (
            <>
              <FaCheck className="text-green-500 mr-2" />
              <span className="text-xs font-medium">In Stock</span>
            </>
          ) : (
            <>
              <FaTimes className="text-red-500 mr-2" />
              <span className="text-xs font-medium">Out of Stock</span>
            </>
          )}
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between border-t border-b border-gray-100 py-3 mb-4">
          <span className="text-sm font-medium text-gray-700">Quantity</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={decreaseQuantity}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
              aria-label="Decrease quantity"
            >
              <FiMinus className="w-4 h-4" />
            </button>
            <span className="w-6 text-center font-medium">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
              aria-label="Increase quantity"
            >
              <FiPlus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Total Price */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-gray-700">Total</span>
          <span className="text-lg font-bold text-blue-600">
            ${totalPrice.toFixed(2)}
          </span>
        </div>

        {/* Checkout Button */}
        <button
          onClick={() => onCheckout?.(product, quantity)}
          className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition duration-200"
          disabled={!product?.inStock}
        >
          <FiShoppingCart className="mr-2" />
          {product?.inStock ? 'CheckOut' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCart;