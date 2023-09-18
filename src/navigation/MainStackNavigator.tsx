import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import AddPlaceScreen from "../screens/AddPlaceScreen";
import ConfirmationScreen from "../screens/ConfirmationScreen";

export type RootStackParamList = {
  Home: undefined;
  AddPlace: undefined;
  Confirmation: undefined;
};

const MainStack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen name="AddPlace" component={AddPlaceScreen} />
      <MainStack.Screen name="Confirmation" component={ConfirmationScreen} />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
