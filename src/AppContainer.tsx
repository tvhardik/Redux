import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {Loader} from './components';
import {ProductList} from './screens';

const AppContainer: React.FC = () => {
  const loading = useSelector((state: any) => state.products.loading);

  return (
    <View style={{flex: 1}}>
      <ProductList />
      {loading && <Loader isLoading={loading} />}
    </View>
  );
};
export default AppContainer;
