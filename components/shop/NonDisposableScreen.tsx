import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import ShopHeader from './ShopHeader';
import ShopFooter from './ShopFooter';
import { StackParamList } from '../../types/types';
import { StackActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import StyledText from '../../StyledText';

type NonDisposableScreenProps = {
  navigation: StackNavigationProp<StackParamList>;
  brand: string;
  type: 'juice' | 'disposable' | 'nonDisposable' | 'part';
};

const NonDisposableScreen: React.FC<NonDisposableScreenProps> = ({ navigation }) => {

  const [searchTerm, setSearchTerm] = useState('');

  const handleBrandPress = (brand: string) => {
    console.log('brand: ' + brand);
    navigation.dispatch(StackActions.push('BrandVarieties', { brand, type: 'nonDisposable' }));
  };

  const brands = [
    { name: "Flexus", brand: "Flexus", image: require('../pictures/flexus2.png') },
    { name: "DragX", brand: "DragX", image: require('../pictures/dragx.png') },
    { name: "Favostix", brand: "Favostix", image: require('../pictures/favostix2.png') },
    { name: "PocketX", brand: "PocketX", image: require('../pictures/pocketx.png') },
    { name: "Smok", brand: "Smok", image: require('../pictures/smok.png') },
    { name: "TeknoKit", brand: "TeknoKit", image: require('../pictures/teknokit.png') },
  ];

  return (
    <View style={styles.container}>
                 <Image
        source={require('../pictures/smoke.png')}
        style={styles.backgroundImage}
      />
     <ShopHeader navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        <View style={styles.cardContainer}>
          {brands.map(key => (
            <TouchableOpacity
              key={key.name}
              style={styles.card}
              onPress={() => handleBrandPress(key.name)}
            >
              <Image style={styles.image} source={key.image}></Image>
              <StyledText style={styles.cardStyledText}>{key.brand}</StyledText>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.space} />
      </ScrollView>
      <ShopFooter navigation={navigation}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCCC7C',
  },
  space: {
    marginBottom: 50,
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
  header: {
    paddingTop: 50,
    paddingBottom: 30,
    backgroundColor: '#1F1F1F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    
  },
  smallStyledText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#FB5B5A',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  card: {
    width: '45%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardStyledText: {
    color: '#1F1F1F',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buffer: {
    marginBottom: 150,
  },
});

export default NonDisposableScreen;