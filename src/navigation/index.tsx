import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { useAuth } from "../contexts/AuthProvider";
import MainStackNavigator from "./MainStackNavigator";
import AuthStackNavigator from "./AuthStackNavigator";

const prefix = Linking.createURL("/");

global.Buffer = global.Buffer || require("buffer").Buffer;

const parseSupabaseUrl = (url: string) => {
  let parsedUrl = url;
  if (url.includes("#")) {
    parsedUrl = url.replace("#", "?");
  }

  return parsedUrl;
};

export default () => {
  const { isLoggedIn, loginWithToken } = useAuth();
  const [error, setError] = useState("");

  const getInitialURL = async () => {
    const url = await Linking.getInitialURL();

    if (url !== null) {
      return parseSupabaseUrl(url);
    }

    return url;
  };

  const subscribe = (listener: (url: string) => void) => {
    const onReceiveURL = ({ url }: { url: string }) => {
      const transformedUrl = parseSupabaseUrl(url);
      const parsedUrl = Linking.parse(transformedUrl);

      const access_token = parsedUrl.queryParams?.access_token;
      const refresh_token = parsedUrl.queryParams?.refresh_token;
      if (
        typeof access_token === "string" &&
        typeof refresh_token === "string"
      ) {
        void loginWithToken({ access_token, refresh_token });
      } else {
        setError(parsedUrl.queryParams?.error_description as string);
      }

      listener(transformedUrl);
    };
    const subscription = Linking.addEventListener("url", onReceiveURL);

    return () => {
      subscription.remove();
    };
  };
  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        UpdatePasswordScreen: "reset-password",
      },
    },
    getInitialURL,
    subscribe,
  };
  return (
    <NavigationContainer linking={linking}>
      {isLoggedIn ? (
        <MainStackNavigator />
      ) : (
        <AuthStackNavigator error_description={error} />
      )}
    </NavigationContainer>
  );
};
