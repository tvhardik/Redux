import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {Product} from './type';

// (GET)
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    try {
      const response = await axios.get<Product[]>(
        'https://fakestoreapi.com/products',
      );
      // console.log('response get-----', response);
      return response.data;
    } catch (error) {
      console.error('Error fetching products', error);
      throw error;
    }
  },
);

// (POST)
export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (newProduct: Product) => {
    try {
      const response = await axios.post<Product>(
        'https://fakestoreapi.com/products',
        newProduct,
      );
      // console.log('response post-----', response);
      return response.data;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  },
);

// (DELETE)
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId: number) => {
    try {
      const response = await axios.delete(
        `https://fakestoreapi.com/products/${productId}`,
      );
      // console.log('response delete-----', response);
      return productId;
    } catch (error) {
      console.error(`Error deleting product ${productId}:`, error);
      throw error;
    }
  },
);

// (PUT)
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({
    productId,
    updatedProduct,
  }: {
    productId: number;
    updatedProduct: Product;
  }) => {
    try {
      const response = await axios.put<Product>(
        `https://fakestoreapi.com/products/${productId}`,
        updatedProduct,
      );
      // console.log('response put-----', response);
      return response.data;
    } catch (error) {
      console.error(`Error updating product ${productId}:`, error);
      throw error;
    }
  },
);
