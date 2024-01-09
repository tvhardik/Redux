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
  text: {
    color: colors.black,
    textAlign: 'center',
  },
});
