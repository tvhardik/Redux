import {StyleSheet} from 'react-native';
import {colors} from '../../../theme/colors';

export const styles = StyleSheet.create({
  modalBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  modalContainer: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    gap: 10,
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
  text: {
    color: colors.black,
    textAlign: 'center',
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
});
