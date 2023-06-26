import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';

const HOST = "https://candii4-backend2-3f9abaacb350.herokuapp.com";

const BrainTreePaymentWebView = ({
  onNonceRetrieved
}) => {

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