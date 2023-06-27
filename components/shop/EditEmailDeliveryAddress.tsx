import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import FormInput from '../sales/FormInput';

import StyledText from '../../StyledText';

type UserAddress = {
  address: string;
}

const EditEmailDeliveryAddress: React.FC = () => {
  const [userAddress, setUserAddress] = useState<UserAddress | null>(null);
  const { control, handleSubmit, formState: { errors } } = useForm();

  // Fetch user's address
  const fetchUserAddress = async () => {
    // TODO: Replace this with your actual API call to get the user's address
    const result: UserAddress | null = null;
    setUserAddress(result);
  };

  useEffect(() => {
    fetchUserAddress();
  }, []);

  const onSubmit = (data: any) => {
    // TODO: Submit the form
  };

  return (
    <View style={styles.container}>
      {userAddress ? (
        <FormInput
          control={control}
          name="address"
          label="Address"
          errors={errors}
          placeholder={userAddress.address}
          style={styles.input}
          editable={false} // Make this input non-editable
        />
      ) : (
        <StyledText style={styles.noAddressStyledText}>You do not have a delivery address registered to this e-mail. Would you like to add one?</StyledText>
      )}
      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
        <StyledText style={styles.buttonStyledText}>Edit Address</StyledText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  noAddressStyledText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 10,
  },
  button: {
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FF6347',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonStyledText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    marginBottom: 20,
  },
});

export default EditEmailDeliveryAddress;