import { GluestackUIProvider, config } from "@gluestack-ui/themed";

import Navigation from "./src/navigation";

export default function App() {
  return (
    <GluestackUIProvider config={config.theme}>
      <Navigation />
    </GluestackUIProvider>
  );
}
