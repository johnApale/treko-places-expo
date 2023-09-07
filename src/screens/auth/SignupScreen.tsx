import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Divider } from "@gluestack-ui/themed";

import ScreenTitle from "../../components/shared/ScreenTitle";
import OAuthButton from "../../components/auth/OAuthButton";
import ActionButton from "../../components/shared/ActionButton";
import SignupForm from "../../components/auth/SignupForm";
import { AuthNavigationProp } from "../../types";
import { Text as textStyle } from "../../styles";

const SignupScreen = ({ navigation }: AuthNavigationProp) => {
  const handleLogin = () => {
    console.log("login");
  };
  const navigateToSignup = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <ScreenTitle title="Create an account" titleSize={32} />
      <OAuthButton provider="Google" />
      <Divider marginTop={30}></Divider>
      <SignupForm />

      <View style={styles.linksContainer}>
        <Text style={{ marginRight: 5, color: "gray" }}>Have an account?</Text>
        <Pressable onPress={navigateToSignup}>
          <Text style={{ ...(textStyle.link as any) }}>Log in</Text>
        </Pressable>
      </View>
    </View>
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
