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
