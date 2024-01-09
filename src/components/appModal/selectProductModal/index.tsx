import React from 'react';
import {Image, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import StarRating from 'react-native-star-rating';
import {constant} from '../../../constant';
import {Button} from '../../index';
import {images} from '../../../assets';
import {styles} from './style';
import {externalStyle} from '../../../theme/externalStyle';

interface SelectedProductModalProps {
  isVisible: boolean;
  price: any;
  title: any;
  category: string;
  source: string;
  ratingData: number;
  onBackdropPress?: () => void;
  handleUpdate: () => void;
  handleDelete: () => void;
}

const SelectedProductModal: React.FC<SelectedProductModalProps> = ({
  isVisible,
  price,
  title,
  category,
  source,
  ratingData,
  onBackdropPress,
  handleUpdate,
  handleDelete,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      swipeDirection="down"
      style={{justifyContent: 'flex-end', margin: 0}}>
      <View style={styles.openEndModalContanier}>
        <Text style={styles.SelectedProductTitle}>{title}</Text>
        <Text style={styles.SelectedProductCategory}>{category}</Text>
        <Image
          source={{uri: source}}
          style={styles.SelectedProductImage}
          resizeMode="contain"
        />
        <View style={styles.ratingStarContainer}>
          <StarRating
            disabled={true}
            maxStars={5}
            rating={ratingData}
            starSize={15}
            emptyStar={images.emptyStar}
            fullStar={images.fullStar}
            halfStar={images.halfStar}
          />
        </View>
        <Text style={styles.SelectedProductPrice}>${price}</Text>
        <View style={styles.buttonContainer}>
          <Button
            label={constant.productDelete}
            onPress={handleDelete}
            buttonStyle={externalStyle.grayButton}
            textStyle={styles.text}
          />
          <Button
            label={constant.productUpdate}
            onPress={handleUpdate}
            buttonStyle={externalStyle.lightGrayButton}
            textStyle={styles.text}
          />
        </View>
      </View>
    </Modal>
  );
};

export default SelectedProductModal;
