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
  photo_uri: string;
  name: string;
  category: [string];
  description: string;
  tags: [string];
};
