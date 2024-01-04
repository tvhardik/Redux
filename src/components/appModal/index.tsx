import React from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import {styles} from './style';

interface DetalisModalProps {
  isVisible: boolean;
  children?: any;
}

const DetalisModal: React.FC<DetalisModalProps> = ({isVisible, children}) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>{children}</View>
      </View>
    </Modal>
  );
};

export default DetalisModal;
