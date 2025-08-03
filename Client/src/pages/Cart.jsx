 import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { CartThunk, getUserCart } from '../redux/user/user.thunk';
import ProductCart from '../components/ProductCart';

const Cart = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location?.state?.id;

  const { cart } = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(getUserCart());
  }, [dispatch]);

  useEffect(() => {
    if (!id) return;
    dispatch(CartThunk(id));
  }, [id, dispatch]);
  const handleCheckout=()=>{
    console.log("order successfully")
  }

  return (
    <div className="cart-container p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Cart</h2>

      {cart?.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="flex flex-wrap gap-6">
          {cart.map((item) => (
            <ProductCart
              key={item?.product?._id}
              product={item.product}
              quantity={item.quantity}
              onCheckout={handleCheckout}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
