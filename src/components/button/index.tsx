import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

interface ButtonProps {
  buttonStyle?: any;
  textStyle?: any;
  onPress: () => void;
  label: string;
}

const Button: React.FC<ButtonProps> = ({
  buttonStyle,
  textStyle,
  onPress,
  label,
}) => {
  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;
