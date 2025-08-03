import { configureStore } from "@reduxjs/toolkit";
import userReducer from './user/user.slice';
import adminReducer from './admin/admin.slice';  
import ProductReducer from './product/product.slice'; // Assuming you have a product slice
const store=configureStore({
    reducer:{
        userReducer,  // This is the user slice reducer
        adminReducer, // This is the admin slice reducer
        ProductReducer // This is the product slice reducer
    },
middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable serializable check if needed
        }),
})
export default store;