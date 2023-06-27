import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native';
import { StackActions } from '@react-navigation/native';
import StyledText from '../../StyledText';

type LazySubSignUpContentProps = {
  navigation: any; // Replace with the appropriate type
};

const LazySubSignUpContent: React.FC<LazySubSignUpContentProps> = ({ navigation }) => {
  return (
    <View style={styles.mainContainer}>
      <Image
        source={require('../pictures/smoke.png')}
        style={styles.backgroundImageTop}
      />
      <Image
        source={require('../pictures/smoke3.png')}
        style={styles.backgroundImageBottom}
      />
      <View style={styles.content}>
      <View style={styles.subscriptionInfoBox}>
        <View style={styles.subscriptionInfo}>
          <StyledText style={styles.subscriptionInfoHeaderJuice}>Try our Juice Pass!</StyledText>
          <StyledText style={styles.subscriptionInfoDescription}>
            Get a discounted e-juice every week!
          </StyledText>
        </View>
        <View style={styles.imageContainer}>
          <Image source={require('../pictures/VapePics/juice.png')} style={styles.image} />
        </View>
        <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.dispatch(StackActions.push('CheckoutDecision'))}>
          <StyledText style={styles.signUpButtonStyledText}>Subscribe</StyledText>
        </TouchableOpacity>

  
        <View style={styles.subscriptionInfo}>
          <StyledText style={styles.subscriptionInfoHeader}>What do I get?</StyledText>
          <StyledText style={styles.subscriptionInfoDescription}>
            Get a juice of your choice each week, hassle-free!
          </StyledText>
        </View>
        <View style={styles.subscriptionInfo}>
          <StyledText style={styles.subscriptionInfoHeader}>Why Juice Pass?</StyledText>
          <StyledText style={styles.subscriptionInfoDescription}>
            Save a fortune on shipping and have your flavors delivered automatically. You can cancel your subscription or change your flavors at any time.
          </StyledText>
        </View>
        <View style={styles.subscriptionInfo}>
          <StyledText style={styles.subscriptionInfoHeader}>What varieties are there?</StyledText>
          <StyledText style={styles.subscriptionInfoDescription}>
            Any e-juice flavor we sell is available.
          </StyledText>
        </View>
        <View style={styles.subscriptionInfo}>
          <StyledText style={styles.subscriptionInfoHeader}>How much is it?</StyledText>
          <StyledText style={styles.subscriptionInfoDescription}>
            The Juice Pass costs €23.99 a month.
          </StyledText>
          
        </View>
        <View style={styles.subscriptionInfo}>
          <StyledText style={styles.subscriptionInfoHeader}>When will I receive my juice?</StyledText>
          <StyledText style={styles.subscriptionInfoDescription}>
            One juice vial is shipped each full week, giving you four free juices a month.
          </StyledText>
        </View>
        </View>
        <View style={styles.space}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  subscriptionInfoBox: {
    width: '100%',
    alignItems: 'center',
  },
  imageContainer: {
    marginTop: 20,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  image: {
    height: 225,
    width: 250,
    borderRadius: 10,
  },
  backgroundImageTop: {
    position: 'absolute',
    width: '100%',
    height: '50%',
    resizeMode: 'cover',
    top: 0,
  },
  backgroundImageBottom: {
    position: 'absolute',
    width: '100%',
    height: '55%', // Increased to overlap
    resizeMode: 'cover',
    top: '45%', // Set to allow overlap
  },
  content: {
    paddingHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  space: {
    marginBottom: 50,
  },
  subscriptionInfoHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    fontFamily: 'OpenSans-Bold',
  },
  subscriptionInfoHeaderJuice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    fontFamily: 'OpenSans-Bold',
    StyledTextAlign: 'center',
  },
  subscriptionInfoDescription: {
    fontSize: 17,
    fontFamily: 'OpenSans-Regular',
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
    width: 200,
  },
  signUpButtonStyledText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'OpenSans-Bold',
  },
});

export default LazySubSignUpContent;
