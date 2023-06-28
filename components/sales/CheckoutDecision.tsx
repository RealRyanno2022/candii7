import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, ActivityIndicator, StyleSheet, Dimensions, Text, Image } from 'react-native';

import ShopHeader from '../shop/ShopHeader';
import ShopFooter from '../shop/ShopFooter';

import StyledText from '../../StyledText';

type CheckoutDecisionProps = {
    navigation: any;
}

const CheckoutDecision: React.FC<CheckoutDecisionProps> = ({navigation }) => { 
    const scaleValue = useRef(new Animated.Value(0)).current;
    const scrollValue = useRef(new Animated.Value(Dimensions.get('window').width)).current;
    const [loadingVisible, setLoadingVisible] = useState(false);

    // dummy values

    const IDVerified = true;
    const emailVerified = true;


  
    useEffect(() => {
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(scaleValue, {
          toValue: 0.8,
          useNativeDriver: true,
        }),
        Animated.spring(scaleValue, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start();

      setTimeout(() => {
        setLoadingVisible(true);
      }, 3500);

      setTimeout(() => {
        Animated.timing(scrollValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }).start();
      }, 4000);

      // Automatic navigation to ShopFront after 5 seconds
      setTimeout(() => {
        navigation.navigate('RegisterEmail');
        // if(emailVerified && IDVerified) {
        //   navigation.navigate('DeliveryAddress');
        // } else if (emailVerified && !IDVerified) {
        //   navigation.navigate('IDCheckScreen')
        // } else if (!emailVerified && IDVerified) {
        //   navigation.navigate('VerifyEmail');
        // } else {
        //   navigation.navigate('NotFoundScreen');
        // }
      }, 5000);
    }, []);

    return (
      <View style={styles.container}>
        <ShopHeader navigation={navigation} />
        <View style={styles.subscriptionInfo}>
          <StyledText style={styles.checkoutText}>Proceeding to checkout...</StyledText>
        </View>
        <View style={styles.content}>
            {loadingVisible && 
                <View style={styles.activityIndicatorContainer}><ActivityIndicator style={styles.activityIndicator} size="large" color="#1F1F1F" /></View>}
        </View>
        <View style={styles.footerContainer}>
          <ShopFooter navigation={navigation} />
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCCC7C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicatorContainer: {
    position: 'absolute',
    top: Dimensions.get('window').height / 2 - 200, // half the height of the page - half the size of the ActivityIndicator (assuming its size is 80)
  },
  subscriptionInfo: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
},
  checkoutText: {
    fontWeight: 'bold',
    fontSize: 24,
    alignText: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicator: {
    transform: [{ scale: 2 }],
  },
  footerContainer: {
    width: '100%',
    alignSelf: 'flex-end',
  }
});

export default CheckoutDecision;
