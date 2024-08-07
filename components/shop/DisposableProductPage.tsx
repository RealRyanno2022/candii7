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


type ProductQuantity = typeof Product & { selectedQuantity: number };


type DisposableProductPageProps = {
  navigation: StackNavigationProp<StackParamList>;
  route: RouteProp<StackParamList, 'DisposableProductPage'>;
}

const DisposableProductPage: React.FC<DisposableProductPageProps> = ({ navigation, route }) => {
  const { product } = route.params;
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const [totalPrice, setTotalPrice] = useState(product.price);

  useEffect(() => {
    let newTotalPrice = product.price;
    if (selectedQuantity > 1) {
      newTotalPrice = (product.price + 0.01) * selectedQuantity;
    }
    setTotalPrice(newTotalPrice);
  }, [selectedQuantity]);

  const reloadData = () => {
    navigation.navigate('ShopFront');
  }

  const addToBasket = async () => {
    const newProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      brand: product.brand,
      type: product.type,
      image: product.image,
    };
    
    const productWithselectedQuantity = {
      product: newProduct, // product details are nested inside a 'product' property
      selectedQuantity: selectedQuantity,
    };
  
    let basket = await AsyncStorage.getItem('basket');
    let parsedBasket = basket ? JSON.parse(basket) : null;
    if (parsedBasket !== null) {
      parsedBasket.push(productWithselectedQuantity);
    } else {
      parsedBasket = [productWithselectedQuantity];
    }
    await AsyncStorage.setItem('basket', JSON.stringify(parsedBasket));
  };
  
  
  

  let basket: ProductWithselectedQuantity[] = [];

  const incrementselectedQuantity = () => {
    if(selectedQuantity < 12) {
      setSelectedQuantity(selectedQuantity + 1);
    }
  }

  const decrementselectedQuantity = () => {
    if(selectedQuantity > 1) {
      setSelectedQuantity(selectedQuantity - 1);
    }
  }

  const brandStyledText = product.brand === 'ElfaBar' 
    ? `The ${product.brand} Elfa Bar is a special Elf Bar with refillable pods for continuing that refreshing Elf taste. Expect a pod to last 600 puffs.` 
    : `The ${product.brand} ${product.name} is a premium e-cigarette: No recharging or refilling required. Usually lasts 600 puffs.`;

    return (
      <View style={styles.mainContainer}>
      <Image
        source={require('../pictures/smoke.png')}
        style={styles.backgroundImage}
      />
      <ShopHeader navigation={navigation} />
      <ScrollView contentContainerStyle={styles.container} bounces={false}>
          <View style={styles.content}>
            {product ? (
              <>
                <View style={styles.productInfo2}>
                  <StyledText style={styles.productInfoHeader}>{product.brand} - {product.name}</StyledText>
                </View>
                <View style={styles.productInfo}>
                  {product.image && product.image.length > 0 ? (
                    <Image source={{ uri: product.image }} style={styles.image} />
                  ) : (
                    <View style={styles.imagePlaceholder}>
                      <StyledText style={styles.placeholderStyledText}>Image Unavailable</StyledText>
                    </View>
                  )}
                </View>
                <View style={styles.productInfo}>
                  <StyledText style={styles.productInfoDescription}>{brandStyledText}</StyledText>
                </View>
                <View style={styles.productInfo}>
                  <View style={styles.priceselectedQuantityContainer}>
                    <StyledText style={styles.productInfoHeader}>{`€ ${totalPrice.toFixed(2)}`}</StyledText>
                    <View style={styles.selectedQuantitySelector}>
                      <TouchableOpacity onPress={decrementselectedQuantity}>
                        <Ionicons name="remove-circle-outline" size={30} color="black" />
                      </TouchableOpacity>
                      <StyledText style={styles.selectedQuantityStyledText}>{selectedQuantity}</StyledText>
                      <TouchableOpacity onPress={incrementselectedQuantity}>
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
    backgroundColor: 'transparent', // make main container background transparent
  },
  backgroundImage: {
    resizeMode: 'cover', // Adjust the image resizing mode as needed
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'OpenSans-Bold',
  },
  
  button: {
    marginTop: 20,
    backgroundColor: '#FF6347',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  
  buttonStyledText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'OpenSans-Bold',
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
  priceselectedQuantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedQuantitySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedQuantityStyledText: {
    marginHorizontal: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
})

export default DisposableProductPage;