import { NavigationContainer } from "@react-navigation/native";

import { useAuth } from "../contexts/AuthProvider";
import MainStackNavigator from "./MainStackNavigator";
import AuthStackNavigator from "./AuthStackNavigator";

export default () => {
  const { user } = useAuth();

  // const [user, setUser] = useState(true);
  return (
    <NavigationContainer>
      {!user && <AuthStackNavigator />}
      {user && <MainStackNavigator />}
    </NavigationContainer>
  );
};
