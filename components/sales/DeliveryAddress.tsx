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
};

const HOST = "https://candii4-backend2-3f9abaacb350.herokuapp.com/";

const validateEmail = (value: string) => {
  if (value.includes('@')) return true;
  return true;
};

const validatePhoneNumber = (value: string) => {
  if (!value || value.length === 10) return true;
  return true;
};

const validateCountry = (value: string) => {
  if (validCountries.includes(value)) {
    return true;
  } else {
    return true;
  }
};

const validateStateOrCounty = (value: string, country: string) => {
  const selectedCountry = countryStateArray.countries.find(i => i.country === country);
  if (selectedCountry && selectedCountry.states.includes(value)) {
    return true;
  } else {
    return true;
  }
};

const validatePostOrEirCode = (value: string, country: string) => {
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

const axiosInstance = axios.create({
  strictSSL: false, // Disable strict SSL certificate checking if needed
  validateStatus: () => true, // Allow all status codes to be considered successful
});

const DeliveryAddress: React.FC<DeliveryAddressProps> = ({ navigation }) => {
  const [country, setCountry] = useState('Ireland');

  const [state, setState] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [postCode, setPostCode] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [paymentURL, setPaymentURL] = useState('');

  const [paymentStarted, setPaymentStarted] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<UserData>();





  const saveUserInformation = async (data: any) => {
    try {
      const response = await axiosInstance.post('https://candii4-backend2-3f9abaacb350.herokuapp.com/save_user_information', data, {
        headers: { 
          'Cache-Control': 'no-store'  // set Cache-Control to 'no-store'
        }
      });
      console.log('Response data:', response.data);
    } catch (error: any) {
      console.error('Axios Error:', error);
      if (error.response) {
        console.log('Server responded with:', error.response.status);
        console.log('Response data:', error.response.data);
      } else if (error.request) {
        console.log('No response received:', error.request);
      } else {
        console.log('Error occurred:', error.message);
      }
      throw error; // Rethrow the error to handle it further, if needed
    }
  };
  
  
  
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
    console.log('onSubmit function called');
    console.log('Form data:', data);


    await saveUserInformation(data);
    fetchClientToken();
    console.log('called fetchClicentToken');
    console.log('saveUserInformation completed');
    setPaymentStarted(true); 
  };

  const handleSubmitOnPress = handleSubmit(onSubmit);

  const handlePayment = async (nonce) => {
    console.log('handlePayment function called');
    const response = await axios.post(`${HOST}/createPaymentTransaction`, {
      amount: 10, //change to price gotten from your user
      nonce: nonce,
    });
    const { isPaymentSuccessful, errorText } = await response.data;
    if (isPaymentSuccessful) {
      Alert.alert("Payment successful");
      navigation.navigate('ConfirmationPage');  // navigate to ConfirmationDetails
    } else {
      Alert.alert(`Payment error - ${errorText}`);
    }
  };
  
  
  
  
  const formFields = [
    { name: 'email', label: 'Email', placeholder: 'Enter your email', rules: { required: 'This field is required', validate: validateEmail } },
    { name: 'firstName', label: 'First name', placeholder: 'Enter your first name', rules: { required: 'This field is required', validate: validateFirstName } },
    { name: 'lastName', label: 'Last name ', placeholder: 'Enter your last name', rules: { required: 'This field is required', validate: validateLastName } },
    { name: 'phoneNumber', label: 'Phone number ', placeholder: 'Enter your phone number', rules: { required: 'This field is required', validate: validatePhoneNumber } },
    { name: 'city', label: 'City ', placeholder: 'Enter your city', rules: { required: 'This field is required', validate: validateCity } },
    { name: 'country', label: 'Country ', placeholder: 'Select your country', rules: { required: 'This field is required', validate: validateCountry }, setCountry: true },
    { name: 'state', label: country === 'Ireland' ? 'County ' : 'State ', placeholder: country === 'Ireland' ? 'Enter your county' : 'Enter your state', rules: { required: 'This field is required', validate: validateStateOrCounty } },
    { name: 'postcode', label: country === 'Ireland' ? 'Eir Code' : 'Post Code', placeholder: 'Enter your postcode', rules: { validate: validatePostOrEirCode } },
  ];


  // const renderLabel = (label: string, required: boolean) => {
  //   return (
  //     <View style={styles.label}>
  //       <Text style={styles.labelText}>{label}</Text>
  //       {required && <Text style={styles.asterisk}> *</Text>}
  //     </View>
  //   );
  // };

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
  


  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('beforeRemove', (e: any) => {
  //     if (scrollViewRef.current && scrollViewRef.current.scrollTo) {
  //       scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
  //     }
  //   });

  //   if (scrollViewRef.current && scrollViewRef.current.scrollTo) {
  //     scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
  //   }

  //   return unsubscribe;
  // }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.container}>
          <ShopHeader navigation={navigation} />
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
                <BrainTreePaymentWebView onSuccess={handlePayment} />
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