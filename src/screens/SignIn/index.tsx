import React from 'react';
import {View, Text, ImageBackground, TextInput} from 'react-native';
import {externalStyle} from '../../theme/externalStyle';
import {images} from '../../assets';
import {styles} from './style';
import {scale} from '../../utils/helper';

type Props = {};

const SingIn = (props: Props) => {
  const {} = props;
  const [number, onChangeNumber] = React.useState('');
  return (
    <View style={externalStyle.flex1}>
      <ImageBackground
        source={images.DarkBackground}
        style={externalStyle.flex1}>
        <View style={styles.bottomContanier}>
          <TextInput
            style={{
              backgroundColor: '#F3F5F7',
              width: scale(310),
              height: scale(50),
              paddingLeft: scale(23),
              borderRadius: scale(30),
            }}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="Email"
            keyboardType="numeric"
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default SingIn;
