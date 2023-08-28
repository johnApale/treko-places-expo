import { StyleSheet } from "react-native";
import { GluestackUIProvider, Text, Box, config } from "@gluestack-ui/themed";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GluestackUIProvider config={config.theme}>
      <Layout />
    </GluestackUIProvider>
  );
}

export const Layout = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
