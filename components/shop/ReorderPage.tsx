import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { StackParamList } from '../../types/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import ShopFooter from '../shop/ShopFooter';
import ShopHeader from '../shop/ShopHeader';
import BrandBox from './BrandBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StyledText from '../../StyledText';



type ReorderPageProps = {
  navigation: StackNavigationProp<StackParamList>;
  route: RouteProp<StackParamList, 'ReorderPage'>;
}

type Product = {
  id: string;
  name: string;
  price: number;
  brand: string;
  type: 'juice' | 'disposable' | 'nonDisposable' | 'part';
  variableStrength: boolean;
  nicotineStrengths: string[];
  image: ProductImage;
};



const ReorderPage: React.FC<ReorderPageProps> = ({ navigation, route }) => {
  const [history, setHistory] = useState<Product[]>([]);
  const [randomStatement, setRandomStatement] = useState('');

  const statements = [
    'Are you in the mood for re-ordering your favorite e-cigarette?',
    'Have you considered trying out our new e-cigarette flavors?',
    'Did you know that we offer a wide range of e-cigarette accessories?',
    'Thinking of trying a different brand of e-cigarette? We have you covered!',
    'Looking for a more powerful e-cigarette? Check out our selection!',
    'Are you interested in learning more about the health benefits of e-cigarettes?',
    'Have you recommended our e-cigarettes to your friends and family?',
    'Looking for a way to gradually reduce your nicotine intake? We can help!',
    'Did you know that we offer subscription plans for e-cigarette refills?',
    'Want to stay up to date with the latest e-cigarette trends? Follow our blog!',
    'Have you explored our collection of premium e-juice flavors?',
    'Are you ready to upgrade your vaping experience with our advanced e-cigarette models?',
    'Looking for a portable and convenient e-cigarette? We have the perfect options!',
    'Thinking of gifting someone an e-cigarette starter kit? We have great options!',
    'Want to share your e-cigarette success story? We would love to hear from you!'
  ];

  useEffect(() => {
    const fetchHistory = async () => {
      const storedHistory = await AsyncStorage.getItem('purchaseHistory');
      if (storedHistory !== null) {
        setHistory(JSON.parse(storedHistory).reverse());
      }
    };

    fetchHistory();
  }, []);

  useEffect(() => {
    const getRandomStatement = async () => {
      const storedStatement = await AsyncStorage.getItem('randomStatement');
      if (storedStatement !== null) {
        setRandomStatement(storedStatement);
      } else {
        const randomIndex = Math.floor(Math.random() * statements.length);
        const statement = statements[randomIndex];
        setRandomStatement(statement);
        AsyncStorage.setItem('randomStatement', statement);
      }
    };

    getRandomStatement();
  }, []);

  const handleContinue = () => {
    navigation.navigate('ShopFront');
  }

  return (
    <View style={styles.container}>
             <Image
        source={require('../pictures/smoke.png')}
        style={styles.backgroundImage}
      />
      <ShopHeader navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollViewContent} bounces={false}>
        <View style={styles.reorderInfo}>
          <StyledText style={styles.title}>Welcome back!</StyledText>
        </View>
        <View style={styles.reorderInfo}>
          <StyledText style={styles.subtitle}>{randomStatement}</StyledText>
        </View>
        {history.length > 0 ? (
          history.map((product, index) => (
            <BrandBox
              key={index}
              product={product}
              selected={false}
              quantity={1}
              onSelect={() => {}}
              onDeselect={() => {}}
              navigation={navigation}
              navigateToPage="ProductPage" // replace with your product page
            />
          ))
        ) : (
          <View style={styles.reorderInfo}>
            <StyledText style={styles.noProductsStyledText}>No products purchased yet!</StyledText>
          </View>
        )}
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <StyledText style={styles.continueButtonStyledText}>Continue to Store</StyledText>
        </TouchableOpacity>
      </ScrollView>
      <ShopFooter navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  scrollViewContent: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#FF6347',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    width: 200,
  },
  continueButtonStyledText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  reorderInfo: {
    flex: 1,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  noProductsStyledText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ReorderPage;