import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets  } from '@react-navigation/stack';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import StyledText from './StyledText';
import * as SplashScreen from 'expo-splash-screen';

// Onboarding components
import Intro from './components/onboarding/Intro';
import PrivacyPolicy from './components/onboarding/PrivacyPolicy';
import LanguageSelect from './components/onboarding/LanguageSelect';
import ShopFront from './components/onboarding/ShopFront';
import VerifyAge from './components/onboarding/VerifyAge';

import IDCheckScreen from './components/sales/IDCheckScreen';

import CustomerBasket from './components/shop/CustomerBasket';
// import SearchProducts from './components/shop/SearchProducts';

// Shop components
import VapeScreen from './components/shop/VapeScreen';
import JuiceScreen from './components/shop/JuiceScreen';
import NonDisposableScreen from './components/shop/NonDisposableScreen';
import BrandVarieties from './components/shop/BrandVarieties';

// Anomaly components
import LostConnection from './components/anomalies/LostConnection';
import NotFoundScreen from './components/anomalies/NotFoundScreen';

// Sales components
import ConfirmationPage from './components/sales/ConfirmationPage';
import DeliveryAddress from './components/sales/DeliveryAddress';
import FormInput from './components/sales/FormInput';
import JuiceProductPage from './components/shop/JuiceProductPage';
import NonDisposableProductPage from './components/shop/NonDisposableProductPage';
import CheckoutDecision from './components/sales/CheckoutDecision';

// Subscriptions components
import CancelConfirm from './components/subscriptions/CancelConfirm';
import CancelMembership from './components/subscriptions/CancelMembership';
import ChangeAddress from './components/subscriptions/ChangeAddress';
import ChangeFlavours from './components/subscriptions/ChangeFlavours';
import ManageSubscription from './components/subscriptions/ManageSubscription';
import SubJuiceScreen from './components/subscriptions/SubJuiceScreen';
import ChooseFlavours from './components/subscriptions/ChooseFlavours';
import SubSignUp from './components/subscriptions/SubSignUp';
import RegisterEmail from './components/shop/RegisterEmail';

import CandiiTalk from './components/onboarding/CandiiTalk';
import PartScreen from './components/shop/PartScreen';
import EditEmail from './components/shop/EditEmail';
import EditEmailDeliveryAddress from './components/shop/EditEmailDeliveryAddress';

import DisposableProductPage from './components/shop/DisposableProductPage';
import ReorderPage from './components/shop/ReorderPage';
import BraintreeDropInComponent from './components/sales/BraintreeDropInComponent';
// import TestPayments from './components/sales/TestPayments';
import ErrorScreen from './components/anomalies/ErrorScreen';

const [appIsReady, setAppIsReady] = useState(false);


