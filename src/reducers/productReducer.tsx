import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Product, ProductState} from '../types/productTypes';
import {
  fetchProducts,
  addProduct,
  deleteProduct,
} from '../actions/productActions';

const initialState: ProductState = {
  products: [],
  loading: false,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      //fetchProducts
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.products = action.payload;
        },
      )
      .addCase(fetchProducts.rejected, state => {
        state.loading = false;
      })
      //addProduct
      .addCase(addProduct.pending, state => {
        state.loading = true;
      })
      .addCase(
        addProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.loading = false;
          state.products.push(action.payload);
        },
      )
      .addCase(addProduct.rejected, state => {
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
