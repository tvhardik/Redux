import {StyleSheet} from 'react-native';
import {scale} from '../../utils/helper';
import {colors} from '../../theme/colors';

export const styles = StyleSheet.create({
  bottomContanier: {
    backgroundColor: colors.white,
    height: scale(640),
    top: scale(200),
    borderTopEndRadius: scale(30),
    borderTopStartRadius: scale(30),
    alignItems: 'center',
  },
});
