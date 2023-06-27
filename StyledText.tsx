import React from 'react';
import { Text, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';


Font.loadAsync({
    'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
});

// Easily add internationalisation later (at the very end)

const StyledText = ({ children, style, bold = false, ...props }) => (
  <Text style={[styles.text, bold ? styles.bold : styles.regular, style]} {...props}>
    {/* {i18n.t(children)} */}




  </Text>
);

const styles = StyleSheet.create({
  text: {
    fontFamily: 'OpenSans-Regular',
  },
  regular: {
    fontFamily: 'OpenSans-Regular',
  },
  bold: {
    fontFamily: 'OpenSans-Bold',
  },
});

export default StyledText;