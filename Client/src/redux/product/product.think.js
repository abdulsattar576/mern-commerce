import { createAsyncThunk } from "@reduxjs/toolkit";
 import { axiosInstance } from "../../components/utill/AxiosInstance";

export const addProductThunk = createAsyncThunk(
  'product/add',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/product/add-product", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);
//get products by category name
export const getProductsByCategoryThunk = createAsyncThunk(
  '/category/get-category',
  async (categoryName, { rejectWithValue }) => {

    try {
      const name=categoryName
      const response = await axiosInstance.get(`/category/get-category/${name}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);
 
//delete product by id
export const deleteProductThunk = createAsyncThunk(
  'product/delete-product',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/product/delete-product/${productId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);
//update product by id
export const updateProductThunk = createAsyncThunk(
  'product/update-product',
  async ({ id, formData }, { rejectWithValue }) => {
    const{name,description,discount,image}=formData
    try {
      const response = await axiosInstance.put(`/product/update-product/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);