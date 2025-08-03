import { createSlice } from "@reduxjs/toolkit";
import { addProductThunk, deleteProductThunk, getProductsByCategoryThunk, updateProductThunk } from "./product.think";
import toast from "react-hot-toast";
const initialState = {
    products: [],
    Item: null,
    loading: false,
    error: null
}
const addProductSlice=createSlice({
    name:"product",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(addProductThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        }
        );
        builder.addCase(addProductThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.products.push(action.payload);
            console.log("Product added successfully:", action.payload);
        });
        builder.addCase(addProductThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
             console.log("errors occur in prdouct adding:",action.payload)
        });
//get products by category
        builder.addCase(getProductsByCategoryThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getProductsByCategoryThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.products =  Array.isArray(action.payload.category.product)?action.payload.category.product:[];
            // console.log("Products fetched successfully:", state.products);
        });
        builder.addCase(getProductsByCategoryThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            console.log("Error fetching products by category:", action.payload);
        });
        
         
        //delete product
        builder.addCase(deleteProductThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteProductThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.products = state.products.filter(product => product._id !== action.payload.id);
            toast.success("Product deleted successfully");
        });
        builder.addCase(deleteProductThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            toast.error("Error deleting product: " + action.payload.message);
            console.log("Error deleting product:", action.payload);
        });
        //update product
        builder.addCase(updateProductThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateProductThunk.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.products.findIndex(product => product._id === action.payload._id);
            if (index !== -1) {
                state.products[index] = action.payload;
            }
            toast.success("Product updated successfully");
        });
        builder.addCase(updateProductThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            toast.error("Error updating product: " + action.payload.message);
            console.log("Error updating product:", action.payload);
        });
        // Add more cases as needed for other thunks
    }
});


export default addProductSlice.reducer;
export const { } = addProductSlice.actions;