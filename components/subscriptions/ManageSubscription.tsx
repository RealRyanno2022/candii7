import React, { useState, useEffect } from 'react';
import { View, Button, ScrollView, StyleSheet, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import ShopHeader from '../shop/ShopHeader';
import ShopFooter from '../shop/ShopFooter';
import { StackParamList } from '../../types/types';
import { StackActions } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import BrandBox from '../shop/BrandBox';
import BrandData from '../data/BrandData';
import Icon from 'react-native-vector-icons/FontAwesome';

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
    <View style={styles.mainContainer}>
      <ShopHeader navigation={navigation} />
   
      <View style={styles.container}>
        <ScrollView bounces={false}>
          <Text style={styles.title}>Juice Pass</Text>     
          <Text style={styles.subtitle}>Flavours:</Text>     
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
              <Text style={styles.buttonText}>Change Flavours</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.dispatch(StackActions.push('CancelMembership'))}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            
            
          </View>
        </ScrollView>
      </View>
    
      <ShopFooter navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#FF6347',
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCCC7C',
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
  }
});

export default ManageSubscription;
