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

type UserData = {
  state: string;
  country: string;
  email: string;
  address: string;
  phoneNumber: string;
  postCode: string;
  firstName: string;
  lastName: string;
  basket: BasketItem[];
  emailVerified: boolean;
  IDVerified: boolean;
  apartment: string;
  postcode: string;
};

const HOST = "https://candii4-backend2-3f9abaacb350.herokuapp.com";

const IDCheckScreen: React.FC<IDCheckScreenProps> = ({ navigation, emailVerified }) => {
  const [idImage, setIdImage] = useState('');
  const [IDVerified, setIDVerified] = useState(false);

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
          
          let data = new FormData();
            data.append('idImage', {
              uri: response.assets[0].uri,
              type: 'image/jpeg',
              name: 'idImage.jpg',
            });

            let apiUrl = `${HOST}/scan_front_of_id`;
            fetch(apiUrl, {
              method: 'post',
              body: data
            })
            .then(response => response.json())
            .then(response => {
              if (response.message) {
                Alert.alert('Verification Success', response.message);
                setIDVerified(true);
              } else {
                Alert.alert('Verification Failure', response.error);
              }
            });
        }
      }
    })
  }

  let data = new FormData();
data.append('idImage', {
  // uri : response.assets[0].uri,
  type: 'image/jpeg',
  name: 'idImage.jpg'
});

let apiUrl = '${HOST}/scan_front_of_id'; // replace with your API URL
fetch(apiUrl, {
  method: 'post',
  body: data
})
.then(response => response.json())
.then(response => {
  if (response.message) {
    Alert.alert('Verification Success', response.message);
  } else {
    Alert.alert('Verification Failure', response.error);
  }
});

let userData: UserData = {
  state: "Example State",
  country: "Example Country",
  email: "example@example.com",
  address: "123 Example St",
  phoneNumber: "123456789",
  postCode: "12345",
  firstName: "John",
  lastName: "Doe",
  basket: [], // Assuming BasketItem is defined somewhere
  emailVerified: emailVerified, // Assuming this is passed from the parent component
  IDVerified: IDVerified,
  apartment: "Example Apartment",
  postcode: "12345",
};



  return (
    <View style={styles.container}>
    
      <Image
        source={require('../pictures/smoke.png')}
        style={styles.backgroundImage}
      />
        <ShopHeader navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollViewContainer} bounces={false}>
        <View style={styles.subscriptionInfo2}>
          <StyledText style={styles.headerStyledText}>ID Check</StyledText>
        </View>
          <View style={styles.subscriptionInfo}>
            <StyledText style={styles.subscriptionInfoDescription}>
              Please provide a picture of the front and back of an identity card. You must be over 18 to buy from us. Fake ID is illegal. Ensure that we can verify your date of birth.
            </StyledText>
          </View>
          <View style={styles.space}></View>
          <View style={styles.uploadButtonCentre}>
          <TouchableOpacity onPress={handleIdUpload} style={styles.idUploadButton}>
            <Icon name="upload" size={30} color="gray" />
            <StyledText style={styles.idUploadButtonStyledText}>Upload Front of ID</StyledText>
          </TouchableOpacity>
          <View style={styles.space} />
          <TouchableOpacity onPress={handleIdUpload} style={styles.idUploadButton}>
            <Icon name="upload" size={30} color="gray" />
            <StyledText style={styles.idUploadButtonStyledText}>Upload Back of ID</StyledText>
          </TouchableOpacity>
          </View>
          {idImage.length > 0 && <StyledText style={styles.idUploadStatusStyledText}>ID uploaded. Verifying...</StyledText>}
          <View style={styles.bottomSpace}></View>
      </ScrollView>
      <ShopFooter navigation={navigation} />
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingVertical: 20,
  },
  header: {}, // Removed invalid property
  subscriptionInfoDescription: {
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
  },
  uploadButtonCentre: {
    alignItems: 'center',
  },
  space: {
    margin: 10,
  },
  bottomSpace: {
    marginBottom:60,
  },
  subscriptionInfo: {
    width: '80%', // adjust this value to make the boxes narrower or wider
    alignSelf: 'center', // this will center the boxes
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
  subscriptionInfo2: {
    width: '50%', 
    alignSelf: 'center',
    marginTop: 0,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },  
  subscriptionInfoHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'OpenSans-Bold',
  },
  subscriptionInfoBox: {
    width: '100%',
    alignItems: 'center',
  },
  headerStyledText: {
    fontSize: 36,
    fontWeight: 'bold',
    margin: 5,
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
  borderRadius: 10,  // increase from 5 to 10 to match the other boxes
  width: '60%',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 2,
  elevation: 2,
  },
  idUploadButtonStyledText: {
    marginLeft: 10,
    fontSize: 16,
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
    color: 'black',
    fontWeight: 'bold',
  },
});

export default IDCheckScreen;
