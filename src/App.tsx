import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { fetchProducts } from './actions/productActions';
import  { store,persistor } from './store/store';
import ProductList from './components/ProductList';

const App = () => {
  // const dispatch = useDispatch();

  //   useEffect(() => {
  //     dispatch(fetchProducts());
  //   }, [dispatch]);

  return (
    <View>
      <ProductList />
    </View>
  );
};

const ReduxApp: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

export default ReduxApp;
