import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import images from '../data/images';
import BrandData from '../data/BrandData';
import StyledText from '../../StyledText';


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

type BrandBoxProps = {
  product: Product;
  handleSelectProduct: () => void;
  extendedWidth?: boolean;
};

const BrandBox: React.FC<BrandBoxProps> = ({
  product, handleSelectProduct, extendedWidth=false
}) => {
  return (
    <TouchableOpacity onPress={handleSelectProduct} style={extendedWidth ? styles.extendedBrandBox : styles.brandBox}>
      <View style={styles.productInfo}>
        {product.image && product.image.length > 0 ? (
          <Image source={{ uri: product.image }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <StyledText style={styles.placeholderStyledText}>Image Unavailable</StyledText>
          </View>
        )}
      </View>
      <StyledText style={styles.productName}>{product.name}</StyledText>
      <StyledText style={styles.productPrice}>{`€${product.price?.toFixed(2)}`}</StyledText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  brandBox: {
    padding: 10,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 40, // here change the value
    elevation: 2, // for android
    shadowColor: '#000', // for ios
    shadowOffset: { width: 0, height: 2 }, // for ios
    shadowOpacity: 0.1, // for ios
    shadowRadius: 2, // for ios
    width: '80%',
  },
  extendedBrandBox: {
    padding: 10,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 20, // and here change the value
    elevation: 2, // for android
    shadowColor: '#000', // for ios
    shadowOffset: { width: 0, height: 2 }, // for ios
    shadowOpacity: 0.1, // for ios
    shadowRadius: 2, // for ios
    width: '100%', // set width to 100% when extendedWidth prop is passed  
  },
  imagePlaceholder: {
    width: '80%',
    height: 200,
    borderRadius: 5,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderStyledText: {
    color: '#999',
    fontSize: 18,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 16,
    color: 'black',
    marginTop: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productInfo2: {
    marginTop: 10,
    backgroundColor: '#fff', 
  },
  productInfoHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  productInfo: {
    marginTop: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',  
    alignItems: 'center',     
  },
  image: {
    width: '80%',
    height: 200,
    borderRadius: 5,
  },
  productInfoDescription: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginTop: 10,
  },
  priceselectedQuantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  selectedQuantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedQuantityStyledText: {
    marginHorizontal: 10,
    fontSize: 18,
  },
  buyButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buyButtonStyledText: {
    color: '#fff',
    fontSize: 18,
  },
  buttonSpacing: {
    marginTop: 20,
  },
  space: {
    height: 20,
  },
});

export default BrandBox;