import { View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, ButtonText } from "@gluestack-ui/themed";
import * as AuthSession from "expo-auth-session";

import { useAuth } from "../../contexts/AuthProvider";
//@ts-ignore

type OAuthProps = {
  provider: "Google" | "Apple" | "GitHub" | "Facebook";
  onClick?: () => void;
};

const OAuthButton = ({ provider, onClick }: OAuthProps) => {
  const [OAuth, setOAuth] = useState("");
  const [icon, setIcon] = useState<any>();
  const { signInOAuth } = useAuth();

  useEffect(() => {
    if (provider === "Google") {
      setOAuth("google");
      setIcon(require("../../../assets/oauthproviders/google.png"));
    }
  }, []);
  const handleSubmit = async () => {
    signInOAuth(OAuth);
  };
  return (
    <View>
      <Button
        bg="white"
        size="xs"
        borderColor="lightgray"
        variant="outline"
        onPress={handleSubmit}
        borderRadius={3}
      >
        <Image style={{ height: 26, width: 26 }} source={icon} />
        <ButtonText color="#E17858" style={{ fontSize: 12, marginLeft: 5 }}>
          Continue with {provider}
        </ButtonText>
      </Button>
    </View>
  );
};

export default OAuthButton;
