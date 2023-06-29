import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import ShopHeader from './ShopHeader';
import ShopFooter from './ShopFooter';
import { StackParamList } from '../../types/types';
import { StackActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import StyledText from '../../StyledText';

type JuiceScreenProps = {
  navigation: StackNavigationProp<StackParamList>;
  brand: string;
  type: 'juice' | 'disposable' | 'nonDisposable' | 'part';
}

const JuiceScreen: React.FC<JuiceScreenProps> = ({ navigation }) => {
  
  const brands = [
    // { name: "Kinship", brand: "Kinship", image: require('../pictures/JuiceScreen/kinship.png') },
    { name: "BMG", brand: "BMG", image: require('../pictures/JuiceScreen/bmg.png') },
    { name: "Hale", brand: "Hale", image: require('../pictures/JuiceScreen/hale3.png') },
    { name: "Slushie", brand: "Slushie", image: require('../pictures/JuiceScreen/slushie.png') },
    { name: "Yeti", brand: "Yeti", image: require('../pictures/JuiceScreen/yeti.png') },
    { name: "IVG Salt", brand: "IVGSalt", image: require('../pictures/VapePics/juice.png') },
    { name: "Elfiq", brand: "Elfiq", image: require('../pictures/JuiceScreen/elfiq.png') },
  ];

  const handleBrandPress = (brand: string) => {
    console.log('brand: ' + brand);
    navigation.dispatch(StackActions.push('BrandVarieties', { brand, type: 'juice' }));
  };


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
              key={key.brand}
              style={styles.card}
              onPress={() => handleBrandPress(key.brand)}
            >
              <Image style={styles.image} source={key.image}></Image>
              <StyledText style={styles.cardStyledText}>{key.name}</StyledText>
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
    backgroundColor: '#FCCC7C',
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    
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
    backgroundColor: '#FCCC7C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallStyledText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#FB5B5A',
  },
  image: {
      width: '100%', 
      height: 100,
      resizeMode: 'contain',
      marginBottom: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    padding: 20,
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
});

export default JuiceScreen;