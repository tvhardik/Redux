import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import productSlice from './productReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['products'], 
};

const rootReducer = combineReducers({
  products: persistReducer(persistConfig, productSlice),
});


export default rootReducer;
