import React, { useState } from 'react';
import { Button, Alert } from 'react-native';
import BraintreeDropIn from 'react-native-braintree-payments-drop-in';

interface BraintreeDropInComponentProps {
  navigation: any;
  onPaymentCompleted: (nonce: string) => void;
}

const BraintreeDropInComponent: React.FC<BraintreeDropInComponentProps> = ({ onPaymentCompleted, navigation }) => {
  const [authorization, setAuthorization] = useState('');

  // Request client token from server when component mounts
  React.useEffect(() => {
    fetch('https://candii4-backend2-3f9abaacb350.herokuapp.com/client_token')
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to fetch client token");
        }
        return res.text();
      }) // Parse the response as text
      .then(setAuthorization) // Update state with client token
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handlePayment = async () => {
    try {
      const nonce = await BraintreeDropIn.show({
        clientToken: authorization,
      });
      console.log("payment method nonce: ", nonce);
      onPaymentCompleted(nonce);
    } catch (error) {
      if (error.code === 'USER_CANCELLATION') {
        // update your UI to handle cancellation
      } else {
        // update your UI to handle other errors
        console.error(error);
      }
    }
  };

  return (
    <Button 
      title="Pay" 
      onPress={handlePayment}
      disabled={!authorization} 
    />
  );
};

export default BraintreeDropInComponent;  
