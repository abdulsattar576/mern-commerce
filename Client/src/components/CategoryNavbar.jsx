 import React, { useState } from 'react';
import { 
  FiMenu, FiX, FiShoppingBag, FiSmartphone, FiHeart, FiCoffee, 
  FiHome
} from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { getProductsByCategoryThunk } from '../redux/product/product.think';
import { useNavigate } from 'react-router-dom';

const CategoryNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleCategoryClick = async (category) => {
    category = category.toLowerCase();
    await dispatch(getProductsByCategoryThunk(category));
  };

  const handleAddProduct = () => {
    navigate('/admin/addproduct'); // make sure this route exists
  };

  const categories = [
    { name: 'Fashion',        icon: <FiShoppingBag /> },
    { name: 'Electronics',    icon: <FiSmartphone /> },
     { name:  "Health & Beauty", icon: <FiHome className="text-lg" /> },
         { name: "Home & Kitchen", icon: <FiHeart className="text-lg" /> }
  ];

  return (
    <nav className="bg-gray-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">

        {/* Desktop Navbar */}
        <div className="hidden md:flex items-center justify-between py-3">
          <div className="flex items-center space-x-2">
            <FiShoppingBag className="text-xl" />
            <span className="font-bold text-lg">Shop Categories</span>
          </div>

          <ul className="flex space-x-6 items-center">
            {categories.map((category, index) => (
              <li key={index}>
                <button
                  onClick={() => handleCategoryClick(category.name)}
                  className="flex items-center px-3 py-2 hover:bg-gray-700 rounded-md transition-colors duration-200"
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              </li>
            ))}

            {/* Add Product Button (Desktop) */}
            <li>
              <button
                onClick={handleAddProduct}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition duration-200"
              >
                ➕ Add Product
              </button>
            </li>
          </ul>
        </div>

        {/* Mobile Navbar */}
        <div className="md:hidden flex items-center justify-between py-3">
          <div className="flex items-center space-x-2">
            <FiShoppingBag className="text-xl" />
            <span className="font-bold text-lg">Categories</span>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md hover:bg-gray-700 focus:outline-none"
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-700 rounded-md mb-2">
            <ul className="py-2">
              {categories.map((category, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleCategoryClick(category.name)}
                    className="flex items-center px-4 py-3 hover:bg-gray-600 transition-colors duration-200 w-full text-left"
                  >
                    <span className="mr-3">{category.icon}</span>
                    {category.name}
                  </button>
                </li>
              ))}

              {/* Add Product Button (Mobile) */}
              <li className="border-t border-gray-600 mt-2">
                <button
                  onClick={handleAddProduct}
                  className="block w-full text-center text-white bg-green-600 px-4 py-3 mt-2 rounded-md hover:bg-green-700 transition duration-200"
                >
                  ➕ Add Product
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default CategoryNavbar;
