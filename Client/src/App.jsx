 import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userProfileThunk } from './redux/user/user.thunk';
import { adminProfileThunk, getAllUsersThunk } from './redux/admin/admin.thunk';
import { getProductsByCategoryThunk } from './redux/product/product.think';
  

const App = () => {
  const dispatch = useDispatch();

  
  useEffect(() => {
    (async () => {
      await dispatch(userProfileThunk());
      await dispatch(adminProfileThunk());
      await dispatch(getAllUsersThunk())
    })();
  }, [dispatch]);

  
  useEffect(() => {
    (async () => {
      await dispatch(getProductsByCategoryThunk("fashion"));
    })();
  }, [dispatch]);

  return (
    <div>
     
    </div>
  );
};

export default App;
