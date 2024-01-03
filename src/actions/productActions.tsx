import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {Product} from '../types/productTypes';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get<Product[]>(
      'https://fakestoreapi.com/products',
    );
    console.log('response get-----', response);
    return response.data;
  },
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (newProduct: Product) => {
    const response = await axios.post<Product>(
      'https://fakestoreapi.com/products',
      newProduct,
    );
    console.log('response post-----', response);
    return response.data;
  },
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId: number) => {
    const response = await axios.delete(
      `https://fakestoreapi.com/products/${productId}`,
    );
    console.log('response delete-----', response);
    return productId;
  },
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({
    productId,
    updatedProduct,
  }: {
    productId: number;
    updatedProduct: Product;
  }) => {
    const response = await axios.put<Product>(
      `https://fakestoreapi.com/products/${productId}`,
      updatedProduct,
    );
    console.log('response put-----', response);
    return response.data;
  },
);