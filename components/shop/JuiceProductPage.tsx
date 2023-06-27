import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import ShopHeader from './ShopHeader';
import ShopFooter from './ShopFooter';
import { StackParamList } from '../../types/types';
import { StackActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StyledText from '../../StyledText';

type ProductWithQuantity = typeof product & { quantity: number };


type JuiceProductPageProps = {
  navigation: StackNavigationProp<StackParamList>;
  route: RouteProp<StackParamList, 'JuiceProductPage'>;
}







const JuiceProductPage: React.FC<JuiceProductPageProps> = ({ navigation, route }) => {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(product.price);
  const [selectedNicotineStrength, setSelectedNicotineStrength] = useState(product.nicotineStrengths[0]);

  useEffect(() => {
    setTotalPrice(getProductPrice());
  }, [quantity, selectedNicotineStrength]);


  const reloadData = () => {
    navigation.navigate('ShopFront');
  }

  const getProductPrice = () => {
    let pricePerItem = product.price;
    if (selectedNicotineStrength === 20) {
      pricePerItem += 5;
    }

    if (quantity === 3 && parseInt(selectedNicotineStrength) < 20) {
      return 12.5;
    } else {
      return quantity * pricePerItem;
    }
  };

  useEffect(() => {
    let newTotalPrice = product.price;
    if (quantity > 1) {
      newTotalPrice = (product.price + 0.01) * quantity;
    }
    setTotalPrice(newTotalPrice);
  }, [quantity]);

  const addToBasket = async () => {
    try {
      const productWithQuantity = {
        ...product,
        quantity: quantity,
      };

      const storedBasket = await AsyncStorage.getItem('basket');
      let basket = [];

      if (storedBasket !== null) {
        basket = JSON.parse(storedBasket);
      }

      basket.push(productWithQuantity);
      await AsyncStorage.setItem('basket', JSON.stringify(basket));

      navigation.dispatch(StackActions.push('CustomerBasket'));
    } catch (error) {
      console.error('Failed to add the item to the basket.', error);
    }
  };

  let basket: ProductWithQuantity[] = [];

  const incrementQuantity = () => {
    if(quantity < 12) {
      setQuantity(quantity + 1);
    }
  }

  const decrementQuantity = () => {
    if(quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  const brandStyledText = `The ${product.brand} e-liquid is a vial containing ${product.brand} liquid, ` + 
                  (product.variableStrength 
                  ? 'that comes in different strengths.' 
                  : 'which contains 20mg of nicotine in 10ml of flavored liquid.');

    return (
      <View style={styles.mainContainer}>
        <ShopHeader navigation={navigation} />
        <ScrollView contentContainerStyle={styles.container} bounces={false}>
          <Image
            source={require('../pictures/smoke.png')}
            style={styles.backgroundImage}
          />
          <View style={styles.content}>
            {product ? (
              <>
                <View style={styles.productInfo2}>
                  <StyledText style={styles.productInfoHeader}>{product.brand} - {product.name}</StyledText>
                </View>
                <View style={styles.productInfo}>
                  {product.image && product.image.length > 0 ? (
                    <Image source={require('../pictures/logo.png')} style={styles.image} />
                  ) : (
                    <View style={styles.imagePlaceholder}>
                      <StyledText style={styles.placeholderStyledText}>Image Unavailable</StyledText>
                    </View>
                  )}
                </View>
                <View style={styles.productInfo}>
                  <StyledText style={styles.productInfoDescription}>{brandStyledText}</StyledText>
                  <ScrollView contentContainerStyle={styles.container} bounces={false}>
                    {product.nicotineStrengths.map((strength) => (
                      <TouchableOpacity key={strength} onPress={() => setSelectedNicotineStrength(strength)}>
                        <StyledText>{strength}mg</StyledText>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
                <View style={styles.productInfo}>
                  <View style={styles.priceQuantityContainer}>
                    <StyledText style={styles.productInfoHeader}>{`€ ${totalPrice.toFixed(2)}`}</StyledText>
                    <View style={styles.quantitySelector}>
                      <TouchableOpacity onPress={decrementQuantity}>
                        <Ionicons name="remove-circle-outline" size={30} color="black" />
                      </TouchableOpacity>
                      <StyledText style={styles.quantityStyledText}>{quantity}</StyledText>
                      <TouchableOpacity onPress={incrementQuantity}>
                        <Ionicons name="add-circle-outline" size={30} color="black" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <TouchableOpacity 
                  style={[styles.buyButton, styles.buttonSpacing]} 
                  onPress={addToBasket}
                >
                  <StyledText style={styles.buyButtonStyledText}>Add to Basket</StyledText>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.buyButton, styles.buttonSpacing]} 
                  onPress={() => navigation.dispatch(StackActions.push('DeliveryAddress', { product }))}
                >
                  <StyledText style={styles.buyButtonStyledText}>Buy Now</StyledText>
                </TouchableOpacity>
                <View style={styles.space}></View>
              </>
            ) : (
              <View style={{ alignItems: 'center' }}>
                <StyledText style={styles.title}>You haven't loaded this product.</StyledText>
                <TouchableOpacity style={styles.button} onPress={reloadData}>
                  <StyledText style={styles.buttonStyledText}>Reload</StyledText>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
        <ShopFooter navigation={navigation} />
      </View>
    );
  };


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FCCC7C',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Adjust the image resizing mode as needed
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  button: {

  },
  title: {
  
  },
  buttonStyledText: {

  },
  container: {
    backgroundColor: '#FCCC7C',
    padding: 10,
  },
  buttonSpacing: {
    marginVertical: 20,
  },
  imagePlaceholder: {
    height: 225,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  placeholderStyledText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'OpenSans-Regular',
  },
  content: {
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: 'transparent',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    height: 225,
    width: '100%',
    borderRadius: 10,
    padding: 20,
  },
  productInfo: {
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  productInfo2: {
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    alignItems: 'center',
  },
  productInfoHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    fontFamily: 'OpenSans-Bold',
    alignItems: 'center',
  },
  productInfoDescription: {
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    fontWeight: 'bold',
  },
  space: {
    marginBottom: 50,
  },
  buyButton: {
    backgroundColor: '#FF6347',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  buyButtonStyledText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'OpenSans-Bold',
  },
  priceQuantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantitySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityStyledText: {
    marginHorizontal: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
})

export default JuiceProductPage;