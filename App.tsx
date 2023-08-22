import { StyleSheet } from "react-native";
import { GluestackUIProvider, Text, Box, config } from "@gluestack-ui/themed";

export default function App() {
  return (
    <GluestackUIProvider config={config.theme}>
      <Box style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </Box>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
