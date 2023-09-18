import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  AlertCircleIcon,
  Divider,
  FormControlErrorIcon,
  FormControlErrorText,
} from "@gluestack-ui/themed";

import ScreenTitle from "../../components/shared/ScreenTitle";
import OAuthButton from "../../components/auth/OAuthButton";
import SignupForm from "../../components/auth/SignupForm";
import { AuthNavigationProp } from "../../types";
import { Text as textStyle } from "../../styles";
import { useAuth } from "../../contexts/AuthProvider";
import LoadingOverlay from "../../components/shared/LoadingOverlay";

const SignupScreen = ({ navigation }: AuthNavigationProp) => {
  const [signupError, setSignupError] = useState("");
  const { isLoading } = useAuth();
  const navigateToSignup = () => {
    navigation.navigate("Login");
    setSignupError("");
  };

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <View style={styles.container}>
          <ScreenTitle title="Create an account" titleSize={32} />
          <OAuthButton provider="Google" />
          <Divider marginTop={30}></Divider>
          <SignupForm setSignupError={setSignupError} />

          <View style={styles.linksContainer}>
            <Text style={{ marginRight: 5, color: "gray" }}>
              Have an account?
            </Text>
            <Pressable onPress={navigateToSignup}>
              <Text style={{ ...(textStyle.link as any) }}>Log in</Text>
            </Pressable>
          </View>

          {signupError && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 20,
              }}
            >
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>{signupError}</FormControlErrorText>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F2EBE3",
    justifyContent: "center",
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
