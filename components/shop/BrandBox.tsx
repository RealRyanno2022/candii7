import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import images from '../data/images';
import BrandData from '../data/BrandData';

type Product = {
  id: string;
  name: string; 
  price: number;
  brand: string;
  image: string;
};

type BrandBoxProps = {
  product: Product;
  handleSelectProduct: () => void;
};

const BrandBox: React.FC<BrandBoxProps> = ({
  product, handleSelectProduct
}) => {

  return (
    <TouchableOpacity onPress={handleSelectProduct}>
      <View style={styles.productInfo}>
        {product.image && product.image.length > 0 ? (
          <Image source={{ uri: product.image }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>Image Unavailable</Text>
          </View>
        )}
      </View>
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>{`${product.price?.toFixed(2)}`}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  brandBox: {
    padding: 10,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2, // for android
    shadowColor: '#000', // for ios
    shadowOffset: { width: 0, height: 2 }, // for ios
    shadowOpacity: 0.1, // for ios
    shadowRadius: 2, // for ios
  },
  imagePlaceholder: {
    width: '80%',
    height: 200,
    borderRadius: 5,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#999',
    fontSize: 18,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  productPrice: {
    fontSize: 16,
    color: '#999',
    marginTop: 5,
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
  selectedQuantityText: {
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
  buyButtonText: {
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