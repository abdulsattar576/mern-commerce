 import React from 'react';
import {
  FiEdit, FiTrash2, FiShoppingBag, FiBox, FiEye,
  FiDollarSign, FiPercent, FiCheckCircle, FiPauseCircle
} from 'react-icons/fi';
 import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteProductThunk } from '../redux/product/product.think';
import { useState } from 'react';

const ProductCard = ({ product }) => {
   

  const dispatch = useDispatch();
 
  const navigate = useNavigate();
  //delete product using product id
  const onDelete = async(id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
     
  const response= await dispatch(deleteProductThunk(id));
  if(response?.payload?.success){
      window.location.reload()
    }
  }
  const onEdit = async(id) => {
navigate(`/admin/EditProduct`,{state:{product}});
  }
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
    //delete product using product id
    _id: product?._id || '',
    name: product?.name || 'Unnamed Product',
    price: product?.price || 0,
    discount: product?.discount || 0,
    image: product?.image?.url || (product?.image?.data ? 
      `data:image/jpeg;base64,${arrayBufferToBase64(product.image)}` : 
      'https://via.placeholder.com/300'),
    
    inStock: product?.inStock || false,
    description: product?.description || 'No description available',
    status: product?.status || 'active',
    sku: product?.sku || 'N/A'
  };

  // Calculate original price and discount percentage
  const originalPrice = currentProduct.price + currentProduct.discount;
  const discountPercentage = currentProduct.discount > 0 
    ? Math.round((currentProduct.discount / originalPrice) * 100) 
    : 0;

  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Badges */}
      <div className="relative">
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center z-10">
            <FiPercent className="mr-1" size={10} />
            {discountPercentage}% OFF
          </div>
        )}

        {/* Status Badge */}
        <div className={`absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded-full z-10 flex items-center ${
          currentProduct.status === 'active'
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {currentProduct.status === 'active'
            ? <FiCheckCircle className="mr-1" size={10} />
            : <FiPauseCircle className="mr-1" size={10} />}
          <span className="hidden sm:inline">{currentProduct.status}</span>
        </div>

        {/* Product Image */}
        <div className="w-full aspect-square overflow-hidden">
          <img
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            src={currentProduct.image}
            alt={currentProduct.name}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300';
            }}
          />
        </div>
      </div>

      {/* Product Content */}
      <div className="p-4 flex-grow">
        {/* Name & Price */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2">
            {currentProduct.name}
          </h3>
          <div className="text-right min-w-[80px]">
            <p className="text-sm sm:text-base font-bold text-blue-600 flex items-center justify-end">
              <FiDollarSign className="mr-0.5" size={12} />
              {currentProduct.price.toLocaleString()}
            </p>
            {currentProduct.discount > 0 && (
              <p className="text-xs text-gray-500 line-through">
                {originalPrice.toLocaleString()}
              </p>
            )}
          </div>
        </div>

        {/* Category & Stock */}
        <div className="flex flex-wrap gap-2 mb-3">
          
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            currentProduct.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            <FiBox className="mr-1" size={10} />
            {currentProduct.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {currentProduct.description}
        </p>

        {/* SKU */}
        <p className="text-xs text-gray-500">
          SKU: {currentProduct.sku}
        </p>
      </div>

      {/* Actions */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <button
              onClick={() =>  onEdit(currentProduct._id)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              aria-label="Edit"
            >
              <FiEdit size={16} />
            </button>
            <button
              onClick={() =>  onDelete(currentProduct._id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
              aria-label="Delete"
            >
              <FiTrash2 size={16} />
            </button>
          </div>
          <button className="text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-3 py-1 rounded-md transition-colors flex items-center">
            <FiEye className="mr-1" size={14} />
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;