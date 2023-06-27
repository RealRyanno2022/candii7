import React, { useRef, useState, useEffect } from 'react';
import { View, TextInput, TextInputProps, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import { HelperText } from 'react-native-paper';
import { StyleProp, ViewStyle } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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





const FormInput: React.FC<FormInputProps> = 
({ style, control, name, label, errors, rules, placeholder }) => {
  const layoutRef = useRef<number | null>(null);
  const inputRef = useRef<TextInput | null>(null);



    

  useEffect(() => {
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
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={async (value: string) => {
              // Save the value to AsyncStorage whenever it changes
              await AsyncStorage.setItem(name, value);
              onChange(value);
            }}
            value={value}
            ref={inputRef}
            style={styles.input}
            placeholder={placeholder} // Add placeholder prop here
          />
        )}
        name={name}
        defaultValue=""
      />
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