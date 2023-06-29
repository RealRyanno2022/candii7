import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import ShopHeader from '../shop/ShopHeader';
import ShopFooter from '../shop/ShopFooter';
import { StackParamList } from '../../types/types';
import { StackActions } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import StyledText from '../../StyledText';

type CancelMembershipProps = {
  navigation: NavigationProp<StackParamList>;
  route: {
    params: {
      isSubscribed: boolean;
      setIsSubscribed: React.Dispatch<React.SetStateAction<boolean>>;
    };
  };
}

const CancelMembership: React.FC<CancelMembershipProps> = ({ navigation, route }) => {
  const { isSubscribed, setIsSubscribed } = route.params;

  const handleContinue = () => {
    navigation.dispatch(StackActions.push("ManageSubscription"));  // Replace with the actual route name
  };

  const handleCancel = () => {
    navigation.dispatch(StackActions.push('CancelConfirm', { isSubscribed, setIsSubscribed }));
  };

  return (
    <View style={styles.mainContainer}>
        <ShopHeader navigation={navigation} />
        <ScrollView bounces={false}>
        <View style={styles.container}>
            <Icon name="exclamation-triangle" size={50} color="yellow" style={styles.cautionIcon} />
            <StyledText style={styles.title}>Cancel Membership?</StyledText>
            <StyledText style={styles.StyledText}>
            We value you as a member and we would love to continue serving you with our vast range of flavours and convenient delivery. 
            Remember, you enjoy free shipping as part of your membership!
            </StyledText>
            <StyledText style={styles.StyledText}>
            We understand if you need to cancel, and assure you that you can do so at any time.
            </StyledText>
            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <StyledText style={styles.continueStyledText}>Continue Membership</StyledText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <StyledText style={styles.cancelStyledText}>Cancel Membership</StyledText>
            </TouchableOpacity>
        </View>
        <View style={styles.space} />
        </ScrollView>
        <ShopFooter navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  space: {
    marginBottom: 50,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cautionIcon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  StyledText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',

  },
  continueButton: {
    padding: 15,
    backgroundColor: '#fb5b5a',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  continueStyledText: {
    color: 'white',
    fontSize: 18,
  },
  cancelButton: {
    padding: 15,
    backgroundColor: '#bbb',
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelStyledText: {
    color: 'white',
    fontSize: 18,
  },
});

export default CancelMembership;
