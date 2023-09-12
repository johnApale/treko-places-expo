import { NavigationContainer } from "@react-navigation/native";

import { useAuth } from "../contexts/AuthProvider";
import MainStackNavigator from "./MainStackNavigator";
import AuthStackNavigator from "./AuthStackNavigator";

export default () => {
  const { session } = useAuth();

  // const [user, setUser] = useState(true);
  return (
    <NavigationContainer>
      {!session && <AuthStackNavigator />}
      {session && <MainStackNavigator />}
    </NavigationContainer>
  );
};
