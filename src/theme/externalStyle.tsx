import {StyleSheet} from 'react-native';
import {colors} from './colors';
import {fontFamily} from './fonts';

export const externalStyle = StyleSheet.create({
  Button: {
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    alignContent: 'center',
  },
  text: {
    fontSize: 17,
    color: colors.black,
    textAlign: 'center',
    fontFamily: fontFamily.Medium,
  },
  flex1: {
    flex: 1,
  },
});
