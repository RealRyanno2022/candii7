import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, ActivityIndicator, StyleSheet, Dimensions, Text, Image } from 'react-native';

import ShopHeader from '../shop/ShopHeader';

import ShopFooter from '../shop/ShopFooter';

type CheckoutDecisionProps = {
    navigation: any;
}

const CheckoutDecision: React.FC<CheckoutDecisionProps> = ({navigation }) => { 

      const scaleValue = useRef(new Animated.Value(0)).current;
      const scrollValue = useRef(new Animated.Value(Dimensions.get('window').width)).current;
      const [loadingVisible, setLoadingVisible] = useState(false);
    
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
        hasBoughtProduct().then(hasBought => {
          setTimeout(() => {
            if (hasBought) {
              navigation.navigate('DeliveryAddress');
            } else {
              navigation.navigate('VerifyEmail');
            }
          }, 2000);
        });
      }, []);
      return (
        <View style={styles.container}>
            <ShopHeader navigation={navigation} />
          <Text>Proceeding to checkout...</Text>
          <View style={styles.space} />
          <View style={styles.placeholder}>
            {loadingVisible && <ActivityIndicator style={{marginTop: 20}} size="large" color="#1F1F1F" />}
          </View>
          <ShopFooter navigation={navigation} />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#FCCC7C',
    alignItems: 'center',
    justifyContent: 'center',
    },
    space: {
    marginTop: 50,
    },
    logo: {
    width: 300,
    height: 300,
    marginBottom: 20,
    },
    placeholder: {
    height: 50,
    },
});

export default CheckoutDecision;
