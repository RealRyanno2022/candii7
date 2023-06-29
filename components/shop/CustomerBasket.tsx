import React, { useEffect, useState, useCallback } from 'react';
import {
  View, StyleSheet, FlatList, Image, ScrollView, TouchableOpacity
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogBox } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import basketStore from './BasketStore';
import { Ionicons } from '@expo/vector-icons'; 
import ShopHeader from './ShopHeader';
import { observer } from 'mobx-react';
import ShopFooter from './ShopFooter';

import StyledText from '../../StyledText';

type Product = {
  id: string;
  name: string;
  price: number;
  brand: string;
  type: 'juice' | 'disposable' | 'nonDisposable' | 'part';
  image: string;
};

type CustomerBasketProps = {
  navigation: StackNavigationProp<StackParamList, 'CustomerBasket'>;
  route: RouteProp<StackParamList, 'CustomerBasket'>;
};

type BasketItem = {
  product: Product;
  quantity: number;
}

const CustomerBasket: React.FC<CustomerBasketProps> = observer(({ route }) => {
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const navigation = useNavigation();

  const subtotal = basketItems.reduce((total, item) => {
    if (!item.product) {
      console.error('Item does not have a product property:', item);
      return total;
    }
    return total + item.product.price * item.quantity + (item.quantity > 1 ? (item.quantity - 1) / 100 : 0);
  }, 0);

  const numItems = basketItems.reduce((total, item) => total + item.quantity, 0);

  const handleCheckoutPress = () => {
    console.log('TODO: Add the intermediary checkout route');
  }

  LogBox.ignoreLogs(['Warning: ...']);

  const loadBasket = useCallback(async () => {
    try {
      const storedBasket = await AsyncStorage.getItem('basket');
      if (storedBasket !== null) {
        let parsedBasket;
        try {
          parsedBasket = JSON.parse(storedBasket);
        } catch (err) {
          console.error('Failed to parse the basket:', err);
          parsedBasket = [];
        }
        if (Array.isArray(parsedBasket)) {
          setBasketItems(parsedBasket.filter(item => item && item.product));
        }
      }
    } catch (error) {
      console.error('Failed to retrieve the basket.', error);
    }
  }, []);

  useEffect(() => {
    loadBasket();
  }, [loadBasket]);

  const saveBasketToAsyncStorage = useCallback(async () => {
    try {
      const currentBasket = await AsyncStorage.getItem('basket');
      if (currentBasket !== JSON.stringify(basketItems)) {
        await AsyncStorage.setItem('basket', JSON.stringify(basketItems));
      }
    } catch (error) {
      console.error('Failed to save basket to async storage', error);
    }
  }, [basketItems]);

  useEffect(() => {
    saveBasketToAsyncStorage();
  }, [saveBasketToAsyncStorage]);


  const increaseQuantity = useCallback((index: number) => {
    setBasketItems(prevBasketItems => {
      const newBasketItems = [...prevBasketItems];
      newBasketItems[index].quantity += 1;
      return newBasketItems;
    });
  }, []);

  const decreaseQuantity = useCallback((index: number) => {
    setBasketItems(prevBasketItems => {
      const newBasketItems = [...prevBasketItems];
      newBasketItems[index].quantity -= 1;
      if (newBasketItems[index].quantity === 0) {
        newBasketItems.splice(index, 1);
      }
      return newBasketItems;
    });
  }, []);

  const renderBasketItem = ({ item, index }: { item: BasketItem, index: number }) => {
    if (!item.product) {
      console.error('Attempting to render basket item without product property:', item);
      return null; 
    }
  
    return (
      <View style={styles.itemContainer}>
        <Image source={require('../pictures/logo.png')} style={styles.image} />
        <StyledText style={styles.itemName}>{item.product.name}</StyledText>
        <StyledText style={styles.itemPrice}>€ {item.product.price.toFixed(2)}</StyledText>
        <View style={styles.quantitySelector}>
          <TouchableOpacity onPress={() => decreaseQuantity(index)}>
            <Ionicons name="remove-circle-outline" size={30} color="black" />
          </TouchableOpacity>
          <StyledText style={styles.quantityStyledText}>{item.quantity}</StyledText>
          <TouchableOpacity onPress={() => increaseQuantity(index)}>
            <Ionicons name="add-circle-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const handleStartShopping = () => {
    navigation.navigate('ShopFront');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../pictures/smoke.png')}
        style={styles.backgroundImage}
      />
      <ShopHeader navigation={navigation} />
      <ScrollView contentContainerStyle={styles.centerScrollContainer} bounces={false} contentContainerStyle={{ paddingBottom: 60 }}>
        <StyledText style={styles.title}>Your Basket</StyledText>
        {numItems > 0 ? (
          <View style={styles.basketContent}>
            <View style={styles.checkoutInfo}>
              <StyledText style={styles.subtotal}>Subtotal: €{subtotal.toFixed(2)}</StyledText>
              <TouchableOpacity style={styles.button} onPress={handleCheckoutPress}>
                <StyledText style={styles.buttonStyledText}>Proceed to Checkout ({numItems} items)</StyledText>
              </TouchableOpacity>
            </View>
            <FlatList
              style={styles.flatList}
              showsVerticalScrollIndicator={false}
              data={basketItems}
              keyExtractor={(item, index) => 'key' + index}
              renderItem={renderBasketItem}
            />
          </View>
        ) : (
          <View style={styles.centerContainer}>
            <StyledText style={styles.emptyBasketStyledText}>Your basket is empty</StyledText>
            <TouchableOpacity style={styles.button} onPress={handleStartShopping}>
              <StyledText style={styles.buttonStyledText}>Start Shopping!</StyledText>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      <View style={styles.footerContainer}>
        <ShopFooter navigation={navigation} />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
    paddingVertical: 10,
    marginBottom: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    alignSelf: 'center',
  },
  emptyBasketStyledText: {
    color: 'black',
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#FF6347',
    borderRadius: 5,
    padding: 10,
    margin: 20,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#FCCC7C',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    backgroundColor: '#FCCC7C',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  basketContent: {
    alignItems: 'center',
    width: '100%',
    flexGrow: 1,
  },
  emptyBasketContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '60%',
    alignSelf: 'center',
    textAlign: 'center',
  },
  footerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerScrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  subtotal: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    textAlign: 'center',
  },
  buttonStyledText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  checkoutInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    alignItems: 'center',
  },
  content: {
    width: '100%',
  },
  flatList: {
    width: '100%',
  },
  boldBasketStyledText: {
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    fontWeight: 'bold',
    alignItems: 'center',
  },
  subscriptionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  boldStyledText: {
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    fontWeight: 'bold',
  },
  addIconContainer: {
    marginLeft: 10,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF6347',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#FFF',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    color: '#888',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityStyledText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
});

export default CustomerBasket;
