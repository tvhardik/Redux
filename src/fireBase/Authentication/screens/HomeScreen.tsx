import React from 'react';
import {View, Button, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import {styles} from './styles';

const HomeScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.log('Login Failed', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{textAlign: 'center', fontSize: 20}}>Welcome</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;
