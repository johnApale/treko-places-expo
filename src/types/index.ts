import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../NavigationStack";

type MainStackNavigationType = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export interface MainNavigationProp {
  navigation: MainStackNavigationType;
}

export type AddFormType = {
  photo_uri: string;
  name: string;
  category: [string];
  description: string;
  tags: [string];
};
