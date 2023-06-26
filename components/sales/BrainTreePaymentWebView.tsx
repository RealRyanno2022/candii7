import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';


const HOST = "https://candii4-backend2-3f9abaacb350.herokuapp.com";

type BrainTreePaymentWebViewProps = {
    navigation: any;
}

const BrainTreePaymentWebView: React.FC<BrainTreePaymentWebViewProps> = ({navigation}) => {

  const axiosInstance = axios.create({
    strictSSL: false, // Disable strict SSL certificate checking if needed
    validateStatus: () => true, // Allow all status codes to be considered successful
  });

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

    const onNonceRetrieved = async (nonce) => {
        console.log('Nonce retrieved:', nonce); // Log the nonce value

        try {
            const response = await axios.post(`${HOST}/createPaymentTransaction`, {
              amount: 0.01, 
              nonce: nonce,
            }, {
              headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
              }
            });

            console.log('Server response:', response.data); // Log the server response

            const { isPaymentSuccessful, errorText } = await response.data;
            Alert.alert(isPaymentSuccessful ? "Payment successful" : `Payment error - ${errorText}`);
            if (isPaymentSuccessful) await saveUserInformation(data);
            navigation.navigate('ConfirmationPage');  // navigate to ConfirmationPage

        } catch (error) {
            console.error('Error during payment:', error); // Log any error that occurs during the payment process
        }
      }

  return (
    <View style={{ height: 450 }}>
      <Text style={{ fontSize: 30, fontWeight: '500' }}></Text>
      <WebView
        source={{ uri: `${HOST}/braintree` }}
        onMessage={(event) => {
          onNonceRetrieved(event.nativeEvent.data);
        }}
      />
    </View>
  )
}
export default BrainTreePaymentWebView;
