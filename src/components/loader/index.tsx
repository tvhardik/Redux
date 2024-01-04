import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import Modal from 'react-native-modal';
import {styles} from './styles';

type LoaderProps = {
  isLoading: boolean;
};

const Loader = ({isLoading}: LoaderProps) => {
  return isLoading ? (
    <Modal
      deviceHeight={200}
      statusBarTranslucent
      style={styles.modalContainer}
      isVisible={isLoading}>
      <View style={styles.container}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={'large'} color={'black'} />
        </View>
      </View>
    </Modal>
  ) : null;
};

export default Loader;
