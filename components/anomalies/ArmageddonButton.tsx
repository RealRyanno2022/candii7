import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import StyledText from '../../StyledText';
const ArmageddonButton = () => {
  const crashThisBash = () => {
    throw new Error("CrashApp... Get it? Crash? App? Like CashApp? Yeah, I'll show myself out. ");
  };

  return (
    <View style={styles.hellsGate}>
      <TouchableOpacity
        style={styles.bigRedButton}
        onPress={crashThisBash}
      >
       
        <StyledText style={styles.text}>Restart</StyledText>
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
  hellsGate: {
    justifyContent: 'center',
  },
  bigRedButton: {
    margin: 20,
    alignItems: 'center',
    backgroundColor: '#8B0000',
    padding: 10,
    borderRadius: 50,
    width: 200,
    alignSelf: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});


export default ArmageddonButton;