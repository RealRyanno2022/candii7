import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity, Image } from 'react-native';
import BrandBox from '../shop/BrandBox';
import BrandData from '../data/BrandData';
import ShopHeader from './ShopHeader';
import ShopFooter from './ShopFooter';
import NonDisposableBrandData from '../data/NonDisposableBrandData';
import { StackParamList } from '../../types/types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type BrandVarietiesProps = {
  route: RouteProp<StackParamList, 'BrandVarieties'>;
  navigation: StackNavigationProp<StackParamList, 'BrandVarieties'>;
};

type ProductImage = string;

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

const BrandVarieties: React.FC<BrandVarietiesProps> = ({ route, navigation }) => {
  const [varieties, setVarieties] = useState<Product[]>([]);

  useEffect(() => {
    console.log('BrandVarieties is being rendered');
    if (route.params) {
      const { brand, type } = route.params;
      console.log(brand);
      if (type === 'nonDisposable') {
        loadNonDisposableBrandsData(brand);
      } else {
        loadBrandsData(brand);
      }
    }
  }, [route.params]);

  const loadBrandsData = (brand: string) => {
    const brandProducts: Product[] = Object.values(BrandData).filter((product: Product) => 
      product.brand === brand
    );
    setVarieties(brandProducts);
}

const loadNonDisposableBrandsData = (brand: string) => {
  const nonDisposableBrandProducts: Product[] = Object.values(NonDisposableBrandData).filter((product: Product) => 
    product.model === brand
  );
  setVarieties(nonDisposableBrandProducts);
}



  const reloadData = () => {
    navigation.navigate('ShopFront');
  }

  const handleSelectProduct = (product: Product) => {
    const type = product.type;
    switch(type) {
      case 'juice':
        navigation.navigate('JuiceProductPage', { product });
        break;
      case 'nonDisposable':
        navigation.navigate('NonDisposableProductPage', { product });
        break;
      default:
        navigation.navigate('DisposableProductPage', { product });
        break;
    }
  };

  const brand = route.params?.brand ?? 'Unknown';

    return (
      <View style={styles.container}>
        <Image
          source={require('../pictures/smoke.png')}
          style={styles.backgroundImage}
        />
        <ShopHeader navigation={navigation} />
        <ScrollView contentContainerStyle={styles.basketContent}>
          <View style={styles.subscriptionInfo}>
            <Text style={styles.subscriptionInfoHeader}>
              {varieties.length > 0 ? `${brand} Varieties` : 'No varieties found'}
            </Text>
            {varieties.length === 0 && (
              <View style={{ alignItems: 'center' }}>
                <TouchableOpacity style={styles.button} onPress={reloadData}>
                  <Text style={styles.buttonText}>Reload</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
    
          {varieties.length > 0 && (
            <FlatList 
              style= {{ width: '100%', borderRadius: 30, paddingTop: 20 }}
              bounces={false}
              showsVerticalScrollIndicator={false}
              data={varieties}
              keyExtractor={(item: Product) => item.id}
              renderItem={({ item: product }) => (
                <BrandBox product={product} handleSelectProduct={() => handleSelectProduct(product)} extendedWidth={true} />
              )}
            />
          )}
    
        </ScrollView>
        <ShopFooter navigation={navigation} />
      </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCCC7C',
    width: '100%',
  },
  basketContent: {   
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  space: {
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'white',
  },
  subscriptionInfo: {
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    width: '70%',  // You can adjust this value to suit your needs
},
  subscriptionInfoHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    fontFamily: 'OpenSans-Bold',
    textAlign: 'center',
  },
  subscriptionInfoDescription: {
    fontSize: 17,
    fontFamily: 'OpenSans-Regular',
  },
  noBrandTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'white',
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
    backgroundColor: '#FF6347',
    borderRadius: 5,
    padding: 10,
    margin: 20,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  footerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default BrandVarieties;