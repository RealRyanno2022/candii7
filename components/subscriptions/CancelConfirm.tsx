import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import StyledText from '../../StyledText';

type CancelConfirmProps = {
  route: {
    params: {
      isSubscribed: boolean;
      setIsSubscribed: React.Dispatch<React.SetStateAction<boolean>>;
    };
  };
  navigation: any; // Update the type for the navigation prop
};

const CancelConfirm: React.FC<CancelConfirmProps> = ({ route, navigation }) => {
  const { isSubscribed, setIsSubscribed } = route.params;

  // Simulate cancellation of subscription
  const handleContinue = () => {
    setIsSubscribed(false);
    navigation.navigate('SubSignUp');
  };

  return (
    <View style={styles.container}>
      <StyledText style={styles.title}>
        {isSubscribed ? 'Cancelling your subscription...' : 'Your subscription has been cancelled.'}
      </StyledText>

      {!isSubscribed && (
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <StyledText style={styles.buttonStyledText}>Continue</StyledText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonStyledText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default CancelConfirm;