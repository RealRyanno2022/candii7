import { NavigationProp } from "@react-navigation/native";
import React from "react";


import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type BrandVarietiesProps = {
  route: RouteProp<StackParamList, 'BrandVarieties'>;
  navigation: StackNavigationProp<StackParamList, 'BrandVarieties'>;
  brandName: string;
};

type ProductImage = string;

type Product = {
  id: string;
  name: string;
  price: number;
  brand: string;
  type: 'juice' | 'disposable' | 'nonDisposable' | 'part';
  variableStrength: boolean;
  nicotineStrengths: string[];
  image: ProductImage;
};

type Subscription = {
  isSubscribed: boolean;
  setIsSubscribed: React.Dispatch<React.SetStateAction<boolean>>;
};

export type StackParamList = {
  AccountInfo: { userId: number };
  CustomerBasket: { item?: Product; email?: string };
  EditEmail: undefined;
  EditEmailDeliveryAddress: undefined;
  BraintreeDropInComponent: undefined;
  // TestPayments: undefined;
  QueryLanguageSelector: { selectedLanguage: string }
  DeleteAccount: undefined;
  ProjectInfo: undefined;
  Queries: undefined;
  PartScreen: undefined;
  LanguageSelect: undefined;
  Intro: undefined;
  PrivacyPolicy: undefined;
  ReorderPage: undefined;
  ShopFront:undefined;
  
  VerifyAge: undefined;
  ForgotPassword: undefined;
  LoginScreen: undefined;
  NewPassword: undefined;
  SignUp: undefined;
  VerifyEmail: undefined;
  RegisterEmail: { emailVerified: boolean }
  ConfirmationPage: undefined;
  DeliveryAddress: { emailVerified: boolean, IDVerified: boolean }
  BrandVarieties: { brand: string, type: 'juice' | 'disposable' | 'nonDisposable' | 'part' };
  ContinueShopping: undefined;
  JuiceProductPage: { product: Product };
  NonDisposableProductPage: { product: Product };
  DisposableProductPage: { product: Product };
  JuiceScreen: undefined;
  SearchProducts: undefined;
  VapeScreen: undefined;
  FormScreen: undefined;
  SubSignUp: { subscription: Subscription, navigation: any, route: any };
  SubJuiceScreen: undefined;
  NotFoundScreen: undefined;
  ChooseFlavours: undefined;
  ManageSubscription: { subscription: Subscription };
  CancelMembership: undefined;
  ChangeAddress: undefined;
  IDCheckScreen: { IDVerified: boolean, emailVerified: boolean, verifiedEmail: string }
  ChangeFlavours: undefined;
  ErrorBoundary: undefined;
  CancelConfirm: undefined;
  NonDisposableScreen: undefined;
  BrandBox: { product: any, selected: boolean, quantity: number, onSelect: () => void, onDeselect: () => void };
  ShopFooter: { subscription: Subscription };
};