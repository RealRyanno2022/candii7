
import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import StyledText from '../../StyledText';

type PrivacyPolicyProps = {
  navigation: any;
}


const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ navigation }) => {
  const [isPolicyAccepted, setIsPolicyAccepted] = useState(false);

  const handlePolicyAcceptance = () => {
    setIsPolicyAccepted(!isPolicyAccepted);
  };

  const handleContinue = () => {
    if (isPolicyAccepted) {
      // Handle logic to proceed further
      console.log('Continue button clicked');
      navigation.navigate('FormScreen');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <StyledText style={styles.headerStyledText}>Privacy Policy</StyledText>
      </View>  
      <View style={styles.policyContainer}>
      <ScrollView style={styles.policyScrollView} bounces={false}>
        <StyledText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at rutrum ipsum. Cras pharetra vulputate mattis.
        </StyledText>
      </ScrollView>
    </View>


      <StyledText style={styles.acceptanceStyledText}>I have read and accepted the Privacy Policy.</StyledText>
      <TouchableOpacity
        style={[styles.checkBox, isPolicyAccepted && styles.checkBoxSelected]}
        onPress={handlePolicyAcceptance}
      >
        {isPolicyAccepted && <StyledText style={styles.checkBoxStyledText}>✓</StyledText>}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.continueButton, isPolicyAccepted && styles.continueButtonActive]}
        onPress={handleContinue}
        disabled={!isPolicyAccepted}
      >
        <StyledText style={styles.continueButtonStyledText}>Continue</StyledText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FCCC7C',
  },
  header: {
    marginBottom: 20,
  },
  headerStyledText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  policyContainer: {
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
  },
  policyScrollView: {
    flex: 1,
  },
  acceptanceStyledText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 30,
    color: 'white',
  },
  policyContent: {
    padding: 10,
  },
  checkBox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
  },
  checkBoxStyledText: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'f5f5f5',
  },
  disabledCheckBox: {
    backgroundColor: 'f5f5f5',
  },
  continueButton: {
    width: 120,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A9A9A9',
  },
  continueButtonStyledText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  continueButtonActive: {
    backgroundColor: '#D3D3D3',
  },
});

export default PrivacyPolicy;