import React from 'react';
import { View, StyleSheet, Linking, Alert, Platform } from 'react-native';
import { Header, SearchBar, Icon, Button } from 'react-native-elements';
import ShopHeader from '../shop/ShopHeader';
import { StackParamList } from '../../types/types';
import { StackActions } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import StyledText from '../../StyledText';
import ArmageddonButton from './ArmageddonButton';
import ShopFooter from '../shop/ShopFooter';

type ErrorScreenProps = {
  navigation: NavigationProp<StackParamList>;
};

const ErrorScreen: React.FC<ErrorScreenProps> = ({ navigation }) => {
  const handleButtonPress = () => {
    if (Platform.OS === 'web') {
      window.location.reload();
    } else {
      Alert.alert(
        'Understood',
        'Press OK to close the app.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
    }
  };

  return (
    <View style={styles.container}>
      <ShopHeader navigation={navigation} />
      <View style={styles.content}>
        <StyledText style={styles.title}>Critical Error</StyledText>
        <StyledText style={styles.subtitle}>
          Candii has encountered a critical error and must be reloaded. If you continue to get this error, please contact{' '}
          <StyledText style={styles.link} onPress={() => Linking.openURL('mailto:dryan@candii.xyz')}>
            dryan@candii.xyz
          </StyledText>
        </StyledText>
        <View style={styles.space} />
        <ArmageddonButton />
      </View>
      <ShopFooter navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  space: {
    marginBottom: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
  },
  link: {
    color: 'blue',
  },
});

export default ErrorScreen;
