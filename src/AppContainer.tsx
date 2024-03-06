import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {Loader} from './components';
import {ProductList} from './screens';
import App from './fireBase/Authentication/AuthNavigation/App';
import Scheduled from './fireBase/Database/Scheduled';

const AppContainer: React.FC = () => {
  const loading = useSelector((state: any) => state.products.loading);

  return (
    <View style={{flex: 1}}>
      <ProductList />
      {/* <App /> */}
      {/* <Scheduled /> */}
      {loading && <Loader isLoading={loading} />}
    </View>
  );
};
export default AppContainer;
