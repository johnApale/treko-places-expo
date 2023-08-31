import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../NavigationStack";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export interface HomeScreenProp {
  navigation: HomeScreenNavigationProp;
}

export type AddFormType = {
  photo_uri: string;
  name: string;
  category: [string];
  description: string;
  tags: [string];
};
