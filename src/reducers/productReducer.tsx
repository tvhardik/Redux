import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Product, ProductState} from '../types/productTypes';
import {
  fetchProducts,
  addProduct,
  deleteProduct,
  updateProduct,
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
      })

      // deleteProduct
      .addCase(deleteProduct.pending, state => {
        state.loading = true;
      })
      .addCase(
        deleteProduct.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.products = state.products.filter(
            product => product.id !== action.payload,
          );
        },
      )
      .addCase(deleteProduct.rejected, state => {
        state.loading = false;
      })

      // updateProduct
      .addCase(updateProduct.pending, state => {
        state.loading = true;
      })
      .addCase(
        updateProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.loading = false;
          const updatedIndex = state.products.findIndex(
            product => product.id === action.payload.id,
          );

          if (updatedIndex !== -1) {
            state.products[updatedIndex] = action.payload;
          }
        },
      )
      .addCase(updateProduct.rejected, state => {
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
