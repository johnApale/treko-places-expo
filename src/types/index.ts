import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../NavigationStack";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export interface HomeScreenProp {
  navigation: HomeScreenNavigationProp;
}
