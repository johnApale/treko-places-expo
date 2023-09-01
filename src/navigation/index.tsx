import { NavigationContainer } from "@react-navigation/native";

import { useAuth } from "../contexts/AuthProvider";
import MainStackNavigator from "./MainStackNavigator";
import AuthStackNavigator from "./AuthStackNavigator";

export default () => {
  const auth = useAuth();
  const user = auth.user;
  // const [user, setUser] = useState(true);
  return (
    <NavigationContainer>
      {!user && <AuthStackNavigator />}
      {user && <MainStackNavigator />}
    </NavigationContainer>
  );
};
