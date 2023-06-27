import React, { useRef, useState, useEffect } from 'react';
import { View, TextInput, TextInputProps, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import { HelperText } from 'react-native-paper';
import { StyleProp, ViewStyle } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import countryStateArray from '../data/countryStateArray';
import countriesWithCities from '../data/countriesWithCities';
import validCountries from '../data/validCountries';

type FormInputProps = {
  control: any;
  name: string;
  label: string;
  errors: any;
  rules?: any;
  placeholder?: string; // Add placeholder prop to the interface
  setCountry?: any;
  style?: StyleProp<ViewStyle>;
};

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



const FormInput: React.FC<FormInputProps> = ({  style, control, name, label, errors, rules, placeholder}) => {
  const layoutRef = useRef<number | null>(null);
  const inputRef = useRef<TextInput | null>(null);

  const [country, setCountry] = useState('');

  const [state, setState] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [postCode, setPostCode] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

    
  const formFields = [
    { name: 'email', label: 'Email', placeholder: 'Enter your email', rules: { required: 'This field is required', validate: validateEmail } },
    { name: 'firstName', label: 'First name', placeholder: 'Enter your first name', rules: { required: 'This field is required', validate: validateFirstName } },
    { name: 'lastName', label: 'Last name ', placeholder: 'Enter your last name', rules: { required: 'This field is required', validate: validateLastName } },
    { name: 'phoneNumber', label: 'Phone number ', placeholder: 'Enter your phone number', rules: { required: 'This field is required', validate: validatePhoneNumber } },
    { name: 'city', label: 'City ', placeholder: 'Enter your city', rules: { required: 'This field is required', validate: validateCity } },
    { name: 'country', label: 'Country ', placeholder: 'Select your country', rules: { required: 'This field is required', validate: validateCountry } },
    { name: 'state', label: country === 'Ireland' ? 'County ' : 'State ', placeholder: country === 'Ireland' ? 'Enter your county' : 'Enter your state', rules: { required: 'This field is required', validate: validateStateOrCounty } },
    { name: 'postcode', label: country === 'Ireland' ? 'Eir Code' : 'Post Code', placeholder: 'Enter your postcode', rules: { validate: validatePostOrEirCode } },
  ];

  useEffect(() => {
    // Get the stored value from AsyncStorage when the component loads
    const loadStoredValue = async () => {
      const storedValue = await AsyncStorage.getItem(name);
      if (storedValue) {
        control.setValue(name, storedValue);
      }
    };

    loadStoredValue();
  }, [name, control]);

  return (
    <View
      onLayout={event => {
        layoutRef.current = event.nativeEvent.layout.y;
      }}
    >
      Controller
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          onBlur={onBlur}
          onChangeText={async (value: string) => {
            // Save the value to AsyncStorage whenever it changes
            await AsyncStorage.setItem(name, value);
            onChange(value);
            if (setCountry) setCountry(value);
          }}
          value={value}
          ref={inputRef}
          style={styles.input}
          placeholder={placeholder} // Add placeholder prop here
        />
      )}
      name={name}
      defaultValue="""
      {errors[name] && <HelperText type="error">{errors[name].message}</HelperText>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    fontSize: 20,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    fontWeight: 'bold',
  },
});

export default FormInput;