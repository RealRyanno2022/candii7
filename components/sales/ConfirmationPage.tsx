import React from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { Header, SearchBar, Icon } from 'react-native-elements';
import ShopHeader from '../shop/ShopHeader';
import ShopFooter from '../shop/ShopFooter';
import BrandBox from '../shop/BrandBox';
import { StackParamList } from '../../types/types';
import { StackActions } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';

type ConfirmationPageProps = {
  navigation: NavigationProp<StackParamList>;
};

const ConfirmationPage: React.FC<ConfirmationPageProps> = ({ navigation }) => {

  const handleContinueShopping = () => {
    navigation.dispatch(StackActions.push('ShopFront'));
  };




  return (
    <View>
      <ShopHeader navigation={navigation} />
      <View style={styles.container}>
        <Text style={styles.title}>Order Confirmation</Text>



        <Text style={styles.confirmation}>
          Your order has been placed successfully! You will receive an email confirmation shortly.
        </Text>

        <Button onPress={handleContinueShopping} title="Continue Shopping" />
      </View>
      <ShopFooter navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  details: {
    fontSize: 18,
    marginBottom: 10,
  },
  confirmation: {
    fontSize: 16,
    marginBottom: 20,
    color: 'green',
  },
});

export default ConfirmationPage;