import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList as MainRootStack } from "../navigation/MainStackNavigator";
import { RootStackParamList as AuthRootStack } from "../navigation/AuthStackNavigator";

type MainStackNavigationType = NativeStackNavigationProp<MainRootStack, "Home">;

export interface MainNavigationProp {
  navigation: MainStackNavigationType;
}

type AuthStackNavigationType = NativeStackNavigationProp<
  AuthRootStack,
  "Login"
>;

export interface AuthNavigationProp {
  navigation: AuthStackNavigationType;
}

export type AddFormType = {
  photo_path: string | undefined;
  name: string;
  category: number[] | undefined;
  description: string;
  tags: [string];
};

export type AddressType = {
  street_address: string | undefined;
  city: string | undefined;
  state: string | undefined;
  postalCode: string | undefined;
  country: string | undefined;
  longitude: number | undefined;
  latitude: number | undefined;
};

export type AuthData = {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
};
