import { GluestackUIProvider, config } from "@gluestack-ui/themed";

import Navigation from "./src/navigation";
import { AuthProvider } from "./src/contexts/AuthProvider";

export default function App() {
  return (
    <GluestackUIProvider config={config.theme}>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </GluestackUIProvider>
  );
}
