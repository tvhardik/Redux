import React, {FC} from 'react';
import {TextInput} from 'react-native';
import {styles} from './styles';
import {colors} from '../../theme/colors';

interface CustomTextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'numeric' | 'email-address';
}

const CustomTextInput: FC<CustomTextInputProps> = ({
  placeholder,
  value,
  onChangeText,
  keyboardType,
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={colors.black}
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
    />
  );
};

export default CustomTextInput;
