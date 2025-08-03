 import React from 'react';
import { 
  FiBattery, 
  FiHash, 
  FiHeart, 
  FiHome, 
  FiShoppingBag,
  FiMenu,
  FiSearch,
  FiUser,
  FiShoppingCart,
  FiLogOut
} from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsByCategoryThunk } from '../redux/product/product.think';
import { useNavigate } from 'react-router-dom';
import { logoutThunk } from '../redux/user/user.thunk';

const UserNavbar = () => {
  const handleLogout=async()=>{
    const response=await dispatch(logoutThunk())
    console.log(response)
   if(response?.payload?.success){
    localStorage.removeItem("user_token")
    navigate("/login")
    
   }
  }
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const{cartLen}=useSelector(state=>state.userReducer)
  console.log(cartLen)
  const categories = [
    { name: "Fashion", icon: <FiShoppingBag className="text-lg" /> },
    { name: "Electronics", icon: <FiBattery className="text-lg" /> },
    { name:  "Health & Beauty", icon: <FiHome className="text-lg" /> },
    { name: "Home & Kitchen", icon: <FiHeart className="text-lg" /> }
  ];
  const getData = async(category) => {
     
     const lowerCaseCategory = category.toLowerCase();
  console.log("Fetching products for category:", lowerCaseCategory);
   const response=  await dispatch(getProductsByCategoryThunk(lowerCaseCategory))
   console.log("Category Data Fetched:", response);
    
  };

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        {/* Top Navbar */}
        <div className="flex items-center justify-between py-3">
          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2 rounded-md hover:bg-gray-700">
            <FiMenu className="text-xl" />
          </button>
          
          {/* Logo */}
          <div className="flex items-center">
            <FiShoppingBag className="text-2xl mr-2 text-yellow-400" />
            <h3 className="text-xl font-bold">ShopEase</h3>
          </div>
          
          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 mx-6 max-w-xl">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full py-2 px-4 rounded-l-md text-gray-800 focus:outline-none"
              />
              <button className="absolute right-0 top-0 h-full px-4 bg-yellow-400 text-gray-800 rounded-r-md hover:bg-yellow-500">
                <FiSearch />
              </button>
            </div>
          </div>
          
          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-700">
              <FiUser className="text-xl" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-700 relative">
              <FiShoppingCart className="text-xl" onClick={()=>navigate("/cart")}/>
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-gray-800 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartLen}
              </span>
            </button>
             <button className="p-2 rounded-full hover:bg-gray-700 relative" onClick={handleLogout}>
              <FiLogOut className="text-xl"  />
              <span className="absolute -top-1 -right-1  text-gray-800 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                
              </span>
            </button>
          </div>
        </div>
        
        {/* Categories - Hidden on mobile */}
        <div className="hidden lg:flex items-center justify-between py-2 border-t border-gray-700">
          <ul className="flex space-x-6">
            {categories.map((item, index) => (
              <li key={index}>
                <button className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200 group" onClick={() => getData(item.name)}>
                  <span className="text-yellow-400 group-hover:text-white">
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
          
          {/* Special Offers */}
          <div className="flex items-center space-x-2 text-sm">
            <FiHash className="text-yellow-400" />
            <span>Summer Sale: Up to 50% Off!</span>
          </div>
        </div>
      </div>
      
      {/* Mobile Search - Visible only on mobile */}
      <div className="lg:hidden px-4 pb-3">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full py-2 px-4 rounded-md text-gray-800 focus:outline-none"
          />
          <button className="absolute right-0 top-0 h-full px-4 text-gray-800">
            <FiSearch />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;