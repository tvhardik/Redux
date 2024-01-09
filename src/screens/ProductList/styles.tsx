import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';
import {fontFamily} from '../../theme/fonts';

export const styles = StyleSheet.create({
  productContainer: {
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 20,
    margin: 7,
    padding: 10,
    gap: 12,
  },
  mainContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 30,
  },
  productImage: {
    height: 100,
    width: 100,
    resizeMode: 'center',
    alignSelf: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: fontFamily.Medium,
    color: colors.black,
    bottom: 5,
  },
  divider: {
    width: 120,
    borderWidth: 0.4,
    borderColor: colors.black,
    alignSelf: 'center',
  },
  price: {
    color: colors.black,
    left: 10,
    fontSize: 15,
    fontFamily: fontFamily.Bold,
    position: 'absolute',
    bottom: 5,
  },
  addProductButton: {
    backgroundColor: colors.darkGray,
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 20,
    left: '78%',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addProductIcon: {width: 30, height: 30, resizeMode: 'center'},
  text: {
    color: colors.black,
    textAlign: 'center',
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.white,
  },
  moreTextView: {
    height: 30,
    justifyContent: 'center',
  },
  moreProductText: {
    fontSize: 20,
    fontFamily: fontFamily.Bold,
    paddingHorizontal: 20,
  },
  posterImage: {
    width: '100%',
    height: 230,
  },
});
