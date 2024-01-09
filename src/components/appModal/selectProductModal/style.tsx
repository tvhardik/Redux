import {StyleSheet} from 'react-native';
import {colors} from '../../../theme/colors';
import {fontFamily} from '../../../theme/fonts';

export const styles = StyleSheet.create({
  openEndModalContanier: {
    backgroundColor: colors.white,
    padding: 20,
    gap: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  modalContainer: {
    gap: 10,
  },
  SelectedProductTitle: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: fontFamily.Bold,
    color: colors.black,
  },
  SelectedProductImage: {
    height: 150,
    width: 150,
    resizeMode: 'center',
    alignSelf: 'center',
  },
  text: {
    fontSize: 17,
    color: colors.black,
    textAlign: 'center',
    fontFamily: fontFamily.Medium,
  },
  SelectedProductCategory: {
    fontSize: 17,
    fontFamily: fontFamily.Regular,
    color: colors.black,
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 10,
  },
  ratingStarContainer: {
    paddingHorizontal: 80,
  },
  SelectedProductPrice: {
    fontSize: 16,
    fontFamily: fontFamily.Bold,
    color: colors.black,
  },
});
