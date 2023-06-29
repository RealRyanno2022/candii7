import React, { useState } from 'react';
import { View, KeyboardAvoidingView,Alert, Platform, TouchableOpacity, ScrollView, StyleSheet, Linking } from 'react-native';
import { TextInput, HelperText, Button } from 'react-native-paper';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import BrainTreePaymentWebView from './BrainTreePaymentWebView';
import axios from 'axios';
import ShopFooter from '../shop/ShopFooter';

import StyledText from '../../StyledText';

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
  emailVerified: boolean;
  IDVerified: boolean;
  apartment: string;
  postcode: string;
};




const validateEmail = (value: string) => {
  if (value.includes('@')) return true;
  return 'Invalid Email';
};

const validateCountry = (value: string) => {
  if (validCountries.includes(value)) {
    return true;
  } else {
    return 'Invalid Country';
  }
};

const validateState = (value: string, country: string) => {
  const selectedCountry = countryStateArray.countries.find(i => i.country === country);
  if (selectedCountry && selectedCountry.states.includes(value)) {
    return true;
  } else {
    return 'Invalid State';
  }
};

const validatePostcode = (value: string) => {
    if (value.length === 5 || value.length === 6 /* && condition to check for alphanumeric */) {
      return true;
    } else {
      return 'Invalid Postcode';
    }
};

const validateCity = (value: string) => {
  const countryKeys = Object.keys(countriesWithCities) as Array<keyof typeof countriesWithCities>;
  for (const country of countryKeys) {
    if (countriesWithCities[country].includes(value)) {
      return true;
    }
  }
  return 'Invalid City';
};

const validateFirstName = (value: string) => {
  if (value.length >= 2) {
    return true;
  } else {
    return 'First Name should be at least 2 characters long';
  }
};

const validateLastName = (value: string) => {
  if (value.length >= 3) {
    return true;
  } else {
    return 'Last Name should be at least 3 characters long';
  }
};








const HOST = "https://candii4-backend2-3f9abaacb350.herokuapp.com/";

const axiosInstance = axios.create({
  strictSSL: false, // Disable strict SSL certificate checking if needed
  validateStatus: () => true, // Allow all status codes to be considered successful
});
const DeliveryAddress: React.FC<DeliveryAddressProps> = ({ navigation }) => {

  const [paymentURL, setPaymentURL] = useState('');
  const [country, setCountry] = useState('');
  const [paymentStarted, setPaymentStarted] = useState(false);

  const resetPayment = () => {
    setPaymentStarted(false);
  };

  const { control, handleSubmit, formState: { errors } } = useForm<UserData>();

  const userData = {
    email: 'YourEmail',
    firstName: 'YourFirstName',
    lastName: 'YourLastName',
    country: 'YourCountry',
    state: 'YourState',
    city: 'YourCity',
    street: 'YourStreet',
    apartment: 'YourApartment',
    neighbourhood: 'YourNeighbourhood',
    postcode: 'YourPostcode',
  };




  const submit = 0;

  const formFields = [
    { name: 'email', label: 'Email', placeholder: 'Enter your email', rules: { required: 'This field is required', validate: validateEmail } },
    { name: 'firstName', label: 'First name', placeholder: 'Enter your first name', rules: { required: 'This field is required', validate: validateFirstName } },
    { name: 'lastName', label: 'Last name ', placeholder: 'Enter your last name', rules: { required: 'This field is required', validate: validateLastName } },
    { name: 'country', label: 'Country ', placeholder: 'Select your country', rules: { required: 'This field is required', validate: validateCountry }, setCountry: true }, // Add setCountry prop
    { name: 'state', label: 'State ', placeholder:'Enter your state', rules: { required: 'This field is required', validate: validateState } },
    { name: 'city', label: 'City ', placeholder: 'Enter your city', rules: { required: 'This field is required', validate: validateCity } },
    { name: 'street', label: 'Street ', placeholder: 'Enter your street ', rules: { required: 'This field is required' }},
    { name: 'apartment', label: 'Apartment ', placeholder: '(Optional) Enter your apartment code block and number' },
    { name: 'neighbourhood', label: 'Neighbourhood ', placeholder: 'Enter your neighbourhood ', rules: { required: 'This field is required' }},
    { name: 'postcode', label: 'Post Code ', placeholder: '(Optional) Enter your postcode', rules: { validate: validatePostcode }},
  ];

  const onSubmit: SubmitHandler<UserData> = async (data) => {
   


    // await saveUserInformation(data);
    fetchClientToken();

    setPaymentStarted(true); 
  };

  const handleSubmitOnPress = handleSubmit(onSubmit);

  console.log('onSubmit function called');
  // console.log('Form data:', data);

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


  const renderLabel = (label: string, isRequired: boolean) => {
    return (
      <View style={styles.label}>
        <StyledText style={styles.labelText}>{label}</StyledText>
        {isRequired && <StyledText style={styles.asterisk}>*</StyledText>}
      </View>
    );
  };
  


  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.container}>
          <ShopHeader
           navigation={navigation} />
          <ScrollView contentContainerStyle={{ paddingBottom: 100 }} bounces={false}  >
            <View style={{ paddingBottom: 100 }}>
              {!paymentStarted ? (  // Conditional rendering based on paymentStarted state
                <>
                <View style={styles.subscriptionInfo}>
                  <StyledText style={styles.subscriptionInfoHeader}>Delivery Information</StyledText>
                </View>
                  {formFields.map(field => (
                    <View key={field.name}>
                      {renderLabel(field.label, !!field.rules?.required)}
                      <FormInput
                        key={field.name}
                        name={field.name}
                        placeholder={field.placeholder}
                        rules={field.rules}
                        control={control}
                        errors={errors}
                        setCountry={field.setCountry ? setCountry : undefined}
                      />
                                          
                    </View>
                  ))}
                  <View style={styles.card}>
                    <View id="dropin-container" style={{ marginBottom: 20 }} />
                    <TouchableOpacity onPress={handleSubmitOnPress} style={styles.button}>
                      <StyledText style={styles.buttonText}>Confirm and Pay</StyledText>
                    </TouchableOpacity>
                    <ShopFooter navigation={navigation} />
                  </View>
                </>
              ) : (
                <BrainTreePaymentWebView resetPayment={resetPayment} navigation={navigation} />
              )}
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: '#FCCC7C',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 10,
  },
  asterisk: {
    color: 'red',
    fontSize: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
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
  subscriptionInfo: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  subscriptionInfoHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    fontFamily: 'OpenSans-Bold',
    textAlign: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    alignSelf: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});



export default DeliveryAddress;