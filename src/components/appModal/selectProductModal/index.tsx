import React from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import {styles} from './style';
import {constant} from '../../../constant';
import {Button} from '../../index';

interface SelectedProductModalProps {
  isVisible: boolean;
  children?: any;
  onBackdropPress: any;
  handleUpdate: () => void;
  handleDelete: () => void;
}

const SelectedProductModal: React.FC<SelectedProductModalProps> = ({
  isVisible,
  children,
  handleUpdate,
  handleDelete,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      swipeDirection="down"
      style={{justifyContent: 'flex-end', margin: 0}}>
      <View style={styles.openEndModalContanier}>
        <View style={styles.modalContainer}>{children}</View>
        <View style={styles.buttonContainer}>
          <Button
            label={constant.productDelete}
            onPress={handleDelete}
            buttonStyle={styles.grayButton}
            textStyle={styles.text}
          />
          <Button
            label={constant.productUpdate}
            onPress={handleUpdate}
            buttonStyle={styles.lightGrayButton}
            textStyle={styles.text}
          />
        </View>
      </View>
    </Modal>
  );
};

export default SelectedProductModal;
