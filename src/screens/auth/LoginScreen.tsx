import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import {
  AlertCircleIcon,
  Divider,
  FormControlErrorIcon,
  FormControlErrorText,
} from "@gluestack-ui/themed";

import ScreenTitle from "../../components/shared/ScreenTitle";
import LoginForm from "../../components/auth/LoginForm";
import OAuthButton from "../../components/auth/OAuthButton";
import { Text as textStyle } from "../../styles";
import { AuthNavigationProp } from "../../types";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import LoadingOverlay from "../../components/shared/LoadingOverlay";

const LoginScreen = ({ navigation }: AuthNavigationProp) => {
  const [loginError, setLoginError] = useState("");
  const { isLoading } = useAuth();

  const navigateToSignup = () => {
    navigation.navigate("Signup");
    setLoginError("");
  };

  const navigateToForgot = () => {
    navigation.navigate("ForgotPassword");
    setLoginError("");
  };

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <View style={styles.container}>
          <Image
            style={{ height: 50, width: 50, marginBottom: 30 }}
            source={require("../../../assets/TREKO-logo.png")}
          />

          <ScreenTitle title="Log in" titleSize={32} />
          <OAuthButton provider="Google" />
          <Divider marginTop={30}></Divider>
          <LoginForm setLoginError={setLoginError} />

          <View style={styles.linksContainer}>
            <Pressable onPress={navigateToSignup}>
              <Text style={{ ...(textStyle.link as any) }}>
                Create an account
              </Text>
            </Pressable>
            <Pressable onPress={navigateToForgot}>
              <Text style={{ ...(textStyle.link as any) }}>
                Forgot Password?
              </Text>
            </Pressable>
          </View>
          {loginError && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 20,
              }}
            >
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>{loginError}</FormControlErrorText>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F2EBE3",
    justifyContent: "center",
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
