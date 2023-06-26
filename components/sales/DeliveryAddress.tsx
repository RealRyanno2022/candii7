import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView,Alert, Platform, TouchableOpacity, ScrollView, StyleSheet, Linking } from 'react-native';
import { TextInput, HelperText, Button } from 'react-native-paper';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import BrainTreePaymentWebView from './BrainTreePaymentWebView';
import { WebView } from 'react-native-webview';
import axios from 'axios';


import countryStateArray from '../data/countryStateArray';
import countriesWithCities from '../data/countriesWithCities';
import validCountries from '../data/validCountries';

import ShopHeader from '../shop/ShopHeader';
import FormInput from './FormInput';

type SubmitHandlerType = (data: UserData) => Promise<void>;

type DeliveryAddressProps = {
  navigation: any;
}

type UserData = {
  state: string;
  country: string;
  email: string;
  address: string;
  phoneNumber: string;
  postCode: string;
  firstName: string;
  lastName: string;
  basket: BasketItem[];
};

const HOST = "https://candii4-backend2-3f9abaacb350.herokuapp.com/";

const axiosInstance = axios.create({
  strictSSL: false, // Disable strict SSL certificate checking if needed
  validateStatus: () => true, // Allow all status codes to be considered successful
});
const DeliveryAddress: React.FC<DeliveryAddressProps> = ({ navigation }) => {

  const [paymentURL, setPaymentURL] = useState('');

  const [paymentStarted, setPaymentStarted] = useState(false);



  const { control, handleSubmit, formState: { errors } } = useForm<UserData>();

  const userData = {
    state: 'YourState', 
    country: 'YourCountry', 
    email: 'YourEmail', 
    address: 'YourAddress', 
    phoneNumber: 'YourPhoneNumber', 
    postCode: 'YourPostCode', 
    firstName: 'YourFirstName', 
    lastName: 'YourLastName'
  };

  const submit = 0;

  const onSubmit: SubmitHandler<UserData> = async (data) => {
   


    // await saveUserInformation(data);
    fetchClientToken();

    setPaymentStarted(true); 
  };

  const handleSubmitOnPress = handleSubmit(onSubmit);

  console.log('onSubmit function called');
  console.log('Form data:', data);

  const fetchClientToken = async () => {
    const response = await axios.get(`${HOST}/client_token`, { 
      headers: { 
        'Cache-Control': 'no-cache'
      }
    });
    const clientToken = await response.data;
    console.log('clientToken: ' + clientToken);
    return clientToken;
  }
  


  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.container}>
          <ShopHeader
           navigation={navigation} />
          <ScrollView contentContainerStyle={{ paddingBottom: 100 }} bounces={false}  >
            <View style={{ paddingBottom: 100 }}>
              {/* {!paymentStarted ? (  // Conditional rendering based on paymentStarted state
                <>
                  {renderLabel('Delivery Address', true)}
                  {formFields.map(field => (
                    <View key={field.name}>
                      {renderLabel(field.label, !!field.rules.required)}
                      <FormInput
                        key={field.name}
                        name={field.name}
                        label={field.label}
                        placeholder={field.placeholder}
                        rules={field.rules}
                        control={control}
                        errors={errors}
                        setCountry={field.setCountry ? setCountry : undefined}
                        style={styles.formFieldsText} // Update the style prop here
                      />
                    </View>
                  ))}
                  <View style={styles.card}>
                    <View id="dropin-container" style={{ marginBottom: 20 }} />
                    <TouchableOpacity onPress={handleSubmitOnPress} style={styles.button}>
                      <Text style={styles.buttonText}>Confirm and Pay</Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : ( */}
                <BrainTreePaymentWebView navigation={navigation} />
              {/* )} */}
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 20,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  labelText: {
    fontSize: 24,
  },
  formFieldsText: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    textAlign: 'left', // Add this line
  },
  asterisk: {
    fontSize: 16,
    color: 'red',
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    flexGrow: 1,
  },
  space: {
    marginTop: 150,
  },
  card: {
    width: '90%', // Increase the width here
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
    alignSelf: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    backgroundColor: '#FCCC7C',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    justifyContent: 'center',
    width: '100%',
  },
  input: {
    width: '100%', // Add this style
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default DeliveryAddress;