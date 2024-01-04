import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import productSlice from './product/slice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['products'],
};

const rootReducer = combineReducers({
  products: persistReducer(persistConfig, productSlice),
});

export default rootReducer;
