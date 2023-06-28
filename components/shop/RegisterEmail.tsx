import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Alert,
  ActivityIndicator,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AntDesign } from '@expo/vector-icons';
import ShopHeader from './ShopHeader';
import ShopFooter from './ShopFooter';
import { StackParamList } from '../../types/types';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StyledText from '../../StyledText';

type RegisterEmailProps = {
  navigation: StackNavigationProp<StackParamList, 'RegisterEmail'>;
  emailVerified: boolean;
};

const RegisterEmail: React.FC<RegisterEmailProps> = ({ navigation, emailVerified }) => {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationInProcess, setVerificationInProcess] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [addedEmail, setAddedEmail] = useState<Array<{ email: string, verified: boolean }>>([]);
  

  // Dummy
  const IDVerified = false;



  useEffect(() => {
    const getEmail = async () => {
      const storedEmails = await AsyncStorage.getItem('email');
      if (storedEmails !== null) {
        setAddedEmail(JSON.parse(storedEmails));
      }
    };

    getEmail();
  }, []);

  useEffect(() => {
    const checkEmailVerification = async () => {
      const emailVerificationData = await AsyncStorage.getItem('emailVerification');
      if (emailVerificationData !== null) {
        const { email, inProcess } = JSON.parse(emailVerificationData);
        setVerificationEmail(email);
        setVerificationInProcess(inProcess);
      }
    };

    checkEmailVerification();
  }, []);


  useEffect(() => {
    const storeEmail = async () => {
      await AsyncStorage.setItem('emails', JSON.stringify(addedEmail));
    };

    storeEmail();
  }, [addedEmail]);

  const handleAddPress = async () => {
    const emailExistsAndVerified = addedEmail.find(
      (e) => e.email === email && e.verified === true
    );
  
    if (emailExistsAndVerified) {
      Alert.alert('You have already verified this email');
      handleVerifiedEmail();
      return;
    }
  
    if (email && !verificationEmail && addedEmail.length < 1) {  
      setAddedEmail(prev => [...prev, { email, verified: false }]);
      setVerificationEmail(email);
      setEmail('');
      setVerificationInProcess(true);
      await AsyncStorage.setItem('emailVerification', JSON.stringify({ email, inProcess: true }));
      Alert.alert('A six-digit verification code has been sent to your e-mail address, if it exists.');
    } else if (!verificationEmail) {
      Alert.alert('Please enter a valid e-mail address.');
    }
  };

  const handleDeletePress = (emailToDelete: string) => {
    Alert.alert('Verification process stopped. Re-enter your e-mail');
    handleConfirmDelete(emailToDelete);
    setVerificationEmail(''); // Clear verificationEmail when email is deleted
    setVerificationInProcess(false); // Stop the verification process
  };

  const handleConfirmDelete = (emailToDelete: string) => {
    setAddedEmail(prev => prev.filter(({ email }) => email !== emailToDelete));
    setShowModal(false);
  };

  const verificationCode2 = '123456';

  const handleVerify = async () => {
    if (verificationCode === verificationCode2) {
      setAddedEmail(prev => prev.map(({ email, verified }) => email === verificationEmail ? { email, verified: true } : { email, verified }));
      setVerificationEmail('');
      setVerificationCode('');
      setVerificationInProcess(false);
      await AsyncStorage.removeItem('emailVerification');
      Alert.alert('Success!', 'Your e-mail has been verified.');

      if(!IDVerified) {
        navigation.navigate('IDCheckScreen', { emailVerified: true, IDVerified: false });
      }
      navigation.navigate('DeliveryAddress', { emailVerified: true, IDVerified: true });
    } else {
      Alert.alert('Verification code is incorrect. Please try again.');
    }
  };

  const handleVerifiedEmail = () => {
    if(!IDVerified) {
      navigation.navigate('IDCheckScreen', { emailVerified: true, IDVerified: false });
    } else {
      navigation.navigate('DeliveryAddress', { emailVerified: true, IDVerified: true });
    }
  };

  const handlePressSpinner = () => {
    Alert.alert('Check your e-mail for a 6-digit code, especially your spam folder.');
  };

  const handleResendCode = () => {
    Alert.alert(`Sent code to ${verificationEmail}. Check your spam folder.`);
  };

  return (
    <View style={styles.container}>
    <>
      <ShopHeader navigation={navigation} />
      {!verificationInProcess ? (
        <ScrollView contentContainerStyle={styles.content} bounces={false}>
                          <Image
              source={require('../pictures/smoke.png')}
              style={styles.backgroundImage}
            />
          <View style={styles.subscriptionInfo}>
            <StyledText style={styles.title}>Add or Delete Email Address</StyledText>
          </View>
          <View style={styles.subscriptionInfo}>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.space} />
          <TouchableOpacity style={styles.signUpButton} onPress={handleAddPress}>
            <StyledText style={styles.signUpButtonStyledText}>Add Email</StyledText>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={styles.content} bounces={false}>
          {verificationInProcess && (
            <>
                       <Image
        source={require('../pictures/smoke.png')}
        style={styles.backgroundImage}
      />
              <View style={styles.subscriptionInfo}>
                <StyledText style={styles.title}>Enter your six digit code here:</StyledText>
              </View>
  
              <View style={styles.subscriptionInfo}>
                {!isVerified ? (
                  <TouchableOpacity onPress={handlePressSpinner}>
                    <ActivityIndicator size="small" color="#FF6347" />
                  </TouchableOpacity>
                ) : null}
  
                <StyledText style={styles.addedEmail}>{verificationEmail.length > 0 ? verificationEmail : 'No email given'}</StyledText>
                <TouchableOpacity onPress={() => handleDeletePress(email)}>
                  <Icon name="times" size={24} color="#FF6347" />
                </TouchableOpacity>
              </View>
              <View style={styles.subscriptionInfo}>
                <TextInput
                  style={styles.input}
                  value={verificationCode}
                  onChangeText={StyledText => {
                    const parsed = parseInt(StyledText, 10);
                    if (!isNaN(parsed)) {
                      setVerificationCode(parsed.toString());
                    }
                  }}
                  placeholder="Please enter a 6 digit code"
                  keyboardType="numeric"
                  autoCapitalize="none"
                  maxLength={6}
                />
              </View>
              <View style={styles.space} />
              <TouchableOpacity style={styles.signUpButton} onPress={handleVerify}>
                <StyledText style={styles.signUpButtonStyledText}>Verify</StyledText>
              </TouchableOpacity>
              <View style={styles.space} />
              <TouchableOpacity style={styles.signUpButton} onPress={handleResendCode}>
                <StyledText style={styles.signUpButtonStyledText}>Resend Code</StyledText>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      )}
    </>
    <ShopFooter navigation={navigation} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCCC7C',
  },
  space: {
    marginBottom: 10,
  },
  signUpButtonStyledText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'OpenSans-Bold',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Adjust the image resizing mode as needed
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  subscriptionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
    padding: 2.5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  content: { 
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexGrow: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    padding: 10,
  },
  addedEmail: {
    marginHorizontal: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: '65%',
    margin: 12,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    padding: 10,
  },
  signUpButton: {
    backgroundColor: '#FF6347',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    width: 130,
  },
});


export default RegisterEmail;
