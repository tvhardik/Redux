import {StyleSheet} from 'react-native';
import {colors} from '../../../theme/colors';

export const styles = StyleSheet.create({
  openEndModalContanier: {
    backgroundColor: colors.white,
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  modalContainer: {
    gap: 10,
  },
  SelectedProductTitle: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '700',
    color: colors.black,
  },
  SelectedProductImage: {
    height: 150,
    width: 150,
    resizeMode: 'center',
    alignSelf: 'center',
  },
  text: {
    color: colors.black,
    textAlign: 'center',
  },
  SelectedProductCategory: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.black,
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 10,
  },
  ratingStarContainer: {
    paddingHorizontal: 80,
    gap: 10,
  },
  SelectedProductPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
  },
  grayButton: {
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: colors.darkGray,
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    alignContent: 'center',
  },
  lightGrayButton: {
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
