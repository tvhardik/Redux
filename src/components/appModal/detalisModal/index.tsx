import React from 'react';
import Modal from 'react-native-modal';
import {View} from 'react-native';
import {Button, CustomTextInput} from '../../index';
import {constant} from '../../../constant/index';
import {styles} from './style';
import {externalStyle} from '../../../theme/externalStyle';
interface DetalisModalProps {
  isVisible: boolean;
  isUpdate: boolean;
  product: {
    title: string;
    price: string;
    onChangeTitle: (text: string) => void;
    onChangePrice: (text: string) => void;
  };
  label: string;
  handleOpenGallery: () => void;
  handleSave: () => void;
  handleClose: () => void;
}

const DetalisModal: React.FC<DetalisModalProps> = ({
  isVisible,
  product,
  label,
  handleOpenGallery,
  handleSave,
  handleClose,
}) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContainer}>
        <CustomTextInput
          placeholder={constant.title}
          value={product.title}
          onChangeText={(text: string) => product.onChangeTitle(text)}
        />
        <CustomTextInput
          placeholder={constant.price}
          value={product.price}
          onChangeText={(text: string) => product.onChangePrice(text)}
          keyboardType="numeric"
        />
        <Button
          label={constant.openGallery}
          onPress={handleOpenGallery}
          textStyle={styles.text}
        />
        <Button
          label={label}
          onPress={handleSave}
          buttonStyle={externalStyle.grayButton}
          textStyle={styles.text}
        />
        <Button
          label={constant.cancel}
          onPress={handleClose}
          buttonStyle={externalStyle.lightGrayButton}
          textStyle={styles.text}
        />
      </View>
    </Modal>
  );
};

export default DetalisModal;
