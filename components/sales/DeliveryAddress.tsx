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

const validateEmail = (value: string) => {
  if (value.includes('@')) return true;
  return true;
};

const validateCountry = (value: string) => {
  if (validCountries.includes(value)) {
    return true;
  } else {
    return true;
  }
};

const validateState = (value: string, country: string) => {
  const selectedCountry = countryStateArray.countries.find(i => i.country === country);
  if (selectedCountry && selectedCountry.states.includes(value)) {
    return true;
  } else {
    return true;
  }
};

const validatePostcode = (value: string, country: string) => {
  if (country === 'Ireland') {
    if (value.length === 7 && value[0] === 'string' && value[3] === 'string') {
      return true;
    } else {
      return true;
    }
  } else {
    if (value.length === 5 || value.length === 6 /* && condition to check for alphanumeric */) {
      return true;
    } else {
      return true;
    }
  }
};

const validateCity = (value: string) => {
  const countryKeys = Object.keys(countriesWithCities) as Array<keyof typeof countriesWithCities>;
  for (const country of countryKeys) {
    if (countriesWithCities[country].includes(value)) {
      return true;
    }
  }
  return true;
};

const validateFirstName = (value: string) => {
  if (value.length < 2) {
    return true;
  } else {
    return true;
  }
};

const validateLastName = (value: string) => {
  if (value.length < 3) {
    return true;
  } else {
    return true;
  }
};






const HOST = "https://candii4-backend2-3f9abaacb350.herokuapp.com/";

const axiosInstance = axios.create({
  strictSSL: false, // Disable strict SSL certificate checking if needed
  validateStatus: () => true, // Allow all status codes to be considered successful
});
const DeliveryAddress: React.FC<DeliveryAddressProps> = ({ navigation }) => {

  const [paymentURL, setPaymentURL] = useState('');

  const [paymentStarted, setPaymentStarted] = useState(false);

  const resetPayment = () => {
    setPaymentStarted(false);
  };

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

  const formFields = [
    { name: 'email', label: 'Email', placeholder: 'Enter your email', rules: { required: 'This field is required', validate: validateEmail } },
    { name: 'firstName', label: 'First name', placeholder: 'Enter your first name', rules: { required: 'This field is required', validate: validateFirstName } },
    { name: 'lastName', label: 'Last name ', placeholder: 'Enter your last name', rules: { required: 'This field is required', validate: validateLastName } },
    { name: 'country', label: 'Country ', placeholder: 'Select your country', rules: { required: 'This field is required', validate: validateCountry } },
    { name: 'state', label: 'State ', placeholder:'Enter your state', rules: { required: 'This field is required', validate: validateState } },
    { name: 'city', label: 'City ', placeholder: 'Enter your city', rules: { required: 'This field is required', validate: validateCity } },
    { name: 'apartment', label: 'Street ', placeholder: 'Enter your street ', rules: { required: 'This field is required' }},
    { name: 'apartment', label: 'Apartment ', placeholder: '(Optional) Enter your apartment code block and number' },
    { name: 'street', label: 'Neighbourhood ', placeholder: 'Enter your neighbourhood ', rules: { required: 'This field is required' }},
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
        <Text style={styles.labelText}>{label}</Text>
        {isRequired && <Text style={styles.asterisk}>*</Text>}
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
                  {formFields.map(field => (
                    <View key={field.name}>
                      {renderLabel(field.label, !!field.rules?.required)}
                      <FormInput
                        key={field.name}
                        name={field.name}
                        label={field.label}
                        placeholder={field.placeholder}
                        rules={field.rules}
                        control={control}
                        errors={errors}
                        setCountry={field.setCountry ? setCountry : undefined}
                        style={field.name === 'apartment' ? styles.smallPlaceholder : styles.formFieldsText}
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
  smallPlaceholder: {
    fontSize: 8,
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