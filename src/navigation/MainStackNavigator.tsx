import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import AddPlaceScreen from "../screens/AddPlaceScreen";
import ConfirmationScreen from "../screens/ConfirmationScreen";
import UpdatePasswordScreen from "../screens/auth/UpdatePasswordScreen";
import { useAuth } from "../contexts/AuthProvider";

export type RootStackParamList = {
  Home: undefined;
  AddPlace: undefined;
  Confirmation: undefined;
};

const MainStack = createNativeStackNavigator();

const MainStackNavigator = () => {
  const { user } = useAuth();
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen name="AddPlace" component={AddPlaceScreen} />
      <MainStack.Screen name="Confirmation" component={ConfirmationScreen} />
      {/* {user ? (
        <>
          <MainStack.Screen name="Home" component={HomeScreen} />
          <MainStack.Screen name="AddPlace" component={AddPlaceScreen} />
          <MainStack.Screen
            name="Confirmation"
            component={ConfirmationScreen}
          />{" "}
        </>
      ) : (
        <MainStack.Screen
          name="UpdatePasswordScreen"
          component={UpdatePasswordScreen}
          initialParams={{ message: error_description }}
        />
      )} */}
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
