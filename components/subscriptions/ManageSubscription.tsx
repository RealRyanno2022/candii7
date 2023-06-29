import React, { useState, useEffect } from 'react';
import { View, Button, ScrollView, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import ShopHeader from '../shop/ShopHeader';
import ShopFooter from '../shop/ShopFooter';
import { StackParamList } from '../../types/types';
import { StackActions } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import BrandBox from '../shop/BrandBox';
import BrandData from '../data/BrandData';
import Icon from 'react-native-vector-icons/FontAwesome';
import StyledText from '../../StyledText';

type ManageSubscriptionProps = {
  navigation: NavigationProp<StackParamList>;
  user: any;
}

const ManageSubscription: React.FC<ManageSubscriptionProps> = ({ navigation, user }) => {
  const [subscription, setSubscription] = useState(user?.subscription || { type: "monthly" });
  const [isSubscribed, setIsSubscribed] = useState(user?.subscription || {});
  const [flavours, setFlavours] = useState(user?.flavours || []);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(BrandData);
  }, []);

  return (
    <View style={styles.container}>
      <ShopHeader navigation={navigation} />

      <View style={styles.contentContainer}>
        <Image
          source={require('../pictures/smoke.png')}
          style={styles.backgroundImage}
        />
        <ScrollView bounces={false}>
          <View style={styles.subscriptionInfo}>
            <StyledText style={styles.subscriptionInfoHeader}>Juice Pass</StyledText>
          </View>
          <StyledText style={styles.subtitle}></StyledText>
          <FlatList
            data={products}
            numColumns={2}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <BrandBox 
                product={item}
                navigation={navigation}
              />
            )}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.dispatch(StackActions.push('ChangeFlavours'))}>
              <StyledText style={styles.buttonStyledText}>Change Flavours</StyledText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.dispatch(StackActions.push('CancelMembership'))}>
              <StyledText style={styles.buttonStyledText}>Cancel</StyledText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    
      <ShopFooter navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
  },
  button: {
    backgroundColor: '#FF6347',
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
  buttonStyledText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subscriptionInfo: {
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    width: '60%',
    alignItems: 'center',
    textAlign: 'center',
  },
  subscriptionInfoHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    fontFamily: 'OpenSans-Bold',
    textAlign: 'center',
  },
  subscriptionInfoDescription: {
    fontSize: 17,
    fontFamily: 'OpenSans-Regular',
  },
  slide: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    textAlign: 'center'
  },
  backgroundImage: {
    flex: 0,
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default ManageSubscription;
