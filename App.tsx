import { GluestackUIProvider, config } from "@gluestack-ui/themed";
import { NavigationStack } from "./NavigationStack";

export default function App() {
  return (
    <GluestackUIProvider config={config.theme}>
      <NavigationStack />
    </GluestackUIProvider>
  );
}
