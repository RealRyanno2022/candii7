import React, { useState } from 'react';
import { View, TouchableOpacity, Alert, StyleSheet,Image, ScrollView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import ShopHeader from '../shop/ShopHeader';
import ShopFooter from '../shop/ShopFooter';
import StyledText from '../../StyledText';

type IDCheckScreenProps = {
  navigation: any;
  emailVerified: boolean;
  IDVerified: boolean;
};

const IDCheckScreen: React.FC<IDCheckScreenProps> = ({ navigation, emailVerified, IDVerified }) => {
  const [idImage, setIdImage] = useState('');

  const handleIdUpload = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        Alert.alert('Image picker cancelled', 'You need to upload your ID for verification. Please try again.');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
        Alert.alert('Image picker error', `Error picking image: ${response.errorMessage}`);
      } else {
        if (response.assets && response.assets[0] && response.assets[0].uri) {
          setIdImage(response.assets[0].uri);
          // Simulating a call to backend server for ID verification
          setTimeout(() => {
            const verificationPassed = Math.random() < 0.5;
            if (verificationPassed) {
              Alert.alert('Verification Success', 'Your ID has been verified. Happy shopping!');
              navigation.navigate('DeliveryAddress');
            } else {
              Alert.alert('Verification Failure', 'Unfortunately, you have failed the ID test.');
              navigation.navigate('ShopFront');
            }
          }, 2000);
        }
      }
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ShopHeader navigation={navigation} />
      <View style={styles.container}>
        <ScrollView bounces={false}>
        <Image
            source={require('../pictures/smoke.png')}
            style={styles.backgroundImage}
          />
          <View style={styles.header}>
            <StyledText style={styles.headerStyledText}>ID Check</StyledText>
          </View>
          <View style={styles.subscriptionInfo}>
            <StyledText style={styles.subscriptionInfoDescription}>
              Please provide a picture of the front and back of an identity card. You must be over 18 to buy from us. Fake ID is illegal.
            </StyledText>
          </View>
          <View style={styles.subscriptionInfo}>
            <StyledText style={styles.subscriptionInfoDescription}>
             Ensure that we can verify your date of birth.
            </StyledText>
          </View>
          <View style={styles.space}></View>
          <TouchableOpacity onPress={handleIdUpload} style={styles.idUploadButton}>
            <Icon name="upload" size={30} color="white" />
            <StyledText style={styles.idUploadButtonStyledText}>Upload Front of ID</StyledText>
          </TouchableOpacity>
          <View style={styles.space} />
          <TouchableOpacity onPress={handleIdUpload} style={styles.idUploadButton}>
            <Icon name="upload" size={30} color="white" />
            <StyledText style={styles.idUploadButtonStyledText}>Upload Back of ID</StyledText>
          </TouchableOpacity>
          {idImage.length > 0 && <StyledText style={styles.idUploadStatusStyledText}>ID uploaded. Verifying...</StyledText>}
          <View style={styles.space}></View>
        </ScrollView>
      </View>
      <ShopFooter navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FCCC7C',
  },
  header: {}, // Removed invalid property
  subscriptionInfoDescription: {
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
  },
  space: {
    margin: 10,
  },
  subscriptionInfo: {
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  subscriptionInfoHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    fontFamily: 'OpenSans-Bold',
  },
  subscriptionInfoBox: {
    width: '100%',
    alignItems: 'center',
  },
  headerStyledText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
    textAlign: 'center', // textAlign moved here and corrected typo
  },
  subStyledText: {
    fontSize: 16,
    marginBottom: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  idUploadButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#D3D3D3',
    borderRadius: 5,
  },
  idUploadButtonStyledText: {
    marginLeft: 10,
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
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
  idUploadStatusStyledText: {
    marginTop: 20,
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default IDCheckScreen;
