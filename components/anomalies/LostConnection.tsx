import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { useNavigation } from '@react-navigation/native';
import StyledText from '../../StyledText';

const LostConnection: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected && state.isInternetReachable) {
        navigation.goBack();
      }
    });

    // Cleanup
    return () => unsubscribe();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image 
        source={require('../pictures/nowifi.png')} 
        style={styles.imageStyle}
      />
      <StyledText style={styles.titleStyledText}>Cannot connect to Candii</StyledText>
      <StyledText style={styles.paragraphStyledText}>Try using your mobile data or checking your WiFi.</StyledText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCCC7C',
    paddingHorizontal: 20,
  },
  titleStyledText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  paragraphStyledText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  imageStyle: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});

export default LostConnection;