useEffect(() => {
  async function prepare() {
    try {
      // Keep the splash screen visible while we fetch resources
      await SplashScreen.preventAutoHideAsync();
      // Pre-load fonts, make any API calls you need to do here
      await Font.loadAsync(Entypo.font);
      // Artificially delay for two seconds to simulate a slow loading
      // experience. Please remove this if you copy and paste the code!
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (e) {
      console.warn(e);
    } finally {
      // Tell the application to render
      setAppIsReady(true);
    }
  }

  prepare();
}, []);

const onLayoutRootView = useCallback(async () => {
  if (appIsReady) {
    // This tells the splash screen to hide immediately! If we call this after
    // `setAppIsReady`, then we may see a blank screen while the app is
    // loading its initial state and rendering its first pixels. So instead,
    // we hide the splash screen once we know the root view has already
    // performed layout.
    await SplashScreen.hideAsync();
  }

  if (!appIsReady) {
    return null;
  }
}, [appIsReady]);






// IMPORTANT AND URGENT

// Have all these done by at most 7th July

// ---------- Verification ----------
// TODO: Add 'emailVerified' and 'IDVerified' as tabs to userData which are boolean

// TODO: When the user verifies their e-mail, have a back-end call that sets their e-mail verification to true

// TODO: When the user verifies their id, have a back-end call that sets their id verification to true

// TODO: After the user creates their e-mail for the first time, they are registered as a user. Register them at this point using a backend call























// ---------- Product ----------

// TODO: Fix the DisposableProductPage 'add to cart' functionality so that the product and correct quantity is displayed in CustomerBasket 8

// TODO: Tacked onto the one above, make sure that this functionality is applied to NonDisposableProductPage and JuiceProductPage 3

// TODO: Establish a path of components which start at the endpoint - 'Proceed to Checkout' from any product page and customer basket (Use DisposableProductPage) 5

// TODO: Add a tab to ReorderPage called 'Repeat Last Purchase' which navigates the user to their CustomerBasket, now pre-filled with the products from their last purchase.
      // (From here they can add or delete them as normal or add more)

// TODO: Automatically charge the user their subscription rate every 28 days

// TODO: Add code to the checkout and backend which creates a new entry in the 'Purchases' collection and adds the user's purchased items along with their e-mail address to it when they eventually purchase.


// ---------- Backend ----------
// TODO: Add 'emailVerified' and 'IDVerified' as tabs to userData which are boolean 3

// TODO: When the user verifies their e-mail, have a back-end call that sets their e-mail verification to true 8

// TODO: When the user verifies their id, have a back-end call that sets their id verification to true 8

// TODO: After the user creates their e-mail for the first time, they are registered as a user. Register them at this point using a backend call 8

// TODO: Add the new userData to the backend route near the Evervault config 3

// TODO: Have a route in the backend which checks if the user is marked as 'verified' for both settings before allowing them to proceed to DeliveryAddress 8

// TODO: Have the e-mail and id verification navigation be seamless. If you don't have one, you are asked for the other. 13



















// IMPORTANT BUT NOT URGENT


// ---------- Parts ----------
// TODO: Add a 'Parts' box to ShopFront with a nice looking part with background removed

// TODO: If needs be, remove the background of all the parts

// TODO: Host the parts in the AWS S3 Bucket, if needs be

// TODO: Create a PartsBrandData.json file which contains the BrandData for each part

// TODO: Create a 'PartProductPage' and 'PartScreen' with the same styles as the other Pages and Screens which have the same functionality

// TODO: Recreate the UX functionality of DisposableProductPage and preceding components for the PartProductPage

// ---------- Amazon S3 Bucket ----------
// TODO: Host the parts in the AWS S3 Bucket, if needs be

// TODO: Have this text box automatically update every seven days

// TODO: Add a question mark next to this aforementioned text box which opens an alert which says 'You may change your flavour for the week before the next order time'.

// TODO: Add a text box to 'ManageSubscription' that says 'Your next flavour (Y) will be shipped on X date'.

// TODO: Have the text box interact with your currently selected flavors. So that the Y is the n'th flavour of each 28 day cycle. 
//        If I order a,b,c,d flavours, then on the 2nd week Y will be b.
//        If I change b to e, then e will display instead




 
const App = (props) => {

  function handleLoadingError(error) {
    console.warn(error);
  }
  
  function handleFinishLoading(setLoadingComplete) {
    setLoadingComplete(true);
  }

  async function loadResourcesAsync() {
    await Font.loadAsync({
      'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
      'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });
  }

  const Stack = createStackNavigator();

  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <View style={styles.container}>
      <NavigationContainer>
      <ErrorBoundary navigation={navigator}>
      <Stack.Navigator
        initialRouteName="ShopFront"
        screenOptions={{
          gestureEnabled: false, 
          ...TransitionPresets.SlideFromRightIOS, 
        }}
        >
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="CandiiTalk" component={CandiiTalk} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen name="LanguageSelect" component={LanguageSelect} />
        <Stack.Screen name="ReorderPage" component={ReorderPage} />
        <Stack.Screen name="EditEmail" component={EditEmail} />
        <Stack.Screen name="EditEmailDeliveryAddress" component={EditEmailDeliveryAddress} />
        <Stack.Screen name="ShopFront" component={ShopFront} />
        <Stack.Screen name="VerifyAge" component={VerifyAge} />
        <Stack.Screen name="VapeScreen" component={VapeScreen} />
        <Stack.Screen name="JuiceScreen" component={JuiceScreen} />
        <Stack.Screen name="ErrorScreen" component={ErrorScreen} />
        <Stack.Screen name="CheckoutDecision" component={CheckoutDecision} />
        <Stack.Screen name="NonDisposableScreen" component={NonDisposableScreen} />
        <Stack.Screen name="LostConnection" component={LostConnection} />
        <Stack.Screen name="ConfirmationPage" component={ConfirmationPage} />
        <Stack.Screen name="DeliveryAddress" component={DeliveryAddress} />
        <Stack.Screen name="RegisterEmail" component={RegisterEmail} />
        <Stack.Screen name="CustomerBasket" component={CustomerBasket} />
        <Stack.Screen name="IDCheckScreen" component={IDCheckScreen} />

        <Stack.Screen name="PartScreen" component={PartScreen} />

        <Stack.Screen name="FormInput" component={FormInput} />
        <Stack.Screen name="BrandVarieties" component={BrandVarieties} />
        <Stack.Screen name="CancelConfirm" component={CancelConfirm} />
        <Stack.Screen name="CancelMembership" component={CancelMembership} />
        <Stack.Screen name="ChangeAddress" component={ChangeAddress} />
        <Stack.Screen name="ChangeFlavours" component={ChangeFlavours} />
        <Stack.Screen name="ChooseFlavours" component={ChooseFlavours} />
        <Stack.Screen name="ManageSubscription" component={ManageSubscription} />
        <Stack.Screen name="SubJuiceScreen" component={SubJuiceScreen} />
        <Stack.Screen name="NotFoundScreen" component={NotFoundScreen} />
        <Stack.Screen name="BraintreeDropInComponent" component={BraintreeDropInComponent} />
        <Stack.Screen name="SubSignUp" component={SubSignUp} />

        <Stack.Screen name="DisposableProductPage" component={DisposableProductPage} />
        <Stack.Screen name="JuiceProductPage" component={JuiceProductPage} />
        <Stack.Screen name="NonDisposableProductPage" component={NonDisposableProductPage} />
      </Stack.Navigator>
      </ErrorBoundary>
    </NavigationContainer>
    </View>
  );
  }
    
}

type ErrorBoundaryProps = {
  navigation: any;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ navigation }) => {
  const [hasError, setHasError] = useState(false);

  const getDerivedStateFromError = () => {
    return { hasError: true };
  };

  const componentDidCatch = (error: Error, errorInfo: Error) => {
    console.error(error, errorInfo);
  };

  if (hasError) {
    return <ErrorScreen navigation={navigation} />;
  }

};

  



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default App;