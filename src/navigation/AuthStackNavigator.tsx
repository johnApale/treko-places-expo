import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/auth/LoginScreen";
import SignupScreen from "../screens/auth/SignupScreen";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";
import UpdatePasswordScreen from "../screens/auth/UpdatePasswordScreen";
import { useAuth } from "../contexts/AuthProvider";

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  UpdatePassword: undefined;
};

const AuthStack = createNativeStackNavigator();

const AuthStackNavigator = ({
  error_description,
}: {
  error_description?: string | null;
}) => {
  const { user } = useAuth();
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      {!user && (
        <>
          <AuthStack.Screen name="Login" component={LoginScreen} />
          <AuthStack.Screen name="Signup" component={SignupScreen} />
          <AuthStack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
        </>
      )}
      <AuthStack.Screen
        name="UpdatePasswordScreen"
        component={UpdatePasswordScreen}
        initialParams={{ message: error_description }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
