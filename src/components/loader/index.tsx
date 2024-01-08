import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import Modal from 'react-native-modal';
import {styles} from './styles';
import {colors} from '../../theme/colors';

type LoaderProps = {
  isLoading: boolean;
};

const Loader = ({isLoading}: LoaderProps) => {
  return isLoading ? (
    <Modal
      statusBarTranslucent
      style={styles.modalContainer}
      isVisible={isLoading}>
      <View style={styles.container}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={'large'} color={colors.white} />
        </View>
      </View>
    </Modal>
  ) : null;
};

export default Loader;
