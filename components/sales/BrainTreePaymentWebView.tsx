import React from 'react';
import { StyleSheet, Text, View, Alert, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';

const HOST = "https://candii4-backend2-3f9abaacb350.herokuapp.com";

const htmlContent = `
  <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <script src="https://js.braintreegateway.com/web/dropin/1.33.2/js/dropin.min.js"></script>
    </head>
    <body style="display:flex;flex-direction: column;">
        <div id="dropin-container"></div>
        <button id="submit-button" class="paymentButton">COMPLETE PAYMENT</button>
        <script>
            var button = document.querySelector('#submit-button');
            braintree.dropin.create({
                authorization: 'sandbox_6mjnqzhr_ts7vf8223fdkf9kq', 
                container: '#dropin-container'
            }, function (createErr, instance) {
                button.addEventListener('click', function () {
                    button.textContent = "PROCESSING PAYMENT";
                    instance.requestPaymentMethod((requestPaymentMethodErr, payload) => {
                        // Send payload to React Native to send to the server
                        window.ReactNativeWebView.postMessage(payload.nonce);
                    });
                });
            });
        </script>
    </body>
  </html>`;

const BrainTreePaymentWebView = () => {
  const onNonceRetrieved = async (nonce) => {
    const response = await axios.post(`${HOST}/createPaymentTransaction`, {
      amount: 10, //change to price gotten from your user
      nonce: nonce,
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
      }
    });
    const { isPaymentSuccessful, errorText } = await response.data;
    Alert.alert(isPaymentSuccessful ? "Payment successful" : `Payment error - ${errorText}`);
  }

  return (
    <View style={{ height: 450, alignItems: 'center' }}>
      <Text style={{ fontSize: 30, fontWeight: '500' }}>Pay</Text>
      <WebView
        source={{ html: require('./braintree.html') }}
       
        onMessage={(event) => {
            onNonceRetrieved(event.nativeEvent.data);
          }}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.error('WebView error: ', nativeEvent);
          }}
          onHttpError={({nativeEvent}) => {
            console.log('WebView received error status code: ', nativeEvent.statusCode);
          }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BrainTreePaymentWebView;
